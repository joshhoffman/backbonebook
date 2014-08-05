var Backbone = require('backbone');

var SortView = Backbone.View.extend({
    events: {
        'click #by_title': 'sortByTitle',
        'click #by_rating': 'sortByRating',
        'click #by_showtime': 'sortByShowtime'
    },

    sortByTitle: function(ev) {
        console.log('sort by title');
        this.movies.reset(this.movies.sortByTitle());
    },

    sortByRating: function(ev) {
        this.movies.reset(this.movies.sortByRating());
    },

    sortByShowtime: function(ev) {
        this.movies.reset(this.movies.sortByShowtime());
    },

    initialize: function() {
        this.movies = this.collection;
    }
});

module.exports = SortView;