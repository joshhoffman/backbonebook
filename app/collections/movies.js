var $ = require('jquery-untouched');
var Backbone = require('backbone');
Backbone.$ = $;

var Movie = require('models/movie');

var Movies = Backbone.Collection.extend({
    model: Movie,

    // Unselect all models
    resetSelected: function() {
        this.each(function(model) {
            console.log('reset');
            model.set({"selected": false});
        });
    },

    // Select a specific model form the collection
    selectByID: function(id) {
        this.resetSelected();
        var movie = this.get(id);
        console.log('setting movie');
        console.log(movie);
        movie.set({"selected": true});
        return movie.id;
    },
    initialize: function(models, options) {
        console.log('collection init');
    }
});

module.exports = Movies;