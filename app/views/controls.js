var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;

var ControlsView = Backbone.View.extend({
    events: {
        'click #by_title': 'sortByTitle',
        'click #by_rating': 'sortByRating',
        'click #by_showtime': 'sortByShowtime',
        'click #next': 'paginateNext',
        'click #prev': 'paginatePrev',
        'change select[name="genre"]': 'selectGenres'
    },

    selectGenres: function(ev) {
        var genre = $("select[name='genre']").val();
        var that = this;
        that.proxy.resetFilters();
        console.log('in select genre');
        var genres = _.map($("input[type=checkbox]:checked"), function(genre) {
            that.proxy.filterBy(genre.value, function(m) {
                return (_.findWhere(m.get('genres'), genre.value));
            });
        });
    },

    paginateNext: function() {
        this.proxy.nextPage();
    },

    paginatePrev: function() {
        this.proxy.prevPage();
    },

    filterByCategory: function(genre) {
        var filtered = this.movies.filter(function(m) {
            return (_.indexOf(m.get('genres'), genre) !== -1)
        });
        this.collection.reset(filtered);
    },

    sortByTitle: function(ev) {
        console.log('by title');
        this.proxy.setSort("title", "dsc");
    },

    sortByRating: function(ev) {
        this.proxy.setSort("rating", "dsc");
    },

    sortByShowtime: function(ev) {
        this.proxy.setSort("showTime", "asc");
    },

    initialize: function(options) {
        this.proxy = options.proxy;
    }
});

module.exports = ControlsView;