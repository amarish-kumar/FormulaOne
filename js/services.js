angular.module('formulaOneApp.services', ['ngResource'])
  .factory('News', function($resource) {
    return {
      latestNews: $resource(config.googleNews, {
        'get':  { method: 'JSONP', cache: true, isArray: true }
      })
    };
  }).factory('Driver', function($resource) {
    return {
      standings: $resource(config.api + ':series/:season/driverStandings.json', {
        'get': { method:'GET', cache: true, isArray:true }
      }),
      driver: $resource(config.api + ':series/drivers/:id.json', {
        'get': { method:'GET', cache: true, isArray:true }
      }),
      driverStandings: $resource(config.api + ':series/drivers/:id/driverStandings.json', {
        'get': { method:'GET', cache: true, isArray:true }
      }),
      cache: $resource('db/cache/drivers/:id.json', {
        'get': { method:'GET', cache: true, isArray:true }
      })
    };
  }).factory('Circuit', function($resource) {
    return {
      circuits: $resource(config.api + ':series/:season/circuits.json', {
        'get': { method:'GET', cache: true, isArray:true }
      }),
      circuit: $resource(config.api + ':series/circuits/:id.json', {
        'get': { method:'GET', cache: true, isArray:true }
      })
    };
  }).factory('Constructor', function($resource) {
    return {
      standings: $resource(config.api + ':series/:season/constructorStandings.json', {
        'get': { method:'GET', cache: true, isArray:true }
      }),
      constructor: $resource(config.api + ':series/constructors/:id/constructorStandings.json', {
        'get': { method:'GET', cache: true, isArray:true }
      }),
      cache: $resource('db/cache/constructors/:id.json', {
        'get': { method:'GET', cache: true, isArray:true }
      })
    };
  }).factory('Result', function($resource) {
    return {
      race: $resource(config.api + ':series/:season/:id/results.json', {
        'get': { method:'GET', cache: true, isArray:true }
      }),
      qualifying: $resource(config.api + ':series/:season/:id/qualifying.json', {
        'get': { method:'GET', cache: true, isArray:true }
      })
    };
  }).factory('Schedule', function($resource) {
    return {
      schedule: $resource(config.api + ':series/:season.json', {
        'get': { method:'GET', cache: true, isArray:true }
      })
    };
});
