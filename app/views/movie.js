var $ = require('jquery-untouched');
var Backbone = require('backbone');
var _ = require('underscore');

var MovieView = Backbone.View.extend({
    tagname: 'article',
    className: 'movie',
    template: '<h1><%= title %><hr></h1>',
    initialize: function() {
        console.log('in movie view init');
        this.listenTo(this.model, 'change:title', this.render)
    },
    render: function() {
        console.log('in movieview render');
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));

        this.$el.toggleClass('selected', this.model.get('selected'));
        return this;
    },
    events: {
        'click': '_selectMovie'
    },
    _selectMovie: function(ev) {
        console.log('select movie');

        ev.preventDefault();

        console.log($(ev.currentTarget).html());
        if (!this.model.get('selected')) {
            this.model.collection.resetSelected();
            this.model.collection.selectByID(this.model.id);
        }
    }
});

module.exports = MovieView;