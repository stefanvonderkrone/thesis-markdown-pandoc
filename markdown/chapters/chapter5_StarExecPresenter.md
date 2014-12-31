# Star-Exec-Presenter

The Star-Exec-Presenter is actually the concrete work of this thesis. As a REST-based web application it is an interface to the StarExec service and it provides a caching mechanism. This chapter will give detailed insights in the architectural approach to build the Star-Exec-Presenter according to the requirements.

## Application Structure

Star-Exec-Presenter is written entirely in Haskell by utilizing its module system and the Yesod Web Framework. Detailled information are listed in chapter 7 "Implementation". In this section I will discuss the particular pieces that form Star-Exec-Presenter into a full server-side web application. To better understand the application structure, it could easily be interpreted, that the application uses the Model-View-Controller (MVC) pattern where the Model stands for the data model, the View is represented by the templates which form the HTML presentation, and the Controller in the form of the several request handlers.

### Data Model

The data model can be devided into two groups, the first containing the data types used for the REST-API which I will discuss later, and the second being the persistent data types of the actual data like the job results.

The first group of data types is used as identifiers for the second group, so they are directly related to each other. For instance there is `JobID` type that relates to  `Job` type that containes the infos about a job as well as to a list of `JobResult` containing the actual results of the linked job. All these types mostly are unified types for the different entities of StarExec as well as imported entities.

To complete the example from above the type `JobID` has three different appearences, first being `StarExecJobID` representing a job on StarExec, the second being `LriJobID` representing an imported Job from the 2007 Termination Competition and the third being `UibkJobID` for the imported jobs from Innsbruck. Additionally, a `Job` also has three different appearances (`StarExecJob`, `LriJob`, `UibkJob`) as well as `JobResult` (`StarExecResult`, `LriResult`, `UibkResult`).

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

The controller part of Star-Exec-Presenter is represented by the several request handlers. Each handler responds to a certain URL requested by a client application. For instance there are handlers that only return the information of a particular entity like a solver or a job, there are also handler that initiate specific requests to StarExec or display the results of a competition. The request handlers are generally managing the logic behind Star-Exec-Presenter.

All handlers are implemented within the `Handler` module.

## Caching

Fast responses, especially for handlers that can return a huge bunch of data, is a main requirement for Star-Exec-Presenter, so there has to be an effective solution. We came up with the simple idea of caching all data in the database. For instance, when the user requests the results of one or more certain jobs, the application first looks in the database for the resprective data and returns it. If there isn't found any related data, it will be fetched from StarExec. But this fetching can affect a fast response, so it will be separated from the actual response by running in the background.

This is achieved by starting a new thread within the Star-Exec-Presenter application. The following figure shows the process from a request to a response:

<!-- Insert figure to illustrate communication with StarExec including the caching mechanism -->

This database based caching mechanism has its downside when it comes the the competition results, as they are calculated based on the results of the related jobs. And as the data of these jobs is stored in the database, there is no need for the results to be stored either. So the results have to be cached in another way which is within the application's memory. For this purpose Star-Exec-Presenter uses STM[^stm].

[@marlow_parallel_2013]

## REST interface

<!-- (list all routes and their handler) -->

[@richardson_restful_2007]
