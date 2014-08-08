var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Obscura = require('backbone.obscura');

// import movie list
var MoviesList = require('views/moviesList');
var DetailsView = require('views/details');
var ChoseView = require('views/chose');

var Controls = require('views/controls');

var Layout = Backbone.View.extend({
    template: _.template('           \
             <header>   \
             <a href="#">Home</a>  \
               <nav id="controls"> \
                 <p>Sort:</p> \
                 <button id="prev">Previous</button> \
                 <button id="next">Next</button> \
                 <p>Sort:</p> \
                 <button id="by_title">By Title</button>  \
                 <button id="by_rating">By Rating</button>\
                 <button id="by_showtime">By Showtime</button> \
                 <p>Filter</p> \
                   <input type="checkbox" name="genres" value="Drama"> \
                     Drama \
                   </input> \
                   <input type="checkbox" name="genres" value="Action"> \
                     Action \
                   </input> \
               </nav> \
               <span id="info">  \
               </span>               \
             </header>            \
             <div id="overview">  \
             </div>               \
             <div id="details">   \
             </div>'),
    render: function() {
        this.$el.html(this.template());

        this.currentDetails.setElement(this.$('#details')).render();
        this.overview.setElement(this.$('#overview')).render();
        this.controls.setElement(this.$('#controls'));

        return this;
    },
    initialize: function(options) {
        this.proxy = new Backbone.Obscura(options.router.movies);
        this.proxy.setPerPage(4);

        this.controls = new Controls({
            proxy: this.proxy
        });
        this.overview = new MoviesList({
            collection: this.proxy,
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