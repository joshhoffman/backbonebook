ContactManager.module("ContactsApp.New", function (New, ContactManager,
    Backbone, Marionette, $, _) {
    New.Contact = ContactMaager.ContactsApp.Common.Views.Form.extend({
        title: "New Contact"
    });
});