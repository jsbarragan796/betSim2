import React, { Component } from 'react';
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from "meteor/react-meteor-data";

import BasicNav from "../Navs/BasicNav.jsx";
import CategoryPage from "../Others/CategoryPage.jsx";
import EventPage from "../Others/EventPage.jsx";
import MyBets from "../Others/MyBets.jsx";
import UserInfo from "../Others/UserInfo.jsx";

import { Bets } from "../../../api/Bets";
import { Categories } from "../../../api/Categories";
import { Events } from "../../../api/Events";

import "../../css/MainPage.css";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "",
            username: '',
            actEventPage: "",
            betsToPay: [],
            lastEndedEvent: {},
            lastEventInfo: {},
            lasEventInfoId: null
        };

        this.AddBet = this.AddBet.bind(this);
        this.startEvent = this.startEvent.bind(this);
        this.endEvent = this.endEvent.bind(this);
        this.generateEventPage = this.generateEventPage.bind(this);
        this.loadCategoryPages = this.loadCategoryPages.bind(this);
    }

    componentDidMount(){
        $('#Football').focus();
    }

    startEvent(eId) {
        //console.log("Starting event | id: " + eId)

        Meteor.call("Events.startEvent", eId,
            () => {
                this.setState({
                    actEventPage: <EventPage betsInfo={Bets.find({ eventId: eId }).fetch()} eventInfo={Events.find({ _id: eId }).fetch()} startEvent={(eID) => this.startEvent(eId)} endEvent={(eId) => this.endEvent(eId)} />
                });
            });
    }

    endEvent(eId) {
        //console.log("Ending event | id: " + eId);

        Meteor.call("Events.endEvent", eId, Bets.find({ eventId: eId }).fetch(),
            () => {
                this.setState({
                    actEventPage: <EventPage betsInfo={Bets.find({ eventId: eId }).fetch()} eventInfo={Events.find({ _id: eId }).fetch()} startEvent={(eID) => this.startEvent(eId)} endEvent={(eId) => this.endEvent(eId)} />,
                    betsToPay: Bets.find({ eventId: eId }).fetch(),
                    lastEndedEvent: Events.find({ _id: eId }).fetch()
                }, () => {
                    this.payWinners(eId);
                })
            });

    }

    payWinners(eId) {
        //console.log("PayWinners");
        //console.log(this.state.betsToPay);
        let eInfo = this.state.lastEndedEvent;
        eInfo = eInfo[0];

        //console.log("Last ended even: ");     
        //console.log(eInfo);

        let winner = "NA";
        let winName = null;

        if (eInfo.Team1R > eInfo.Team2R) {
            winner = 1;
            winName = eInfo.Team1;
        } else if (eInfo.Team1R < eInfo.Team2R) {
            winner = 2;
            winName = eInfo.Team1;
        } else {
            winner = 0;
            winName = null;
        }

        let bets = this.state.betsToPay;

        bets.forEach((e) => {
            let e1 = e.E1;
            let e2 = e.E2;
            let eT = e.ET;

            Meteor.call("Bets.closeBet", e._id, e1, e2, eT, winner);


            if (winName != null) {
                Meteor.call("User.addWinTeam", e.userId, winName);
            }

            let earning = 0;
            let numCoins = e.Team1 + e.Team2 + e.Tie;

            Meteor.call("User.removeBetCoins", e.userId, numCoins);

            if (e1 > 0 && winner == 1) {
                earning = e1;
            } else if (e2 > 0 && winner == 2) {
                earning = e2;
            } else if (eT > 0 && winner == 0) {
                earning = eT;
            }

            let newCoins = earning;
            console.log("Winner is: " + winner + "New coins: " + newCoins);

            Meteor.call("User.addCoinsToUser", e.userId, earning);
        });
    }

    generateEventPage(eId) {
        this.setState({
            lasEventInfoId: eId
        },
            () => {
                $('#EventModal').modal('show')
            }
        );
    }

    AddBet(eventId, prob1, prob2, probT, bet1, bet2, betT, eR1, eR2, eRt, team1Name, team2Name) {
        //console.log("MainPage | AddBet: " + eventId + " - " + prob1 + " - " + prob2 + " - " + probT + " - " + bet1 + " - " + bet2 + " - " + betT + " - " + eR1 + " - " + eR2 + " - " + eRt);
        //alert("MainPage | Adding bet : " + bet1 + "|" + betT + "|" + bet2 + " | Earnings: " + eR);
        let totalCoins = parseFloat(bet1 + bet2 + betT);
        Meteor.call("Bets.addBet", eventId, prob1, prob2, probT, bet1, bet2, betT, eR1, eR2, eRt, (err, res) => {
            if (err) {
                alert(err);
            } else {
                alert("Bet created!");
                Meteor.call("User.removeNewBetCoins", totalCoins);
            }
        });

        Meteor.call("Events.addBet", eventId, bet1, bet2, betT, (err, res) => {
            if (err) {
                alert(err);
            } else {
                console.log("Event bets created!");
            }
        });

        console.log(team1Name + " Vs " + team2Name);
        if (bet1 > 0) {
            Meteor.call("User.addTeamBet", team1Name, (err, res) => {
                if (err) {
                    alert(err);
                } else {

                }
            });
        }

        if (bet2 > 0) {
            Meteor.call("User.addTeamBet", team2Name, (err, res) => {
                if (err) {
                    alert(err);
                } else {

                }
            });
        }
    }

    loadCategoriesList() {
        let actCategories = this.props.categories;
        let res = [];

        res.push(
            <li key="MyBetsOption" className="nav-item">
                <a href={"#MyBets"} className="nav-link" >
                    My Bets...
                </a>
            </li>
        );

        res.push(actCategories.map(e => (
            <li key={e.name} className="nav-item">
                <a href={"#" + e.name} className="nav-link" >
                    {e.name}
                </a>
            </li>
        )));

        return res;
    }

    loadCategoryPages() {
        let actCategories = this.props.categories;
        let res = [];

        //console.log(this.props.userData);        
        //console.log(this.props.userBets);
        res.push(<UserInfo key="MyInfoPage" betsInfo={this.props.userBets} />);
        res.push(<MyBets key="MyBetsPage" myBets={this.props.userBets} AddBet={(eI, p1, p2, pT, b1, b2, bT, eR1, eR2, eRt, t1N, t2N) => this.AddBet(eI, p1, p2, pT, b1, b2, bT, eR1, eR2, eRt, t1N, t2N)} GenerateEventPage={(eId) => this.generateEventPage(eId)} />);

        res.push(actCategories.map(e => (
            <CategoryPage key={e.name + "Page"} categoryInfo={e} events={Events.find({ Category: e.name }).fetch()} AddBet={(eI, p1, p2, pT, b1, b2, bT, eR1, eR2, eRt, t1N, t2N) => this.AddBet(eI, p1, p2, pT, b1, b2, bT, eR1, eR2, eRt, t1N, t2N)} GenerateEventPage={(eId) => this.generateEventPage(eId)} />
        )));

        return res;
    }

    render() {
        let currentUser = this.props.user;
        let currentUserAvailable = (currentUser !== undefined);

        let loggedIn = (currentUser && currentUserAvailable);

        let numCoins = 0;
        let inBetCoins = 0;
        let mUserType = "USER";

        if (loggedIn) {
            /*console.log("Render | loggedIn | AllData: ");
            console.log(currentUser);*/

            numCoins = currentUser.profile.coins;
            inBetCoins = currentUser.profile.inBet;

            let actCategories = this.props.categories;

            if (actCategories != null && actCategories != undefined && actCategories.length > 0) {
                //console.log(actCategories);
            }

            mUserType = currentUser.profile.isAdmin ? "ADMIN" : "USER";
        }

        let eId = this.state.lasEventInfoId;
        let actEventElement = eId ? <EventPage betsInfo={Bets.find({ eventId: eId }).fetch()} eventInfo={Events.find({ _id: eId }).fetch()} userType={mUserType} startEvent={(eID) => this.startEvent(eId)} endEvent={(eId) => this.endEvent(eId)} /> : "";

        return (
            <div id="MainPage">
                {loggedIn ? <BasicNav logout={this.props.logout} userName={currentUser.username} coins={numCoins} InBet={inBetCoins} /> : "Error"}

                <div className="container-fluid">
                    <div className="row">

                        <nav id="SideBar" className="col-md-2 bg-light sidebar">
                            <div className="sidebar-sticky">
                                <ul className="nav flex-column">
                                    {this.loadCategoriesList()}
                                </ul>
                            </div>
                        </nav>

                        <main role="main" className="col-md-10 categoryPageContainer">
                            <div id="MainPage" className="container mainPage" autoFocus>
                                <h1>Alo?</h1>
                            </div>

                            {this.loadCategoryPages()}
                            {actEventElement}
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    user: PropTypes.object.isRequired
}

export default withTracker(
    () => {
        Meteor.subscribe("Bets");
        Meteor.subscribe("Categories");
        Meteor.subscribe("Events");

        return {
            categories: Categories.find({}, { sort: { name: 1 } }).fetch(),
            events: Events.find({}).fetch(),
            userBets: Bets.find({
                userId: Meteor.userId()
            }, {
                    fields: Bets.publicFields,
                    sort: { eventId: 1 }
                }).fetch()
        }
    }
)(MainPage);