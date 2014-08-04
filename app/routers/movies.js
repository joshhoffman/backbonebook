var Backbone = require('backbone');

// data
var Movies = require('collections/movies');
var data = require('./movies.json');
var movies = new Movies(data);

// views
var MoviesList = require('views/moviesList');

var MoviesRouter = Backbone.Router.extend({
    routes: {
        '/movies/:id': 'SelectMovie',
        '': 'ShowMain'
    },

    SelectMovie: function(id) {
        console.log('in select movie');
        this.moviesList.render();
        this.movies.selectByID(id);
    },

    ShowMain: function() {
        console.log('in show main');
        this.moviesList.render();
    },

    initialize: function(options) {
        console.log('in router init');
        this.movies = movies;
        console.log('test1');
        this.moviesList = new MoviesList({
            el: options.el,
            collection: movies
        });
        console.log(this.moviesList);
        console.log('test');
    }
});

module.exports = MoviesRouter;