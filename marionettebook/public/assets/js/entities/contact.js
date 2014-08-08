ContactManager.module("Entities", function(Entities, ContactManager,
                                           Backbone, Marionette, $, _){
    Entities.Contact = Backbone.Model.extend({
        defaults: {
            firstName: "",
            phoneNumber: "No phone number!"
        }
    });

    Entities.ContactCollection = Backbone.Collection.extend({
        model: Entities.Contact,
        comparator: function(m1, m2) {
            if(m1.get('firstName') < m2.get('firstName')) {
                return -1;
            }

            if(m1.get('firstName') === m2.get('firstName')) {
                if(m1.get('lastName') < m2.get('lastName')) {
                    return -1;
                }
                else if(m1.get('lastName') > m2.get('lastName')) {
                    return 1;
                }
                return 0;
            }

            return 1;
        }
    });

    var contacts;

    var initializeContacts = function() {
        contacts = new Entities.ContactCollection([
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
    };

    var API = {
        getContactEntities: function() {
            if(contacts === undefined) {
                initializeContacts();
            }
            return contacts;
        }
    };

    ContactManager.reqres.setHandler("contact:entities", function() {
        return API.getContactEntities();
    })
});