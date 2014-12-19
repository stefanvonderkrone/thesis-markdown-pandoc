\mainmatter

#Introduction 

This is a guide to the Star-Exec-Presenter, a web-based visualization and data-mining software developed in preparation of this thesis. The Star-Exec-Presenter is intended to be an efficient to use software for members of the termination community of the StarExec service, as well as other communities or users of StarExec. The web application features essential functionalities such as starting competitions, loading results and other data from StarExec or visualizing and filtering such data.

Termination is a branch of theoretical computer science where programs such as algorithms are examined, whether they terminate, that is whether they complete. In terms of StarExec, solvers are running over a bunch of problems returning an answer for each problem: Yes, No or Maybe.

The Termination Competition is an annual event of the termination community of StarExec, where solvers from different contributors compete in several categories. In 2014 the competition was organized by my adviser, Prof. Johannes Waldman, and me. Our goal was to do both, starting the competition run as well as to present it via an automatically updated web-interface.

The 2014 competition caused a total amount of 13 Gigabyte of data and needed about 90 days of CPU time on all of the 192 Quad-Core CPUs of the StarExec cluster. [@waldmann_termtools_2014]

Our additional goal was to be able to compare these results with those from previous ones. So we added an option to import the data from the 2007 competition hosted by the Laboratory of Computer Science at Université Paris-Sud and the following competitions hosted by the University of Innsbruck.

"StarExec is a cross community logic solving service developed at the University of Iowa (...)." [@starexec_about_2013] It is a technical infrastructure providing the service to run logic solvers on a powerful cluster of CPUs. It also provides an extensive web-based user interface to upload and run solvers and problems, referred to as benchmarks. A REST-based[^REST] API is utalized by the Star-Exec-Presenter.

[^REST]: Representational state transfer, a paradigm to implement a server-client communication

The Star-Exec-Presenter is the software developed as the concrete work for this thesis. It is a web application programmed in Haskel[^Haskell] with the utalization of the Yesod Web Framework[^YesodWeb].

[^Haskell]: a functional, non-strict, declarative programming language (http://www.haskell.org/)
[^YesodWeb]: a REST-based web application framework (http://www.yesodweb.com/)

The motivation of this thesis is to provide a tool for StarExec users for further research as well as some kind of standardization of hosting and running future termination competition and competitions of other StarExec communities. The goal for Star-Exec-Presenter is to be a tool, that is easy to use as well as easy to install and run. It is open source, so it can be forked und changed to better meet future needs.

With Star-Exec-Presenter we wanted to extend the ability of the StarExec service with filtering of the results and comparing them with older ones from previous competitions. Contributers of solvers should be able to track their progress of development of their respective solver through time.
