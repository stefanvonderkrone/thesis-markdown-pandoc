\mainmatter

# Introduction 

This is a guide to the Star-Exec-Presenter, a web-based visualization and data-mining software developed in preparation of this thesis. The application is intended to be an efficient to use software for members of the Termination Community of the StarExec service, as well as other communities or users of StarExec. It features essential functionalities such as starting competitions, loading results and other data from StarExec or visualizing and filtering such data. Contributers of solvers should be able to track the progress of development of their respective solver by comparing its results over time.

The motivation of this thesis is to provide a tool for StarExec users for further research as well as some kind of standardization of hosting and running future Termination Competition and competitions of other StarExec communities. The goal for Star-Exec-Presenter is to be a tool, that is easy to use as well as easy to install and run. It is open source, so it can be forked und changed to better meet future needs.

Termination is a branch of theoretical computer science where programs such as algorithms are examined, whether they terminate, i.e. whether they complete. In particular, the termination of Term Rewriting System is of special interest for the Termination Community. A Term Rewriting System is a turing complete computational model such as Turing machines. In terms of StarExec, solvers are running over a bunch of problems returning an answer for each problem either with _YES_, _NO_ or _MAYBE_.

The Termination Competition is an annual event of the termination community of StarExec, where solvers from different contributors compete in several categories. In 2014 the competition was organized by my adviser, Prof. Dr. Johannes Waldman, and me. Our goal was to do both, starting the competition run as well as to present it via an automatically updated web-interface.

The 2014 competition generated a total amount of 13 Gigabyte of data and used about 90 days of CPU time on all of the 193 Quad-Core CPUs of the StarExec cluster.[^waldmann_termtools_2014] It took over eleven hours to complete all jobs.

[^waldmann_termtools_2014]: see [http://lists.lri.fr/pipermail/termtools/2014-July/000979.html](http://lists.lri.fr/pipermail/termtools/2014-July/000979.html)

Our additional goal was to be able to compare the results with those from previous competitions. So we added an option to import the data from the 2007 competition hosted by the Laboratory of Computer Science at the University of Paris-Sud and the following competitions hosted by the University of Innsbruck.

_"StarExec is a cross community logic solving service developed at the University of Iowa (...)."_[^starexec_about_2013] It is a technical infrastructure providing the service to run logic solvers on a powerful cluster of CPUs. It also provides an extensive web-based user interface to upload and run solvers and problems, referred to as benchmarks. A REST-based[^REST] API[^api] is utalized by the Star-Exec-Presenter.

[^starexec_about_2013]: see [https://www.starexec.org/starexec/public/about.jsp](https://www.starexec.org/starexec/public/about.jsp)
[^REST]: Representational state transfer, a paradigm to implement a server-client communication
[^api]: Application programming interface, a set of components (methods, protocols, tools) for using a software

The Star-Exec-Presenter is the software developed as the concrete work for this thesis. It is a web application programmed in Haskel[^Haskell] with the utalization of the Yesod Web Framework[^YesodWeb].

[^Haskell]: a functional, non-strict, declarative programming language ([http://www.haskell.org/](http://www.haskell.org/))
[^YesodWeb]: a REST-based web application framework ([http://www.yesodweb.com/](http://www.yesodweb.com/))

In the following chapters I will go through the various topics of this thesis starting with the _Termination_ where I will try to discuss _Termination of Term Rewriting_, the community itself and the _Termination Competition_ as well as the _Termination Problem Data Base_, the compilation of problems which all participating tools have to solve. I will give an introduction to _StarExec_ and how it works in the perspective of our tool, the Star-Exec-Presenter. I will list some _Use Cases_ which we want to make possible. Afterwards these use cases are derived from by the _Requirements_ which define what our tools has to be capable of. The _Design_ and _Implementation_ will then explain the internals of Star-Exec-Presenter by going into the details of its _Data Model_ or the _Caching_ mechanism as well as the actual code by giving an introduction to _Haskell_ and the _Yesod Web Framework_. Finally, this thesis will be concluded by an _Evaluation_.

The complete source code of the Star-Exec-Presenter can be found on the CD appended to this thesis. It is also hosted on GitHub[^github_repo]. The latest version can be found in the `develop` branch.[^devel_branch]

[^github_repo]: see https://github.com/stefanvonderkrone/star-exec-presenter
[^devel_branch]: see https://github.com/stefanvonderkrone/star-exec-presenter/tree/develop
