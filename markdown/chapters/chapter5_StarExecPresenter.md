# Design

The Star-Exec-Presenter is actually the concrete work of this thesis. As a REST-based web application it is an interface to the StarExec service and it provides a caching mechanism. This chapter will give detailed insights in the architectural approach to build the Star-Exec-Presenter according to the requirements.

## Application Structure

Star-Exec-Presenter is written entirely in Haskell by utilizing its module system and the Yesod Web Framework. Detailled information are listed in chapter 7 "Implementation". In this section I will discuss the particular pieces that form Star-Exec-Presenter into a full server-side web application. To better understand the application structure, it could easily be interpreted as a Model-View-Controller (MVC) pattern where the Model stands for the data model, the View is represented by the templates which form the HTML presentation, and the Controller in the form of the several request handlers.

### Data Model

The data model can be devided into two groups, the first containing the data types used for the REST-API which I will discuss later, and the second being the persistent data types of the actual data like the job results.

The first group of data types is used as identifiers for the second group, so they are directly related to each other. For instance there is `JobID` type that relates to  `Job` type that containes the infos about a job as well as to a list of `JobResult` containing the actual results of the particular job. All these types mostly are unified types for the different entities of StarExec as well as imported entities.

To complete the example from above the type `JobID` has three different appearences, first being `StarExecJobID` representing a job on StarExec, the second being `LriJobID` representing an imported job from the 2007 Termination Competition and the third being `UibkJobID` for the imported jobs from Innsbruck. Additionally, a `Job` also has three different appearances (`StarExecJob`, `LriJob`, `UibkJob`) as well as `JobResult` (`StarExecResult`, `LriResult`, `UibkResult`).

<!-- Insert figure to illustrate the dependencies -->

The reason to have three different kinds of appearances for each type is because of having the data from StarExec in combination with the imported data from previous competitions. This old data differs in its form from that of the 2014 Termination Competition, so to consider these differences in a safe way I decided to isolate them persistent-wise. So, for each kind of data there are three database tables used to store that data.

Code-wise, the data model can be found within the `Presenter.Model` module, which combines all the groups of data types mentioned above as well as the persistent data types, which are defined in the `config/models` file.

### Templates

The templates are essentially the view of Star-Exec-Presenter, they are filled with the requested information in a proper way to be displayed via the web browser. HTML[^html] is very well suited for this purpose. Other types of data formats like JSON[^json], CSV[^csv] or XML[^xml] can be considered as well but aren't a subject of matter, although they are used in the communication with the StarExec service.

[^html]: Hypertext Markup Language, a markup language designed to be interpreted by web browsers
[^json]: Javascript Object Notation, a compact subset of javascript designed for data exchange
[^csv]: Comma-Separated Values, a data format to represent tables or list
[^xml]: Extensible Markup Language, a data format for hierarchically structured data like trees

All templates can be found in the `templates` folder, some are located within the `Presenter.Utils` module.

### Request Handlers

The controller part of Star-Exec-Presenter is represented by the several request handlers. Each handler responds to a certain URL[^url] requested by a client application. For instance there are handlers that only return the information of a particular entity like a solver or a job, there are also handler that initiate specific requests to StarExec or display the results of a competition. The request handlers are generally managing the logic behind Star-Exec-Presenter.

[^url]: Uniform Resource Locator

All handlers are implemented within the `Handler` module.

## Caching

Fast responses, especially for handlers that can return a huge bunch of data, is a main requirement for Star-Exec-Presenter, so there has to be an effective solution. We came up with the simple idea of caching all data in the database. For instance, when the user requests the results of one or more certain jobs, the application first looks in the database for the respective data and returns it. If there isn't found any related data it will be fetched from StarExec. But this fetching can affect a fast response, so it will be separated from the actual response by running in the background.

This is achieved by starting a new thread within the Star-Exec-Presenter application. The following figure shows the process from a request to a response:

<!-- Insert figure to illustrate communication with StarExec including the caching mechanism -->

This database based caching mechanism has its downside when it comes the the competition results, as they are calculated based on the results of the related jobs. And as the data of these jobs is stored in the database, there is no need for the results to be stored either. So the results have to be cached in another way which is within the application's memory. For this purpose Star-Exec-Presenter uses STM[^stm].

[^stm]: Software Transactional Memory, a mechanism for concurrent programming with shared resources

The reason to cache the competition results is because it takes too long to fetch the related job results from the database and do the calculations, as a usual competition has a huge amount of data to process. For instance the 2014 Termination Competition has three meta categories with a total of 19 jobs that produced an overall amount of 37.880 job-pairs. That doesn't seem to be that much but one requirement was to have short response times. So we decided to offload the computation to a separate worker thread. The results are saved within the application's memory and are accessed via STM. The calculating worker thread is the only instance which writes in this cache, all request handlers can only read from it.

