import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('Users', function usersPublication() {

        if (!this.userId) {
            return this.ready();
        }

        return Users.find({});
        return Users.find({
            userId: this.userId
        }, {
                fields: Bets.publicFields,
                sort: { eventId: 1 }
            });
    });
}

Meteor.methods({
    "User.addCoins"(numCoins, nPrice, cC) {
        let date = new Date();

        console.log("Adding coins : " + numCoins + " | " + nPrice);

        Meteor.users.update(
            { _id: this.userId },
            {
                $inc: {
                    "profile.coins": numCoins
                }
            }
        );

        Meteor.users.update(
            { _id: this.userId },
            {
                $push: {
                    "profile.purchases": {
                        coins: numCoins,
                        date: new Date(),
                        price: nPrice,
                        creditcard: cC
                    }
                }
            }
        );
    },
    "User.addCoinsToUser"(nUserId, e1) {
        Meteor.users.update(
            { _id: nUserId },
            {
                $inc: {
                    "profile.coins": e1
                }
            }
        );
    },
    "User.removeBetCoins"(aUserId, numCoins) {
        Meteor.users.update(
            { _id: aUserId },
            {
                $inc: {
                    "profile.inBet": -numCoins
                }
            }
        );
    },
    "User.removeNewBetCoins"(numCoins) {
        Meteor.users.update(
            { _id: this.userId },
            {
                $inc: {
                    "profile.coins": -numCoins,
                    "profile.inBet": numCoins
                }
            }
        );
    },
    "User.addTeamBet"(tName) {

        let exist = false;
        Meteor.user().profile.teams.map((t) => {
            if (t.name == tName) {
                exist = true;
            }
        });

        if (exist) {
            console.log("Exist: " + tName);

            Meteor.users.update(
                { _id: this.userId, "profile.teams.name": tName },
                {
                    $inc: {
                        "profile.teams.$.bets": 1
                    }
                }
            );
        } else {
            Meteor.users.update(
                { _id: this.userId },
                {
                    $push: {
                        "profile.teams": {
                            name: tName,
                            bets: 1,
                            wins: 0
                        }
                    }
                }
            );
        }
    }, "User.addWinTeam"(userId, tName) {

        let exist = false;

        Meteor.users.update(
            { _id: userId, "profile.teams.name": tName },
            {
                $inc: {
                    "profile.teams.$.wins": 1
                }
            }
        );
    }
});