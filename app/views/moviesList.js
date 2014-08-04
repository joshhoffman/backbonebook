var $ = require('jquery-untouched');
var Backbone = require('backbone');
Backbone.$ = $;


var MovieView = require('views/movie');
var MoviesList = Backbone.View.extend({
    render: function() {
        console.log('in movieslist render1');
        var moviesView = this.collection.map(function(movie) {
            console.log('in map');
            return (new MovieView({model: movie})).render().el;
        });
        console.log('in movieslist render');
        this.$el.html(moviesView);
        return this;
    },
    initialize: function() {
        console.log('init list');
    }
});

module.exports = MoviesList;