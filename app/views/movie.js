var $ = require('jquery-untouched');
var Backbone = require('backbone');
var _ = require('underscore');

var MovieView = Backbone.View.extend({
    tagname: 'article',
    className: 'movie',
    template: "<h1><a href='/movies/<%= id %>'><%= title %></a><hr></h1>",
    initialize: function(options) {
        this.listenTo(this.model, 'change:title', this.render);
        this.listenTo(this.model, 'change:selected', this.render);
        this.router = options.router;
    },
    render: function() {
        console.log('!!!!!');
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));

        this.$el.toggleClass('selected', this.model.get('selected'));
        return this;
    },
    events: {
        'click': 'selectMovie'
    },
    selectMovie: function(ev) {
        console.log('select movie');

        if (!this.model.get('selected')) {
            console.log('!!! ' + this.model.id);
            console.log(this.model);
            this.router.navigate("/movies/" + this.model.id, {trigger: true});
        }
    }
});

module.exports = MovieView;