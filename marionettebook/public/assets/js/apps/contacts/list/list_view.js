ContactManager.module("ContactsApp.List", function(List, ContactManager,
    Backbone, Marionette, $, _) {

    List.Layout = Marionette.LayoutView.extend({
        template: "#contact-list-layout",
        regions: {
            panelRegion: "#panel-region",
            contactsRegion: "#contacts-region"
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: "#contact-list-panel",
        triggers: {
            "click button.js-new": "contact:new"
        }
    });

    List.Contact = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#contact-list-item",
        triggers: {
            "click button.js-delete": "contact:delete",
            "click td a.js-show": "contact:show",
            "click td a.js-edit": "contact:edit"
        },
        events: {
            "click" : "highlightName"
        },

        highlightName: function() {
            this.$el.toggleClass("warning");
        },

        deleteClicked: function(e) {
            e.stopPropagation();
            this.trigger("contact:delete", this.model);
        },

        showClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("contact:show", this.model);
        },

        editClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('edit clicked');
            this.trigger("contact:edit", this.model);
        },

        remove: function() {
            var self = this;
            this.$el.fadeOut(function() {
                Marionette.ItemView.prototype.remove.call(self);
            });
        },

        flash: function(cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                setTimeout(function () {
                    $view.toggleClass(cssClass);
                }, 500);
            });
        }
    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#contact-list",
        childView: List.Contact,
        childViewContainer: "tbody",
        
        initialize: function() {
            this.listenTo(this.collection, "reset", function() {
                this.attachHtml = function(collectionView, childView, index) {
                    collectionView.$el.append(childView.el);
                }
            });
        },
        
        onRenderCollection: function() {
            this.attachHtml = function(collectionView, childView, index) {
                collectionView.$el.prepend(childView.el);
            }
        }
    });
})