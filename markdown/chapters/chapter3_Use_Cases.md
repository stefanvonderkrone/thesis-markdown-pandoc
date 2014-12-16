# Use Cases

In this chapter I will list the use cases which the Star-Exec-Presenter is mapped onto. These use cases range from simple tasks, for instance displaying solver-results from StarExec, up to more complex ones, like starting and monitoring a competition.

## Displaying Results and Outputs

The core of StarExec is not only to run the solver on specific benchmarks but also to host the results and outputs of each run. So a major task for the Star-Exec-Presenter is to display that data in an appropriate way.

## Compare Results

Simply displaying the results and outputs of each solver-run is not enough. It is more important to compare that data between several solver.

## Interpret Outputs as possible XML-Proofs

Some solver explicitly log an XML-proof with each run in its output. This proof should be detected as well as extracted from the output. Also the respective XSL-File should be used to display the proof in the browser.

## Start a predefined Competition

One of the core use cases of the Star-Exec-Presenter is the ability to start a competition run on StarExec. As StarExec actually doesn't know what a competition in our terms is, Star-Exec-Presenter should know it. So all meta-information of a competition should be managed by the Star-Exec-Presenter. These meta information include hierarchical information of the competition's organisation as well as the details which we'll send to or get from StarExec.

Hierarchical information is meant as how each solver and benchmark is organised within the competition. Each competition consists of several meta categories which cover a general topic in the competition. The 2014 Termination Competition has the following: "Termination of Term Rewriting (and Transition Systems)", "Complexity Analysis of Term Rewriting" and "Termination of Programming Languages".

Each meta category is devided into smaller, more specific categories, each being a representation of an actual job on StarExec. These categories may be best described by the meta categories "Termination of Programming Languages", as there is a category about the programming language C. Other categories could bring up Java, Logic Programming or Functional Programming.

## Displaying a Competition and its Results
