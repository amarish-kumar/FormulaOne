angular.module('formulaOneApp.controllers').controller('NewsController', function($scope, $location, $window, $sce, $http, $q, News) {

	function getNewsFeed() {
    var deferred = $q.defer();
    $http.jsonp(config.googleNews).success(function(data){
      console.log(data)
      if (data.responseStatus == 403) return deferred.resolve(data.responseDetails)
      var retVal = prepGoogleNews(data.responseData.results);
      return deferred.resolve(retVal);
    });
    return deferred.promise
  }

  function getNewsXml() {
    var deferred = $q.defer();
    $http.jsonp(config.googleApi + 'http://feeds.bbci.co.uk/sport/0/formula1/rss.xml?edition=uk&callback=JSON_CALLBACK').success(function(data){
      // console.log(data)
      if (data.responseStatus == 403) return deferred.resolve(data.responseDetails)
      var retVal = prepXMLNews(data.responseData.feed.entries);
      return deferred.resolve(retVal);
    });
    return deferred.promise
  }

  function getNewsYql() {
    var deferred = $q.defer();
    var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20data.html.cssselect%20WHERE%20url%3D'http%3A%2F%2Fnews.sky.com%2Fsearch%3Fterm%3Df1%26filter%3D'%20AND%20css%3D'li.results__item'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK"
    $http.jsonp(url).success(function(data){
      // console.log(data)
      if (data.responseStatus == 403) return deferred.resolve(data.responseDetails)
      var retVal = prepYqlNews(data.query.results.results.li);
      return deferred.resolve(retVal);
    });
    return deferred.promise
  }

  function getTwitterFeed(feed) {
    var deferred = $q.defer();
    var url = config.googleApi + config.twitterFeed + feed + '&callback=JSON_CALLBACK';
    // url = "http://rss2json.com/api.json?rss_url=https%3A%2F%2Fnews.ycombinator.com%2Frss"
    // console.log(url)
    $http.jsonp(url).success(function(data){
      var retVal = prepTweets(data.responseData.feed.entries, feed);
      return deferred.resolve(retVal);
    });
    return deferred.promise
  }

  $q.all([
      getNewsYql(),
      getNewsXml(),
      getTwitterFeed('@f1'), 
      getTwitterFeed('@McLarenF1'), 
      getTwitterFeed('@mercedesamgf1'), 
      getTwitterFeed('@therealdcf1'),
      getTwitterFeed('@redbullracing'),
      getTwitterFeed('@ScuderiaFerrari'),
      getTwitterFeed('@WilliamsRacing'),
      getTwitterFeed('@ForceIndiaF1'),
      getTwitterFeed('@Lotus_F1Team'),
      getTwitterFeed('@ToroRossoSpy'),
      getTwitterFeed('@manorf1team'),
      getTwitterFeed('@SauberF1Team'),
      getTwitterFeed('@bbcf1feed')
    ]).then(function(data) {

    $scope.content_loaded = true;
    var combined = [];
    for (var i = 0; i < data.length; i++) {
      combined = combined.concat(data[i])
    }
    var retVal = combined.sort(timestampSort).unique()
    $scope.results = retVal;
  });

  $location.path('/news');
  $scope.$on('$viewContentLoaded', function(event) {
    // console.log('viewContentLoaded', $location.url())
    $window.ga('send', 'pageview', { page: $location.url() });
  });

});