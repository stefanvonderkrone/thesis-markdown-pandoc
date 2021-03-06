# Requirements

This chapter discusses the requirements that were agreed to. Which data is interesting and how is it handled? How should the application be developed, which kind of data should be accessible through the Star-Exec-Presenter? And how should the application incorporate with StarExec? All requirements are infered from the previous chapter.

## Solver and Post processor output

To display the results of a job on StarExec we must know which data actually is important. So, basically StarExec knows two different kinds of resulting data. The first is a table which contains the resulting data of each solver-benchmark combination (the job-pair) of the job. It tells us the final result of a job-pair as well as its CPU- or Wallclock-Time and its current status. Each job-pair has a unique identifier which leads us to the second kind of resulting data: the output of a job-pair which is accessible separately. It contains the standard-out of the solver and a log generated by StarExec.

The aforesaid table should be displayed wellarranged with the Star-Exec-Presenter. Important data kinds are of course the result of the job-pair as well as the CPU- and Wallclock-Time. The presentation should be easy to read and its information should be gathered quickly.

The output of the job-pair should be scanned for XML to determine wether it contains a proof. The corresponding presentation should give the chance to display that proof according to its required XSL-Stylesheet.

All data should be persistently stored in a Postgre-SQL database.

## Compact web interface

The web interface of StarExec is quite verbose and not specifically matching the needs of members of the termination community. So, the Star-Exec-Presenter should feature a much more compact web interface which clearly guides the user to the destined information. Readability is important.

## Short response time

As StarExec is located in Iowa and some requests require expensive fetching from its database some responses may need up to seconds to be fully available. This is not desired as some users may consider it as an error of the Star-Exec-Presenter. So our tool should cache all data that it loads from StarExec. An additional information should be shown when such data is about to be fetched. The desired effect is that each request is responded as early as possible. Also every additional calculation which is repeatedly needed should be cached, too.

## RESTful API

The Termination Community is filled with members living all over the world and they may want to be able to send interesting data by e-mail. And as it is not necessary to pack all data into one e-mail, why not simply send a URL? So, another requirement should be to have distinctive URLs which contain all informationen required to display the desired data. Such a URL can point to the results of a job on StarExec and only requires the identifier of that particular job.

## Import old data

There is one use case which defines that a user should be able to compare certain job results. These results may not only originate from a job on StarExec but also from previous competitions whose data may not be available on StarExec. So, Star-Exec-Presenter should be able to import as well as to handle such data.
