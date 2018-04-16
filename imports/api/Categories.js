import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Categories = new Mongo.Collection("Categories");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('Categories', function CategoriesPublication() {
        return Categories.find();
/*
        if (!this.userId) {
            return this.ready();
          }
        
          return UserData.find({
            userId: this.userId
          }, {
            fields: UserData.publicFields
          });*/
    });
}

Meteor.methods({
  
});