# Evaluation

First of all, the 2014 Termination Competition can be seen as a success. The competition run passed without any failures and Star-Exec-Presenter mostly if not always ran stable during the event. We also got positive comments from the community.[^termtools1][^termtools2] The tool was able to handle multiple requests to StarExec as well as processed the data according to the requirements of the competition. Star-Exec-Presenter proved to be a huge first move towards being a useful tool for the Termination Community. Nearly all requirements were met in there basic sense.

[^termtools1]: see http://lists.lri.fr/pipermail/termtools/2014-July/000971.html
[^termtools2]: see http://lists.lri.fr/pipermail/termtools/2014-July/000972.html

Of course, there is much room for improvements. The RESTful interface can be more RESTful, e.g. that it also can respond with an XML or JSON output. The web interface is also very much basic and not really functional. In an optical sense Star-Exec-Presenter could have more of an own identity. And most importantly, as it still is experimental, the querying could be more elaborated. The web interface isn't very useful and the query-URLs are only serializations/deserializations of the underlying datatypes.

## Future considerations

For future versions of Star-Exec-Presenter, there are some points I want to bring in some ideas. Currently, the caching mechanism is invoked by a client's request. Additionally a background worker can handle the whole caching alone by regularly traversing the database's content and requesting the latest information from StarExec. Also, the internal caching stores can be defined better. At the moment, the database is not only used for the data from StarExec but also for meta information such as which information is currently requested. This information should be better put in the main memory via STM rather than in the database.

Of course, the whole code quality of Star-Exec-Presenter could be improved and the expressiveness of Haskell could also be better used throughout the project. This leads to a major improvement: a more general basic code base to be used not only by the Termination Community. But, it may be difficult to meet all the requirements of all the other communities.

Another aspect is the web interface itself, whose usability could probably be improved by the utilization of a frontend framework such as AngularJS[^angular] or Ember.js[^emberjs]. With the help of AJAX the web interface could feel more like an application as it is possible to completely avoid any page reloads. A more important issue is the export of all the data stored in the database. So, a generalized export could be useful as we currently have three types of data sources: StarExec, LRI and UIBK. If a new instance of Star-Exec-Presenter will be installed, all these exported data can be imported again.

[^angular]: see https://angularjs.org/
[^emberjs]: see http://emberjs.com/

## StarExec

The StarExec service is a crucial part of the Star-Exec-Presenter. Without it, there would only be the old data for use. During the work on our tool, we experienced some problems I want to point out. Hopefully, this may lead to improvements – or at least inspirations – by the developers of StarExec. First of all, there were times when StarExec was inaccessible. Luckily, this happened only during the beginning of the development of Star-Exec-Presenter. Another area that could profit from improvements is the whole interface by which we collect all the data. Currently, it is a mix of zipped CSV files, HTML webpages or some JSON. There could be a RESTful API that is designed for tools such as Star-Exec-Presenter. In the following I want to propose such an API (which is loosely based on our interface):

```
/jobs/#JobID                GET
/solvers/#SolverID          GET
/benchmarks/#BenchmarkID    GET
/pairs/#JobPairID           GET
/post_procs/#PostProcID     GET
/results/#JobID             GET
```

By supporting JSON, CSV or even XML and HTML, this API could meet any needs. Of course, this has to be implemented by the developers of StarExec who might not have enough resources available to fullfill our wishes.
