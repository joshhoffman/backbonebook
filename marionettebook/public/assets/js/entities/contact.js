ContactManager.module("Entities", function(Entities, ContactManager,
                                           Backbone, Marionette, $, _){
    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts",
        defaults: {
            firstName: "",
            phoneNumber: "No phone number!"
        }
    });
    
    Entities.configureStorage(Entites.Contact);

    Entities.ContactCollection = Backbone.Collection.extend({
        url: "contacts",
        model: Entities.Contact,
        comparator: 'firstName'
    });
    
    Entities.configureStorage(Entities.ContactCollection);

    var contacts;

    var initializeContacts = function() {
        var contacts = new Entities.ContactCollection([
            {
                id: 1,
                firstName: "Bob",
                lastName: "Brigham",
                phoneNumber: "555-0163"
            },
            {
                id: 2,
                firstName: "Alice",
                lastName: "Artsy"
            },
            {
                id: 3,
                firstName: "Alice",
                lastName: "Arten",
                phoneNumber: "555-0184"
            },
            {
                id: 4,
                firstName: "Charlie",
                lastName: "Campbell",
                phoneNumber: "555-0129"
            }
        ]);
        contacts.forEach(function(contact) {
            contact.save();
        });
        return contacts;
    };

    var API = {
        getContactEntities: function() {
            var contacts = new Entities.Contactcollection();
            contacts.fetch();
            if(contacts.length === 0) {
                return initializeContacts();
            }
            return contacts;
        }
    };

    ContactManager.reqres.setHandler("contact:entities", function() {
        return API.getContactEntities();
    })
});