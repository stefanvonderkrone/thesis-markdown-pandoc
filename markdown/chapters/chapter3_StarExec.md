# StarExec

StarExec is the service that is utilized by the Termination Community and other communities to run their research as well as the latest Termination Competition. This chapter will examine the interfaces from which the relevant data is fetched as well as their special characteristics. I will go into the details of how StarExec works and how to get the data.

## History

StarExec is _"a public web-based service built to facilitate the experimental evolution of logic solvers, broadly understood as automated tools based on formal reasoning. (...) The service, (...), is designed to provide a single piece of storage and computing infrastructure to logic solving communities and their members. It aims at reducing duplication of effort and resources as well as enabling individual researchers or groups with no access to comparable infrastructure."_ [@stump_starexec:_2014] The work on StarExec started in 2012 as a joint development of the University of Iowa and the University of Miami. It is a cluster of 193 quad-core CPUs and 128 to 256 Gigabyte main memory each running a Red Hat Enterprise Linux.

The first public event was held in summer 2013. One year later, the Termination Competition 2014 was realized with StarExec.

## Data-Model

The data-model has three major entities: the jobs, the solvers and the benchmarks. A benchmark is a formular[^starexec_wiki_project_overview] regarding a formal problem which will be processed by a solver. A solver is a programm that takes a benchmark, analyses it and gives an output regarding the given task. For example, in the case of the Termination Competition, this output should mainly consist of one of the following results: YES, NO, MAYBE. Whereby the answer YES can also contain additional information for the complexity of the problem. A post-processor is responsible for filtering this info out of the solvers log.

[^starexec_wiki_project_overview]: see https://wiki.uiowa.edu/display/stardev/Project+Overview

A job is a complex task with a set of solver and benchmarks, where each solver processes each benchmark. Each relation between a certain solver and benchmark is called job-pair. Each job-pair consists of the solver's log (stdout and stderr). The job-pair is directly connected to the result info, which contains the solver's result and additional info such as cpu- and wallclock-time, the configuration and identifying information of the certain solver and benchmark.

<!-- TODO: a figure could illustrate the relation between jobs, solver and benchmarks -->

So, when a job is started, each solver will be started as well with a benchmark as input. The StarExec infrastructure itself takes care that all available CPUs are busy. Of course, not all job-pairs are started at the same time. If a solver finished its task a post-processor is working on the solver's output to extract the actual result (YES, NO, MAYBE). All information will then be stored in the MySQL database.

Hierarchically, StarExec is structured into communities which use spaces for further subdivision. Currently, there are several communities like "Termination" or "SMT". Each community consists of several spaces, some being owned by a user, some being public. Each space can also have subspaces. A space consists of a bunch of jobs, solvers an benchmarks. The job-results and job-pairs can be accessed through the particular job. solvers and benchmarks can be used in other spaces by copying or linking them.

## Interfaces

StarExec has an extensive interface to communicate with. It provides a complex user interface via the browser as well as a RESTlike.

### GUI

The browser based web interface of StarExec is characterized by the hierarchical nature of the spaces. A user has to have access to a space to start a job as well as upload a solver or benchmark. Each space has an overview of its job, solvers, benchmarks, its subspaces and even the enlisted users. All entities listed in this overview are owned by the particular space, so the entities of a subspace can only be seen by navigating to the certain space.

As addressed before solvers and benchmarks can be copied or linked from other spaces but also be uploaded into the space. The available actions may alter according to how much access a user may have regarding a certain space. Some space may even be hidden from the user. Aside from starting jobs and other actions mentioned before, it is also possible to download certain information such as all jobs and benchmarks or a XML based representation of the space itself.

The web interface relies heavily on AJAX-request[^ajax] to prevent each page from being reloaded on each action. So, when the user is navigating the tree of spaces, there is no actual reload of the whole page but an asynchronous fetching and updating of the page's content. This behavior is also applied to the handling of a job's progress. So, until a job is finished the web page automatically keeps track of the progress by regularly sending AJAX-requests to StarExec.

[^ajax]: Asynchronous JavaScript And XML, a technique to dynamically load data remotely and update the content

### API

Another part of the interface to StarExec is also a part of the GUI but only within download-links or forms: a RESTlike API. This interface is heavily used by the java tool StarExecCommand[^starexec_command] which is a commandline tool for the communication with StarExec. It provides a shell-like prompt that can be used to do certain action on StarExec. StarExecCommand was also some kind of inspiration for the design of Star-Exec-Presenter when it comes to the interface to StarExec.

[^starexec_command]: see https://www.starexec.org/starexec/public/starexeccommand.jsp

In the following I want to list the important URLs that are also used by the Star-Exec-Presenter:

`https://www.starexec.org/starexec/secure/j_security_check`

Of course, without this URL StarExec is actually of no use, because a user has to be logged in. With the correct credentials a POST request has to be send to StarExec. If StarExec returns a valid session ID the user is successfully logged in. Star-Exec-Presenter itself doesn't require the client to provide his own StarExec credentials, as the application uses its own. So, everyone who starts our web application has to provide valid login credentials.

`https://www.starexec.org/starexec/secure/download`

Another important URL is the one to download certain data. This URL is used consistently throughout all download links. It requires GET parameters attached to it, the most important being the `id` and the `type`. The `type` defines the type of entity such as `job` or `spaceXML`. The `id` has to be a valid identifier of the entity. If `type` is set to `job` the job-results will be downloaded in the form of a zipped CSV. Alternatively, if `type` is set to `spaceXML` a zipped XML containing the space's hierarchy will be downloaded.

`https://www.starexec.org/starexec/services/jobs/pairs/{pairId}/stdout`
`https://www.starexec.org/starexec/services/jobs/pairs/{pairId}/log`

Both listed URLs are related to the job-results. As the job-results consists only of some meta-data as well as the final result, the actual output has to be downloaded via these two URLs. Conveniently, the response is plain text. The placeholder `{pairId}` refers to the identifier of a job-result.

`https://www.starexec.org/starexec/secure/details/job.jsp`\linebreak
`https://www.starexec.org/starexec/secure/details/solver.jsp`\linebreak
`https://www.starexec.org/starexec/secure/details/benchmark.jsp`\linebreak
`https://www.starexec.org/starexec/secure/edit/processor.jsp`

To receive additional infos of the certain entities Star-Exec-Presenter works with, there are four additional URLs to observe. As StarExec has no way to get these information other than via web pages, Star-Exec-Presenter parses the required data from HTML. Each URL requires a GET parameter `id` set to the particular entity's identifier attached to the end.
