import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { assert } from 'chai';
import { resetDatabase } from "meteor/xolvio:cleaner";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Factory } from "meteor/dburles:factory";

import faker from "faker";

import { Users } from "../Users.js";

if (Meteor.isServer) {
    describe("Users", () => {
        describe('User.addCoins', () => {
            let currentUserName = faker.internet.userName();
            let email = faker.internet.email();
            let password = faker.internet.password();
            let profile = {
                coins: 0.0,
                isAdmin: false,
                inBet: 0.0,
                purchases: [],
                teams: []
            };
            let currentUser;

            let numCoins = faker.random.number();
            let numPrice = faker.random.number();
            let creditCard = faker.random.number();

            beforeEach(() => {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUserName,
                    email: email,
                    password: password,
                    profile: profile
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('should add coins to the current user!', () => {
                Meteor.call("User.addCoins", numCoins, numPrice, creditCard);
                //console.log("USER TEST | AddCoins | UserId: " + currentUser._id);

                let aUserProf = Meteor.users.findOne({ _id: currentUser._id });
                aUserProf = aUserProf.profile;

                assert.equal(aUserProf.coins, numCoins, "Coins added!");
                assert.equal(aUserProf.purchases.length, 1, "Purchase saved!");
            });
        });

        describe('User.addCoinsToUser', () => {
            let currentUserName = faker.internet.userName();
            let email = faker.internet.email();
            let password = faker.internet.password();
            let profile = {
                coins: 1000.0,
                isAdmin: false,
                inBet: 0.0,
                purchases: [],
                teams: []
            };
            let currentUser;

            let numCoins = faker.random.number();

            beforeEach(() => {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUserName,
                    email: email,
                    password: password,
                    profile: profile
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('should add coins to a specific user!', () => {
                Meteor.call("User.addCoinsToUser", currentUser._id, numCoins);

                let aUserProf = Meteor.users.findOne({ _id: currentUser._id });
                aUserProf = aUserProf.profile;

                assert.equal(aUserProf.coins, (1000 + numCoins), "Coins added!");
            });
        });

        describe('User.removeBetCoins', () => {
            let currentUserName = faker.internet.userName();
            let email = faker.internet.email();
            let password = faker.internet.password();
            let profile = {
                coins: 1000.0,
                isAdmin: false,
                inBet: 10000.0,
                purchases: [],
                teams: []
            };
            let currentUser;

            let numCoins = faker.random.number();

            beforeEach(() => {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUserName,
                    email: email,
                    password: password,
                    profile: profile
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('should remove the coins bet!', () => {
                Meteor.call("User.removeBetCoins", currentUser._id, numCoins);

                let aUserProf = Meteor.users.findOne({ _id: currentUser._id });
                aUserProf = aUserProf.profile;

                assert.equal(aUserProf.inBet, (10000 - numCoins), "Coins removed!");
            });
        });

        describe('User.removeNewBetCoins', () => {
            let currentUserName = faker.internet.userName();
            let email = faker.internet.email();
            let password = faker.internet.password();
            let profile = {
                coins: 1000.0,
                isAdmin: false,
                inBet: 10000.0,
                purchases: [],
                teams: []
            };
            let currentUser;

            let numCoins = faker.random.number();

            beforeEach(() => {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUserName,
                    email: email,
                    password: password,
                    profile: profile
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('should remove coins from bag and add them to InBet pool!', () => {
                Meteor.call("User.removeNewBetCoins", numCoins);

                let aUserProf = Meteor.users.findOne({ _id: currentUser._id });
                aUserProf = aUserProf.profile;

                assert.equal(aUserProf.coins, (1000 - numCoins), "Coins transfered!");
                assert.equal(aUserProf.inBet, (10000 + numCoins), "Coins transfered!");
            });
        });

        describe('User.addTeamBet', () => {
            let currentUserName = faker.internet.userName();
            let email = faker.internet.email();
            let password = faker.internet.password();
            let profile = {
                coins: 1000.0,
                isAdmin: false,
                inBet: 10000.0,
                purchases: [],
                teams: []
            };
            let currentUser;

            let teamName = faker.name.findName();

            beforeEach(() => {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUserName,
                    email: email,
                    password: password,
                    profile: profile
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('should add a bet to teams!', () => {
                Meteor.call("User.addTeamBet", teamName);

                let aUserProf = Meteor.users.findOne({ _id: currentUser._id });
                aUserProf = aUserProf.profile.teams;

                assert.equal(aUserProf.length, 1, "Team added because of its non-existence!");
                assert.equal(aUserProf[0].bets, 1, "Bet added to team!");
            });
        });

        describe('User.addWinTeam', () => {
            let currentUserName = faker.internet.userName();
            let email = faker.internet.email();
            let password = faker.internet.password();
            let profile = {
                coins: 1000.0,
                isAdmin: false,
                inBet: 10000.0,
                purchases: [],
                teams: []
            };
            let currentUser;

            let teamName = faker.name.findName();

            beforeEach(() => {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUserName,
                    email: email,
                    password: password,
                    profile: profile
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('should add a win to a personale team!', () => {
                Meteor.call("User.addTeamBet", teamName);
                Meteor.call("User.addWinTeam", currentUser._id, teamName);

                let aUserProf = Meteor.users.findOne({ _id: currentUser._id });
                aUserProf = aUserProf.profile.teams;

                assert.equal(aUserProf.length, 1, "Team added because of its non-existence!");
                assert.equal(aUserProf[0].wins, 1, "Win added to team!");
            });
        });
    });
}