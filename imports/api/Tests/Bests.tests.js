/* eslint-env mocha */
import { Meteor } from 'meteor/meteor';


import { assert } from 'chai';
import { resetDatabase } from "meteor/xolvio:cleaner";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Factory } from "meteor/dburles:factory";

import faker from "faker";

import { Bets } from "../Bets.js";

if (Meteor.isServer) {
    describe('Bets', () => {
        describe('Bets.addBet', () => {
            let currentUserName = faker.internet.userName();
            let currentUser;
            
            let cEventId = faker.internet.userName();
            let cProb1 = faker.random.number();
            let cProb2 = faker.random.number();
            let cProbT = faker.random.number();
            let cTeam1 = faker.random.number();
            let cTeam2 = faker.random.number();
            let cTie = faker.random.number();
            let cE1 = faker.random.number();
            let cE2 = faker.random.number();
            let cET = faker.random.number();
            let cSt = "OPEN";

            beforeEach(function () {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUser
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('should add bet', () => {
                
                Meteor.call("Bets.addBet", cEventId, cProb1, cProb2, cProbT, cTeam1, cTeam2, cTie, cE1, cE2, cET);
                
                let newBet = Bets.findOne({_id: currentUser._id});
                assert.isNotNull(newBet, "Bet added!");
            });
        });

        describe('Bets.closeBet', () => {

            let currentUserName = faker.internet.userName();
            let currentUser;

            
            let cEventId = faker.internet.userName();
            let cProb1 = faker.random.number();
            let cProb2 = faker.random.number();
            let cProbT = faker.random.number();
            let cTeam1 = faker.random.number();
            let cTeam2 = faker.random.number();
            let cTie = faker.random.number();
            let cE1 = faker.random.number();
            let cE2 = faker.random.number();
            let cET = faker.random.number();
            let cSt = "OPEN";

            beforeEach(function () {
                resetDatabase();
                Factory.define("user", Meteor.users, {
                    username: currentUser
                });

                currentUser = Factory.create("user");
                sinon.stub(Meteor, "user");
                Meteor.user.returns(currentUser);

                Bets.insert({
                    _id: "id1",
                    userId: currentUser._id,
                    userName: currentUserName,
                    eventId: cEventId,
                    Prob1: cProb1,
                    Prob2: cProb2,
                    ProbT: cProbT,
                    Team1: cTeam1,
                    Team2: cTeam2,
                    Tie: cTie,
                    E1: cE1,
                    E2: cE2,
                    ET: cET,
                    State: cSt
                });
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });
            
            it('should close bet', () => {                
                Meteor.call("Bets.closeBet", "id1");

                let newBet = Bets.findOne({_id: "id1"});

                if(newBet){
                    assert.equal(newBet.State, "CLOSED", "Bet closed!");
                }
            });
        });
    });
}
