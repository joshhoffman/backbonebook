ContactManager.module("ContactsApp.List", function(List, ContactManager,
    Backbone, Marionette, $, _) {
    List.Controller = {
        listContacts: function() {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);
            
            var fetchingContacts = ContactManager.request("contact:entities");

            var contactsListLayout = new List.Layout();
            var contactsListPanel = new List.Panel();

            $.when(fetchingContacts).done(function(contacts) {
                var contactsListView = new List.Contacts({
                    collection: contacts
                });

                contactsListLayout.on("show", function() {
                    contactsListLayout.panelRegion.show(contactsListPanel);
                    contactsListLayout.contactsRegion.show(contactsListView);
                });
                
                contactsListPanel.on("contact:new", function() {
                    var newContact = new ContactManager.Entities.Contact();
                    
                    var view = new ContactManager.ContactsApp.New.Contact({
                        model: newContact
                    });
                    
                    console.log("got event");
                    
                    view.on("form:submit", function(data) {
                        if(contacts.length > 0) {
                            var highestId = contacts.max(function(c) { return c.id; }).get("id");
                            data.id = highestId + 1;
                        } else {
                            data.id = 1;
                        }
                        
                        if(newContact.save(data)) {
                            contacts.add(newContact);
                            view.trigger("dialog:close");
                            contactsListView.children.findByModel(newContact).flash("success");
                        } else {
                            view.triggerMethod("form:data:invalid", newContact.validationError);
                        }
                    });
                    
                    ContactManager.dialogRegion.show(view);
                });

                contactsListView.on("childview:contact:delete", function(childView, args) {
                    args.model.destroy();
                });

                contactsListView.on("childview:contact:show", function(childView, args) {
                    ContactManager.trigger("contact:show", args.model.get("id"));
                });

                contactsListView.on("childview:contact:edit", function(childView, args) {
                    var model = args.model;
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model
                    });
                    
                    view.on("form:submit", function(data) {
                        if(model.save(data)) {
                            childView.render();
                            view.trigger("dialog:close");
                            childView.flash("success");
                        } else {
                            view.triggerMethod("form:data:invalid", model.validationError);
                        }
                    });
                    
                    console.log('showing view');

                    ContactManager.dialogRegion.show(view);
                });

                ContactManager.mainRegion.show(contactsListLayout);
           });
        }
    }
});