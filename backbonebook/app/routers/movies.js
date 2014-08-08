var Backbone = require('backbone');
var _ = require('underscore');

// data
var Movies = require('collections/movies');
var data = require('./movies.json');
var movies = new Movies(data);

// views
var Layout = require('views/layout');

var MoviesRouter = Backbone.Router.extend({
    routes: {
        'movies/:id': 'selectMovie',
        '':           'showMain'
    },

    selectMovie: function(id) {
        console.log('!!!select');
        this.movies.resetSelected();
        this.movies.selectByID(id);

        this.layout.setDetails(this.movies.get(id));
    },

    showMain: function() {
        console.log('in show main');
        this.movies.resetSelected();
        this.layout.setChose();
    },

    initialize: function(options) {
        this.movies = movies;
        this.layout = new Layout.getInstance({
            el: '#movies',
            router: this
        });
        this.layout.render();
        //_.extend(this.moviesList, {router: this});
    }
});

module.exports = MoviesRouter;