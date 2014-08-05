var _ = require('underscore');
var Backbone = require('backbone');

// import movie list
var MoviesList = require('views/moviesList');
var DetailsView = require('views/details');
var ChoseView = require('views/chose');

var Layout = Backbone.View.extend({
    template: _.template('\
                        <div id="overview"> \
                        </div> \
                        <div id="details"> \
                        </div>'),
    render: function() {
        this.$el.html(this.template());
        this.currentDetails.setElement(this.$('#details')).render();
        this.overview.setElement(this.$('#overview')).render();

        return this;
    },
    initialize: function(options) {
        this.currentDetails = new ChoseView();
        this.overview = new MoviesList({
            collection: options.router.movies,
            router: options.router
        });
        this.currentDetails = new ChoseView();
    },
    setDetails: function(movie) {
        if(this.currentDetails) this.currentDetails.remove();
        this.currentDetails = new DetailsView({model: movie});
        this.render();
    },
    setChose: function() {
        if(this.currentDetails) this.currentDetails.remove();

        this.currentDetails = new ChoseView();
        this.render();
    }
});

var instance;
Layout.getInstance = function(options) {
    if(!instance) {
        console.log('new instance');
        instance = new Layout({
            el: options.el,
            collection: options.router.movies,
            router: options.router
        });
    }

    return instance;
};

module.exports = Layout;