STM helps in this case because it can prevent deadlocks from multiple simultaneous access to the shared memory making the whole application more reliable. To achieve this goal every access to the shared memory (our cache of competition results) is being managed by transactions, much like transactions of a database. If two or more transactions try to access a resource simultaneously, all but one will be aborted. A mechanism to retry a rolled back transaction ensures that they will be finished anyhow. To achieve this behavior each transaction must be very small. The actual terminology is _atomic_. It is wise to have very small transactions because STM is not _fair_ as it favors small and fast transactions over large and slow ones. STM doesn't work in FIFO[^fifo] order. [@marlow_parallel_2013]

[^fifo]: First In First Out

<!-- Insert figure to illustrate the cache of competition results -->

Star-Exec-Presenter itself only does the reading and writing process within STM. The calculation of the competition results is done outside of STM. Only in this way we can ensure that the transactions are very small – or _atomic_.

## REST interface

Star-Exec-Presenter is a server-side web application which receives requests and responses with an appropriate HTML presentation. These requests have to point to a valid resource, a URL. A list of important resource-URLs of the application including their accepted HTTP methods follows:

```
/jobs/#JobID                        GET
/solvers/#SolverID                  GET
/benchmarks/#BenchmarkID            GET
/pairs/#JobPairID                   GET
/post_procs/#PostProcID             GET
/results/#Query/*JobIds             GET
/proofs/#Text                       GET
/registered                         GET
/competitions/#CompetitionInfoId    GET
/control                            GET POST
/import                             GET POST
```

Of course, an explanation of these routes, as they are called, is helpful. The first five routes are self-explaining. They take a specific identifier and return the infos of the related entity, wether it's a job, solver, benchmark, job-pair or post-processor. All these routes have a counterpart which lists all related entities. These routes are accessed without any parameter at the end.

The Results-Route takes a list of Job-Identifiers and returns all of their results. A special part of this route is its first dynamic path piece, the query parameter which defines a special case for this route. If there is given a specific query then the job results will be filtered according to it. More on this topic can be read in the section "Querying".

The Proof-Route is directly related the the Job-Pair-Route. If a job-pair contains a proof, this route is meant to display it. The Registered-Route lists all of the participant of the 2014 Termination Competition including links to their configuration on StarExec. The Competition-Route displays the results for a specific competition. This route has a counterpart, too, which lists all (publicly available) competitions.

The Control-Route is an interface to start a competition wether it's a full or a small one. Requested with the default HTTP method GET this route only displays its interface form. If this form is submitted the POST method is requested and a competition will be started. The Import-Route is used to import old data from previous competitions. It has a small form with a select field and a file input to upload a file. It takes a zip file with the content which has to be defined by the select field.

There are other routes that give further information as well as some routes that are older versions of the aforementioned ones. They are still accessible for legacy purposes and redirect to the new ones.

As Star-Exec-Presenter is meant to be a simple interface for StarExec and the Termination Competition in the first place, these routes are quite simple as well. They only accept GET or POST requests and try to work according to principles of REST. REST is an acronym for Representational State Transfer and was first mentioned by Roy Fielding in his dissertation "Architectural Styles and the Design of Network-based Software Architectures". REST respects the stateless nature of HTTP and defines that every resource has its unique unified resource identifier (URI). [@fielding_architectural_2000]

HTTP methods like GET, POST, PUT or DELETE are used to get, create, change or remove the specific resource. The GET method is nullipotent, which means that a GET request never has any side effects and never changes anything respectively. POST, PUT and DELETE requests are idempotent, resulting in the same outcome no matter how much they are called. The URI, e.g. `/clear_the_database` itself never causes a change to the data unless it is requested with one of the mentioned HTTP methods. Apart from that, this is just an example which isn't recommendable for a real world REST API.

REST utilizes the available web technology for this purpose and isn't based on any standard like SOAP[^soap]. In contrast to SOAP REST is more like an architectural strategy or design pattern to develop a web application, whereas SOAP is a protocol. REST relies on the hypertext transfer protocol (HTTP) to mediate the request and simplifies the development process with it. To explain this principle a little further I want to emphasize the aforementioned MVC design pattern. In this context a REST interface can be considered the controller of the application which responses to the request with a suitable presentation.

[^soap]: Simple Object Access Protocol, a web protocol for structured information

A suitable presentation is HTML as well as XML or JSON. Star-Exec-Presenter currently only sends HTML. But this behavior could be altered by using a special header in the HTTP request. So, to get the data as XML or JSON, the Accept-Header could be set to the values `Accept: text/xml` or `Accept: text/json`. The web application then can evaluate this header to respond either with an XML or with a JSON presentation. [@richardson_restful_2007]

It is widely accepted not to use verbs as parts of the URL rather than plural nouns. For instance the route `/get_job_results/#JobID` could be better written as `/job_results/#JobID` or simply `/results/#JobID`. Also, it is recommended to have a generalized route, e.g. `/jobs`, which lists all resources, whereas a parameter added to the URL results in returning only the specified resource. In the case of Star-Exec-Presenter especially the Results-Route is a special case takes an arbitrary amount of `JobID`s.

## Querying

