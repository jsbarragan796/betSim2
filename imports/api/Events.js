import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Events = new Mongo.Collection("Events");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('Events', function EventsPublication() {
        return Events.find();
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
    "Events.getAll"() {
        let res = Events.find({}).fetch();
        console.log(res);
    },
    "Events.addEvent"(category, name, place, date, image, team1, team2, prob1, prob2, tie) {
        let txtTest = "";

        txtTest += (category + "\n");
        txtTest += (name + "\n");
        txtTest += (place + "\n");
        txtTest += (date + "\n");
        txtTest += (image + "\n");
        txtTest += (team1 + "\n");
        txtTest += (team2 + "\n");
        txtTest += (prob1 + "\n");
        txtTest += (prob2 + "\n");
        txtTest += (tie + "\n");

        console.log(txtTest);

        let nEvent = {
            Category: category,
            Name: name,
            Place: place,
            Image: image,
            Team1: team1,
            Team2: team2,
            Date: date,
            Prob1: prob1,
            Prob2: prob2,
            Tie: tie,
            State: "NOT_STARTED",
            Team1R: 0,
            Team2R: 0,
            Bets1: 0,
            Bets2: 0,
            BetsT:0,
            Events: []
        };

        Events.insert(nEvent);
    },
    "Events.startEvent"(eId) {
        console.log("Starting event");

        Events.update(
            { _id: eId },
            {
                $set: { State: "STARTED" }
            }
        );
    },
    "Events.endEvent"(eId) {
        console.log("Ending event");

        Events.update(
            { _id: eId },
            {
                $set: { State: "FINISHED" }
            }
        );
    },
    "Events.updateScore"(eId, sc1, sc2) {
        Events.update(
            { _id: eId },
            {
                $set: {
                    Team1R: sc1,
                    Team2R: sc2
                }
            }
        );
    },
    "Events.addMatchEvent"(eId, fT, fM, fTi) {
        Events.update(
            { _id: eId },
            {
                $push: {
                    Events: {
                        text: fT,
                        minute: fM,
                        time: fTi
                    }
                }
            }
        );
    },
    "Events.addBet"(eId, b1, b2, bT) {

        let i1 = b1 > 0? 1 : 0;
        let i2 = b2 > 0? 1 : 0;
        let iT = bT > 0? 1 : 0;

        Events.update(
            { _id: eId },
            {
                $inc: {
                    Bets1: i1,
                    Bets2: i2,
                    BetsT: iT
                }
            }
        );
    }
});