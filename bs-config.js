var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    server: {
        middleware: {
            1: proxyMiddleware('/api', {
                target: 'http://localhost:8080',
                onProxyReq: function(req) {
                    
                },
                xfwd: true,
                changeOrigin: true   // for vhosted sites, changes host header to match to target's host
            }),
	    2: proxyMiddleware('/oauth', {
                target: 'http://localhost:8080',
                onProxyReq: function(req) {
                    
                },
                xfwd: true,
                changeOrigin: true   // for vhosted sites, changes host header to match to target's host
            }),


            3: fallbackMiddleware({
                index: '/index.html', verbose: true
            })
        }
    },
    open: false
};
