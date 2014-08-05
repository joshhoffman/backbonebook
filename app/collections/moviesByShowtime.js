var Backbone = require('backbone');
var _ = require('underscore');

var Movie = require('models/movie');

var MoviesByShowtime = Backbone.Collection.extend({
    model: Movie,
    comparator: function(m) {
        return -m.toShowtimeDate();
    },
    log: function() {
        console.log(this.models);
        this.each(function(movie) {
            console.log(movie.get('title') + ' ' + movie.showtimeToString() + '(' + movie.get('showtime') + ')');
        })
    }
});

module.exports = MoviesByShowtime;