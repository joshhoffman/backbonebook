var server = require('pushstate-server');

server.start({
    port:4000,
    directory: './static'
});