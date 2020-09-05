var apiBenchmark = require('api-benchmark');
var fs = require('fs');
const request = require('request');
const token='185198d03fe2e1a587f0105ee9b5e433';


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var service = {
    server1: "https://localhost:8765/energy/api/"
};



var routes = {
    dayAheadTotalLoad: {
        method: 'get',
        route: 'DayAheadTotalLoad/Greece/PT60M/date/2018-01-04',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'x-observatory-auth': token
        }
    }
};



apiBenchmark.measure(service, routes , {
    debug: false,
    runMode: 'sequence',
    delay: 0,
    maxTime: 100000,
    minSamples: 250,
    stopOnError: false
    }, function(err, results){
  apiBenchmark.getHtml(results, function(error, html){
    fs.writeFileSync('../benchmarks_results/test.html', html);
  });
});
