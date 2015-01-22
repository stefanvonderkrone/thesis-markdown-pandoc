# Use Cases

In this chapter I will list the use cases which the Star-Exec-Presenter is mapped onto. These use cases range from simple tasks, for instance displaying solver-results from StarExec, up to more complex ones, like starting and monitoring a competition.

## Start a predefined Competition

One of the core use cases of the Star-Exec-Presenter is the ability to start a competition run on StarExec. As StarExec actually doesn't know what a competition in our terms is, Star-Exec-Presenter should know it. So all meta-information of a competition should be managed by the Star-Exec-Presenter. These meta information include hierarchical information of the competition's organisation as well as the details which we'll send to or get from StarExec.

Hierarchical information is meant as how each solver and benchmark is organised within the competition. Each competition consists of several meta categories which cover a general topic in the competition. The 2014 Termination Competition has the following categories: _Termination of Term Rewriting (and Transition Systems)_, _Complexity Analysis of Term Rewriting_ and _Termination of Programming Languages_.

Each meta category is devided into smaller, more specific categories, each being a representation of an actual job on StarExec. These categories may be best described by the meta categories _Termination of Programming Languages_, as there is a category about the programming language C. Other categories could bring up Java, Logic Programming or Functional Programming.

## Displaying Results and Outputs

The core function of StarExec is not only to run the solver on specific benchmarks but also to host the results and outputs of each run. So a major task for the Star-Exec-Presenter is to display that data in an appropriate way. The explicit data is the result of a solver with a specific benchmark and its CPU- as well as Wallclock-Time. Additionally the solver's output is important which is accessible on StarExec with the job-pair, a unique combination of solver and benchmark within the specific job. The output can contain plain text or even XML or HTML. Figure 4.1 is a screenshot of the results of a job.

![example of an overview of job-results](figures/Job-Results.png)

### Displaying a Competition and its Results

The Star-Exec-Presenter is a tool that ran during the 2014 Termination Competition. It should display the current status of the competition run with a compact web interface that automatically updates itself. Figure 4.2 shows a screenshot of the implemented competition overview.

![overview of the Termination Competition 2014](figures/Competition-Overview.png)

### Interpret Outputs as HTML or XML

Some solver explicitly log an HTML- or XML-proof with each run in its output. This proof should be detected as well as extracted from the output. Also the respective XSL-File for the XML output should be used to display the proof in the browser.

## Compare Results, Querying

Simply displaying the results and outputs of each solver-run is not enough. It is more important to compare the results between several solver. Are there differences between their results on specific benchmarks? Also, a list of jobs should be displayable at once. A historical comparison is the most important aspect of this use case, as the developers of a solver would want to track the evolution of their tools.

As important comparing the result is as overwhelming is their amount, so a beneficial use case is querying the results according to specific filters. Such filters can eliminate unimportant results from the representation. For instance a benchmark is uninteresting if all solvers have the same result, so all those benchmarks can be filtered out.

The user should be able to concentrate on data which meets his or her interests. This data could tell which benchmark causes incorrect results with the own solver. Also it can illustrate changes in the solvers results in comparison to past runs, fo instance a once solved benchmark could now be unsolvable. This is the data we want to query in terms of data mining.
