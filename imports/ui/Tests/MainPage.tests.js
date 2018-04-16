import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { assert } from 'chai';
import { resetDatabase } from "meteor/xolvio:cleaner";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Factory } from "meteor/dburles:factory";
import { chai } from "meteor/practicalmeteor:chai";

import faker from "faker";

import { shallow } from "enzyme";

if (Meteor.isClient) {

    import MainPage from '../MainManage/Start/MainPage.jsx';
    describe("MainPage", () => {
        describe("MainPage Full Render", () => {
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

                return import('../MainManage/Start/MainPage.jsx').then((component) => {
                    MyComponent = component
                })
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            describe("NavBars rendering", () => {
                it("Top NavBar page should render", () => {
                    const c = shallow(<MainPage logout={"logout()"} user={currentUser} />);
                    chai.assert.isNotNull(c.find("BasicNav"), "Top NavBar loaded!");
                });

                it("SideBar page should render", () => {
                    const c = shallow(<MainPage logout={"logout()"} user={currentUser} />);
                    chai.assert.isNotNull(c.find("SideBar"), "Side bar loaded!");
                });
            });

            describe("Categories rendering", () => {
                it("MainPage should render", () => {
                    const c = shallow(<MainPage logout={"logout()"} user={currentUser} />);
                    chai.assert.isNotNull(c.find("MainPage"), "Main page loaded!");
                });

                it("UserInfo page should render", () => {
                    const c = shallow(<MainPage logout={"logout()"} user={currentUser} />);
                    chai.assert.isNotNull(c.find("UserInfoPage"), "Main page loaded!");
                });

                it("MyBets page should render", () => {
                    const c = shallow(<MainPage logout={"logout()"} user={currentUser} />);
                    chai.assert.isNotNull(c.find("MyBets"), "Main page loaded!");
                });

                it("Basketball page should render", () => {
                    const c = shallow(<MainPage logout={"logout()"} user={currentUser} />);
                    chai.assert.isNotNull(c.find("Basketball"), "Main page loaded!");
                });
            });

            describe("Modals rendering", () => {
                it("AddCoins modal should render", () => {
                    const c = shallow(<MainPage logout={"logout()"} user={currentUser} />);
                    chai.assert.isNotNull(c.find("AddCoins"), "AddCoins modal loaded!");
                });
            });
        });
    });
}