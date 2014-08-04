var Backbone = require("backbone")

var Movie = Backbone.Model.extend({
    defaults: {
        title: "default",
        year: 0,
        description: "empty",
        selected: false
    },
    initialize: function() {
        console.log('movie init');
    }
});
module.exports = Movie;