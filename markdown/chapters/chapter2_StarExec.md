# StarExec

StarExec is the service that is utilized by the Termination Community and other communities to run their research as well as the latest Termination Competition. This chapter will examine the interfaces from which the relevant data is fetched as well as their special characteristics. I will go into the details of how StarExec works and how to get the data.

## History

StarExec is _"a public web-based service built to facilitate the experimental evolution of logic solvers, broadly understood as automated tools based on formal reasoning. (...) The service, (...), is designed to provide a single piece of storage and computing infrastructure to logic solving communities and their members. It aims at reducing duplication of effort and resources as well as enabling individual researchers or groups with no access to comparable infrastructure."_ [@stump_starexec:_2014] The work on StarExec started in 2012 as a joint development of the University of Iowa and the University of Miami. It is a cluster of 193 quad-core CPUs and 128 to 256 Gigabyte main memory each running a Red Hat Enterprise Linux.

The first public event was held in summer 2013. One year later, the Termination Competition 2014 was realized with StarExec.

<!-- 
* cite about-page from StarExec
* exists since when?
* Hardware?
 -->

## Data-Model

The data-model has three major entities: the jobs, the solvers and the benchmarks. A benchmark is a formular[^starexec_wiki_project_overview] regarding a formal problem which will be processed by a solver. A solver is a programm that takes a benchmark, analyses it and gives an output regarding the given task. For example, in the case of the Termination Competition, this output should mainly consist of one of the following results: YES, NO, MAYBE. Whereby the answer YES can also contain additional information for the complexity of the problem. A post-processor is responsible for filtering this info out of the solvers log.

[^starexec_wiki_project_overview]: see https://wiki.uiowa.edu/display/stardev/Project+Overview

A job is a complex task with a set of solver and benchmarks, where each solver processes each benchmark. Each relation between a certain solver and benchmark is called job-pair. Each job-pair consists of the solver's log (stdout and stderr). The job-pair is directly connected to the result info, which contains the solver's result and additional info such as cpu- and wallclock-time, the configuration and identifying information of the certain solver and benchmark.

<!-- a figure could illustrate the relation between jobs, solver and benchmarks -->

So, when a job is started, each solver will be started as well with a benchmark as input. The StarExec infrastructure itself takes care that all available CPUs are busy. Of course, not all job-pairs are started at the same time. If a solver finished its task a post-processor is working on the solver's output to extract the actual result (YES, NO, MAYBE). All information will then be stored in the MySQL database.

<!-- 
* job
* solver
* benchmark
* job-pair / result
* post-processor
 -->

## Interfaces

### GUI

### API

<!-- starexeccommand -->
