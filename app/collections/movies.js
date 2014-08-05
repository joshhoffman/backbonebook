var Backbone = require('backbone');
var _ = require('underscore');

var Movie = require('models/movie');

var Movies = Backbone.Collection.extend({
    model: Movie,

    // Unselect all models
    resetSelected: function() {
        this.each(function(model) {
            model.set({"selected": false});
        });
    },

    getSelected: function() {
        return this.pluck('selected').indexOf(true);
    },

    // Select a specific model form the collection
    selectByID: function(id) {
        var movie = this.get(id);
        movie.set({"selected": true});
        return movie.id;
    },
    sortByTitle: function() {
        return this.sortBy('title');
    },
    sortByRating: function() {
        var sorted = this.sortBy(function(m) {
            return (10 - m.get('rating'));
        });
        return sorted;
    },
    sortByShowtime: function() {
        return this.sortBy('showtime');
    }
});

module.exports = Movies;