var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

const API_URL = process.env.API_URL || 'http://localhost:8080';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

/**
 * Proxy for backend
 */
app.use('/api', proxy({
        target: API_URL,
        onProxyReq: function(req) {  
        },
        xfwd: true,
        changeOrigin: true   // for vhosted sites, changes host header to match to target's host
    })
);

app.use('/oauth',  proxy({
        target: API_URL,
        onProxyReq: function(req) {
        },
        xfwd: true,
        changeOrigin: true   // for vhosted sites, changes host header to match to target's host
    })
);

app.get('/*', (request, response) => {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});