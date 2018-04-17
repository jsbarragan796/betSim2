import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Bets = new Mongo.Collection("Bets");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('Bets', function userDataPublication() {

        if (!this.userId) {
            return this.ready();
        }

        //console.log("===============================================================");
        //console.log(Meteor.user());
        //console.log("===============================================================");

        if (Meteor.user().profile.isAdmin) {
            return Bets.find();
        } else {
            return Bets.find({
                userId: this.userId
            }, {
                    fields: Bets.publicFields,
                    sort: { eventId: 1 }
                });
        }
    });

    const addBetRule = {
        type: 'method',
        name: 'Bets.addBet'
    };

    const closeBetRule = {
        type: 'method',
        name: 'Bets.closeBet'
    };

    DDPRateLimiter.addRule(addBetRule, 5, 2000);
    DDPRateLimiter.addRule(closeBetRule, 5, 2000);
}

Meteor.methods({
    "Bets.addBet"(eI, p1, p2, pT, b1, b2, bT, e1, e2, eT) {
        Check(eI,String);
        Bets.insert({
            userId: this.userId,
            userName: Meteor.user().username,
            eventId: eI,
            Prob1: p1,
            Prob2: p2,
            ProbT: pT,
            Team1: b1,
            Team2: b2,
            Tie: bT,
            E1: e1,
            E2: e2,
            ET: eT,
            State: "OPEN"
        });
    },
    "Bets.closeBet"(betId) {
        Bets.update(
            { _id: betId },
            {
                $set: { State: "CLOSED" }
            }
        );
    }
});
