var $ = require('jquery-untouched');
var Backbone = require('backbone');
Backbone.$ = $;

var MovieView = require('views/movie');

var MoviesList = Backbone.View.extend({
    tagName: 'section',
    render: function() {
        var that = this;
        var moviesView = this.collection.map(function(movie) {
            return (new MovieView({model: movie, router: that.router})).render().el;
        });
        console.log('in movieslist render');
        this.$el.html(moviesView);
        return this;
    },
    initialize: function(options) {
        this.router = options.router;
        this.listenTo(this.collection, 'reset', this.render);
    }
});

var instance;
MoviesList.getInstance = function(options) {
    if(!instance) {
        console.log('new movies instance');
        instance = new MoviesList({
            el: options.el,
            collection: options.collection,
            router: options.router
        });
    }

    return instance;
};

module.exports = MoviesList;