import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from "meteor/react-meteor-data";

import { Events } from "../../../api/Events";

import "../../css/UserInfo.css";

class UserInfo extends Component {

    LoadTeamsStatistics() {
        let teamsInfo = Meteor.user().profile.teams;

        let res = [];
        let winM = 0;
        let count = 0;
        if (teamsInfo) {

            teamsInfo.map((t) => (
                count++ ,
                winM = (t.wins * 100) / t.bets,
                winM = Math.round(winM * 100) / 100,
                res.push(
                    <tr key={"Teams" + count}>
                        <th scope="row">{count}</th>
                        <th scope="col">{t.name}</th>
                        <th scope="col">{t.bets}</th>
                        <th scope="col">{t.wins}</th>
                        <th scope="col">{winM + "%"}</th>
                    </tr>
                )
            ));
        }

        return res;
    }

    LoadBasicInformation() {
        let profile = Meteor.user().profile;
        let bInfo = this.props.betsInfo;
        let fCoins = profile.coins;
        fCoins = Math.round(fCoins * 100) / 100;

        let favoriteTeam = "";
        let maxTeamBets = 0;

        profile.teams.map((t) => {
            if (t.bets > maxTeamBets) {
                maxTeamBets = t.bets;
                favoriteTeam = t.name;
            }
        });

        return (
            <div className="container">
                <div className="row myRow">
                    <div className="col">
                        <h5 className="bodyText">Username: </h5>
                    </div>
                    <div className="col">
                        <h5 className="bodyText infoText">{Meteor.user().username}</h5>
                    </div>
                </div>
                
                <hr className="my-2" />

                <div className="row myRow">
                    <div className="col">
                        <h5 className="bodyText">Contact e-mail: </h5>
                    </div>
                    <div className="col">
                        <h5 className="bodyText infoText">{Meteor.user().emails[0].address}</h5>
                    </div>
                </div>
                
                <hr className="my-2" />

                <div className="row">
                    <div className="col">
                        <h5 className="bodyText">Coins on bag: </h5>
                    </div>
                    <div className="col">
                        <h5 className="bodyText infoText">{fCoins}</h5>
                    </div>
                </div>
                
                <hr className="my-2" />


                <div className="row">
                    <div className="col">
                        <h5 className="bodyText">Coins in bet: </h5>
                    </div>
                    <div className="col">
                        <h5 className="bodyText infoText">{profile.inBet}</h5>
                    </div>
                </div>
                
                <hr className="my-2" />

                <div className="row">
                    <div className="col">
                        <h5 className="bodyText">Favorite team: </h5>
                    </div>
                    <div className="col">
                        <h5 className="bodyText infoText">{favoriteTeam}</h5>
                    </div>
                </div>
            </div>
        );
    }

    LoadBetsHistoric() {
        let bInfo = this.props.betsInfo;
        let count = 0;
        let res = [];

        let myEvents = this.props.events;
        let actEvent = null;
        let lastEventW = null;

        let result = <th scope="col" className="lose">Unfinished</th>;

        if (bInfo && myEvents) {
            bInfo.map((e) => (
                count++ ,
                myEvents.map((ev) => {
                    if (ev._id == e.eventId) {
                        actEvent = ev;

                        if (ev.Team1R > ev.Team2R) {
                            lastEventW = ev.Team1;
                            if (e.Team1 > 0) {
                                result = <th scope="col" className="winner">Winner</th>;
                            } else {
                                result = <th scope="col" className="lose">Lose</th>;
                            }
                        } else if (ev.Team1R < ev.Team2R) {
                            lastEventW = ev.Team2;
                            if (e.Team2 > 0) {
                                result = <th scope="col" className="winner">Winner</th>;
                            } else {
                                result = <th scope="col" className="lose">Lose</th>;
                            }
                        } else {
                            lastEventW = "Tie";
                            if (e.Tie > 0) {
                                result = <th scope="col" className="winner">Winner</th>;
                            } else {
                                result = <th scope="col" className="lose">Lose</th>;
                            }
                        }

                        if(e.State == "OPEN"){
                            result = <th scope="col" className="unfinished">Unfinished</th>;
                        }
                    }
                }),
                console.log(actEvent),
                res.push(
                    <tr key={"Bet" + count}>
                        <th scope="row">{count}</th>
                        <th scope="col">{actEvent.Name}</th>
                        <th scope="col">{e.Team1}</th>
                        <th scope="col">{e.Tie}</th>
                        <th scope="col">{e.Team2}</th>
                        <th scope="col">{e.State}</th>
                        <th scope="col">{lastEventW}</th>
                        {result}
                    </tr>
                )
            ));

            return res;

        } else {
            return <h3>There are no bets information...</h3>
        }
    }

    LoadPurchasesHistoric() {
        let purchases = Meteor.user().profile.purchases;
        let res = [];
        let dX = "";

        if (purchases) {
            let count = 0;
            purchases.map((p) => (
                count++ ,
                dX = moment(p.date).format("DD/MM/YYYY"),
                res.push(
                    <tr key={"Purchase" + count}>
                        <th scope="row">{count}</th>
                        <th scope="col">{p.coins}</th>
                        <th scope="col">{"**** **** **** " + p.creditcard}</th>
                        <th scope="col">{"$" + p.price + " COP"}</th>
                        <th scope="col">{dX}</th>
                    </tr>
                )
            ));
        }

        return res;
    }

    render() {
        return (
            <div id="UserInfoPage" className="myInfo">

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active show" data-toggle="tab" href="#BasicInfo">Basic Information</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#BetsHistoric">Bets historic</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#PurchasesHistoric">Purchases historic</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#TeamsStatistics">Teams Statistics</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="BasicInfo" className="tab-pane fade in active show">
                        {this.LoadBasicInformation()}
                    </div>

                    <div id="BetsHistoric" className="tab-pane">
                        <table className="table table-sm table-hover table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">EventName</th>
                                    <th scope="col">Team 1 bet</th>
                                    <th scope="col">Tie bet</th>
                                    <th scope="col">Team 2 bet</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Winner</th>
                                    <th scope="col">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.events ? this.LoadBetsHistoric() : <h4>Loading events data...</h4>}
                            </tbody>
                        </table>
                    </div>
                    <div id="PurchasesHistoric" className="tab-pane">
                        <table className="table table-sm table-hover table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">CreditCard</th>
                                    <th scope="col">Cost</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.LoadPurchasesHistoric()}
                            </tbody>
                        </table>
                    </div>

                    <div id="TeamsStatistics" className="tab-pane">
                        <table className="table table-sm table-hover table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Bets</th>
                                    <th scope="col">wins</th>
                                    <th scope="col">Wins ratio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.LoadTeamsStatistics()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

UserInfo.propTypes = {
    betsInfo: PropTypes.array.isRequired
}

export default withTracker(
    () => {
        Meteor.subscribe("Events");

        return {
            events: Events.find({}).fetch()
        }
    }
)(UserInfo);