var http      = require('http'),
    https     = require('https'),
    fs        = require('fs'),
    url       = require('url'),
    httpProxy = require('http-proxy');

require('date-utils');

var options = {
  key: fs.readFileSync('/some/place/secure/some.key'),
  cert: fs.readFileSync('/some/place/secure/some.crt')
};




var proxy = new httpProxy.RoutingProxy();

var myNow;

var auth  = require('http-auth'),
    basic = auth({
      authRealm : "Internal TI.net Term1",
      authList  : ['USER1:PASSWORD'],
      authType  : 'basic'
    });

https.createServer(options, function (req, res) {

  
  var reqHost = req.headers.host.split(':'),
      reqDom  = reqHost[0],
      reqPort = reqHost[1];


  myNow = new Date().toFormat('YYYY-MM-DD HH24:MI:SS ');
  console.dir({
    'Headers Host':reqHost, 'Domain': reqDom,
    'Port':reqPort, 'url':req.url
  });

 
  if (reqDom.toLowerCase() === "DOMAIN1.net") {

    if (req.url === "/debug") {
        console.log("%s Прямой вывод страницы/отладки", myNow);
        var parsedUrl = url.parse(req.url);
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(require("util").inspect(parsedUrl));
        res.end();
    } else if (req.url.toLowerCase() === "/3000") {
        console.log("%s Proxying to https://localhost:3000", myNow);
        proxy.proxyRequest(req, res, {
          host: 'localhost',
          port: 3000
        });
    } else {
        console.log("%s Proxying to https://localhost:8002", myNow);
        proxy.proxyRequest(req, res, {
          host: 'localhost',
          port: 8002,
          target: { https: true }
        });
    }
  } else if (reqDom.toLowerCase() === "DOMAIN2.com") {
    console.log("%s Proxying to http://localhost:8022", myNow);
    basic.apply(req, res, function() {
        proxy.proxyRequest(req, res, {
            host : 'localhost',
            port : 8022
        });
    });
  } else if (reqDom.toLowerCase() === "DOMAIN3.com") { 
    console.log("%s Proxying to http://localhost:8010", myNow);
    basic.apply(req, res, function() {
        proxy.proxyRequest(req, res, {
            host : 'localhost',
            port : 8010
        });
    });
  } else {
    console.log("%s Not a known route - cannot proxy %s%s", myNow, req.headers.host, req.url);
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write(myNow + "Unknown route - cannot dispatch");
    res.end();
  }


  
}).listen(8000, function() {
  myNow = new Date().toFormat('YYYY-MM-DD HH24:MI:SS ');
  return console.log("%s Прокси прослушивает порт  %d", myNow, 8000);

});

process.on('uncaughtException', function(err) {
  myNow = new Date().toFormat('YYYY-MM-DD HH24:MI:SS ');
  console.log("%s ERROR: %s", myNow, err);
});