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

    const addCoinsRule = {
        type: 'method',
        name: 'User.addCoins'
    };

    const addCoinsToUserRule = {
        type: 'method',
        name: 'User.addCoinsToUser'
    };

    const removeBetCoinsRule = {
        type: 'method',
        name: 'User.removeBetCoins'
    };

    const removeNewBetCoinsRule = {
        type: 'method',
        name: 'User.removeNewBetCoins'
    };

    const addTeamBetRule = {
        type: 'method',
        name: 'User.addTeamBet'
    };

    const addWinTeamRule = {
        type: 'method',
        name: 'User.addWinTeam'
    };

    DDPRateLimiter.addRule(addCoinsRule, 5, 1000);
    DDPRateLimiter.addRule(addCoinsToUserRule, 5, 1000);
    DDPRateLimiter.addRule(removeBetCoinsRule, 5, 1000);
    DDPRateLimiter.addRule(removeNewBetCoinsRule, 5, 1000);
    DDPRateLimiter.addRule(addTeamBetRule, 5, 1000);
    DDPRateLimiter.addRule(addWinTeamRule, 5, 1000);
}

Meteor.methods({
    "User.addCoins"(numCoins, nPrice, cC) {
        let date = new Date();

        console.log("Adding coins : " + numCoins + " | " + nPrice);

        //console.log(this.userId + " | " + Meteor.user()._id);
        Meteor.users.update(
            { _id: Meteor.user()._id },
            {
                $inc: {
                    "profile.coins": numCoins
                }
            }
        );

        Meteor.users.update(
            { _id: Meteor.user()._id },
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
            { _id: Meteor.user()._id },
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
                { _id: Meteor.user()._id, "profile.teams.name": tName },
                {
                    $inc: {
                        "profile.teams.$.bets": 1
                    }
                }
            );
        } else {
            console.log("Not exist: " + tName);
            Meteor.users.update(
                { _id: Meteor.user()._id },
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