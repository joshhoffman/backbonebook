var Backbone = require('backbone');
var $ = require('jquery-untouched');
Backbone.$ = $;

var MoviesRouter = require('routers/movies');

$(document).ready(function() {
    console.log('init app...');
    var router = new MoviesRouter({
        el: $('#movies')
    });

    Backbone.history.start({
        pushState: true,
        root: '/'
    });
});
