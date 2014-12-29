# Star-Exec-Presenter

The Star-Exec-Presenter is actually the concrete work of this thesis. As a REST-based web application it is an interface to the StarExec service and it provides a caching mechanism. This chapter will give detailed insights in the architectural approach to build the Star-Exec-Presenter according to the requirements.

## Application Structure

Star-Exec-Presenter is written entirely in Haskell by utilizing its module system and the Yesod Web Framework. Detailled information are listed in chapter 7 "Implementation". In this section I will discuss the particular pieces that form Star-Exec-Presenter into a full server-side web application. To better understand the application structure, it could easily be interpreted, that the application uses the Model-View-Controller (MVC) pattern where the Model stands for the data model, the View is represented by the templates which form the HTML presentation, and the Controller in the form of the several request handlers.

### Data Model

The data model can be devided into two groups, the first containing the data types used for the REST-API which I will discuss later, and the second being the persistent data types of the actual data like the job results.

The first group of data types is used as identifiers for the second group, so they are directly related to each other. For instance there is `JobID` type that relates to  `Job` type that containes the infos about a job as well as to a list of `JobResult` containing the actual results of the linked job. All these types mostly are unified types for the different entities of StarExec as well as imported entities.

To complete the example from above the type `JobID` has three different appearences, first being `StarExecJobID` representing a job on StarExec, the second being `LriJobID` representing an imported Job from the 2007 Termination Competition and the third being `UibkJobID` for the imported jobs from Innsbruck. Additionally, a `Job` also has three different appearances (`StarExecJob`, `LriJob`, `UibkJob`) as well as `JobResult` (`StarExecResult`, `LriResult`, `UibkResult`).

The reason the have three different kinds of appearances for each type is because of having the data from StarExec in combination with the imported data from previous competitions. This old data differs in its form from that of the 2014 Termination Competition, so to consider these differences in a safe way I decided to isolate them persistent-wise. So, for each kind of data there are three database tables used to store the different data.

### Templates

### Request Handlers

## Caching

[@marlow_parallel_2013]

## REST interface

[@richardson_restful_2007]
