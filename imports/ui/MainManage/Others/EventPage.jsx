import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Chart from 'chart.js';

import "../../css/EventPage.css";

class EventPage extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            addingEvents: "none",
            updatingScores: "none",
            score1: 0,
            score2: 0,
            eventText: "",
            minute: 0,
            time: 0,
            per1: 0,
            per2: 0,
            perT: 0,
            myChart: null
        });

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.generateChart();
    }

    componentDidUpdate() {
        this.generateChart();
    }

    transparentize(color, opacity) {
        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return Color(color).alpha(alpha).rgbString();
    }

    generateChart() {
        let bInfo = this.props.betsInfo;
        let eInfo = this.props.eventInfo;

        $('#myChart').remove(); // this is my <canvas> element
        $('#ChartCointainer').append('<canvas id="myChart" className="betsChart"><canvas>');
        let canvas = document.querySelector('#myChart');
        var ctx = canvas.getContext('2d');

        eInfo = eInfo[0];

        let res = "Loading bar...";
        let numBets1 = eInfo.Bets1;
        let numBets2 = eInfo.Bets2;
        let numBetsT = eInfo.BetsT;

        let total = numBets1 + numBets2 + numBetsT;

        let per1 = (numBets1 * 100) / total;
        let per2 = (numBets2 * 100) / total;
        let perT = (numBetsT * 100) / total;

        per1 = Math.round(per1 * 100) / 100;
        per2 = Math.round(per2 * 100) / 100;
        perT = Math.round(perT * 100) / 100;

        /*if(this.state.myChart){
            this.state.myChart.destroy();
        }*/

        var chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [per1, perT, per2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(54, 162, 235, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    eInfo.Team1,
                    'Tie',
                    eInfo.Team2
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        /*this.setState({
            myChart: chart
        });*/
    }

    getWinner() {
        let eInfo = this.props.eventInfo;
        eInfo = eInfo[0];

        //console.log(eInfo);
        //console.log("Event result: " + eInfo.Team1R + " - " + eInfo.Team2R);

        if (eInfo.Team1R > eInfo.Team2R) {
            return eInfo.Team1;
        } else if (eInfo.Team1R < eInfo.Team2R) {
            return eInfo.Team2;
        } else {
            return "It's a Tie!"
        }
    }

    startEvent() {
        let eInfo = this.props.eventInfo;
        eInfo = eInfo[0];

        this.props.startEvent(eInfo._id);
    }

    endEvent(eID) {
        let eInfo = this.props.eventInfo;
        eInfo = eInfo[0];

        this.props.endEvent(eInfo._id);
    }

    loadBetsBar() {
        let eInfo = this.props.eventInfo;
        eInfo = eInfo[0];
        let bInfo = this.props.betsInfo;

        //console.log("Bets bar: " + per1 + "|" + perT + "|" + per2 + ":>" + total);
        if (total == 0) {
            return <h5>There are no bets yet!</h5>
        } else {
            //console.log("Printing bets bar");
            return (<div id="BetsBar">
                <div className="btn-group myButtonGroup">
                    <span className="badge badge-info myButtonGroup">{eInfo.Team1}</span>
                    <span className="badge badge-warning myButtonGroup">Tie</span>
                    <span className="badge badge-primary myButtonGroup">{eInfo.Team2}</span>
                </div>

                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow={per1} aria-valuemin="0" aria-valuemax="100" style={{ width: per1 + "%" }}>{per1 + "%"}</div>
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow={perT} aria-valuemin="0" aria-valuemax="100" style={{ width: perT + "%" }}>{perT + "%"}</div>
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={per2} aria-valuemin="0" aria-valuemax="100" style={{ width: per2 + "%" }}>{per2 + "%"}</div>
                </div>
            </div>);
        }
    }

    startUpdatingScore() {
        this.setState({
            updatingScores: " "
        });
    }

    endUpdatingScores() {
        let eInfo = this.props.eventInfo;
        eInfo = eInfo[0];

        let sc1 = parseInt(this.state.score1);
        let sc2 = parseInt(this.state.score2);

        Meteor.call("Events.updateScore", eInfo._id, sc1, sc2, (err, res) => {
            this.setState({
                updatingScores: "none"
            });

            //this.props.reRender(eInfo._id);
        });
    }

    startMatchEvent() {
        this.setState({
            addingEvents: " "
        });
    }

    cancelMatchEvent() {
        this.setState({
            addingEvents: "none"
        });
    }

    endMatchEvent() {
        let eInfo = this.props.eventInfo;
        eInfo = eInfo[0];

        let fText = this.state.eventText;
        let fMin = parseInt(this.state.minute);
        let fTime = parseInt(this.state.time);

        Meteor.call("Events.addMatchEvent", eInfo._id, fText, fMin, fTime, (err, res) => {
            this.setState({
                addingEvents: "none"
            });
        });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    generateListOfEvents() {
        let eInfo = this.props.eventInfo;
        eInfo = eInfo[0];
        //console.log("Generate list of evenst: ");
        //console.log(eInfo);

        let res = <li className="list-group-item">Loading Events...</li>;
        let count = 0;
        res = eInfo.Events.map((e) => (
            count++ ,
            <li key={"Event#" + count} className="list-group-item d-flex justify-content-between align-items-center">
                {e.text}
                <span className="badge badge-primary badge-pill">{"At " + e.minute + " minutes of the " + e.time + " set"}</span>
            </li>
        ));

        //console.log(res);
        return res;
    }

    GenerateBetsHistory(userT) {
        let eInfo = this.props.eventInfo;
        let bInfo = this.props.betsInfo;
        eInfo = eInfo[0];

        console.log(Meteor.user().profile.isAdmin);

        let count = 0;
        if(Meteor.user().profile.isAdmin){
        console.log("Imprimo ADMIN");
            return (
                bInfo.map((e) => (
                    count++ ,
                    <tr key={"Bet" + count}>
                        <th scope="row">{count}</th>
                        <td>{e.userName}</td>
                        <td>{e.Team1}</td>
                        <td>{e.Tie}</td>
                        <td>{e.Team2}</td>
                    </tr>
                )));
        }else{
            return (
                bInfo.map((e) => (
                    count++ ,
                    <tr key={"Bet" + count}>
                        <th scope="row">{count}</th>
                        <td>{e.Team1}</td>
                        <td>{e.Tie}</td>
                        <td>{e.Team2}</td>
                    </tr>
                )));
        }
    }

    render() {
        //console.log("Render");
        //console.log(Meteor.user());

        let bInfo = this.props.betsInfo;
        let eInfo = this.props.eventInfo;
        eInfo = eInfo[0];

        let state = "";
        let score = ""
        let winnerInfo = ""

        let eventState = "NOT_STARTED";        
        let mUserType = Meteor.user().profile.isAdmin ? "ADMIN" : "USER";

        if (eInfo) {
            eventState = eInfo.State;

            if (eInfo.State == "STARTED") {
                state = <h5 className="txtLive">Now Live!</h5>
                score = <h5 className="txtScore">{eInfo.Team1R + " - " + eInfo.Team2R}</h5>
            } else if (eInfo.State == "FINISHED") {
                state = <h5 className="txtLive">Event finished!</h5>
                score = <h5 className="txtScore">{eInfo.Team1R + " - " + eInfo.Team2R}</h5>
                winnerInfo = <h5 className="txtWinner">{this.getWinner() + " win!"}</h5>
            } else {
                state = <h5>Waiting for the event to start!</h5>
            }
        }

        let updatingScores = this.state.updatingScores;
        let addingEvents = this.state.addingEvents;

        return (
            <div id="EventModal" className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg myEventModal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{eInfo.Name + " info..."}</h5>

                            <div className="rightButtons">
                                {mUserType == "ADMIN" && eventState == "NOT_STARTED" ? <button onClick={() => this.startEvent()} type="button" className="btn btn-success myAdminButton">Start event</button> : ""}
                                {mUserType == "ADMIN" && eventState == "STARTED" ? <button onClick={() => this.endEvent()} type="button" className="btn btn-danger myAdminButton">End event</button> : ""}
                                {mUserType == "ADMIN" && eventState == "STARTED" ? <button onClick={() => this.startUpdatingScore()} type="button" className="btn btn-info">Update score</button> : ""}

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="container">
                                <div id="UpdateInputs" className="container" style={{ display: updatingScores }}>

                                    <div className="form-row bottomPadding">
                                        <div className="form-group col-md-6">
                                            <label>{eInfo.Team1 + " score:"}</label>
                                            <input type="number" min="0" step="1" className="form-control" id="score1" placeholder="" value={this.state.score1} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label>{eInfo.Team2 + " score:"}</label>
                                            <input type="number" min="0" step="1" className="form-control" id="score2" placeholder="" value={this.state.score2} onChange={this.handleChange} />
                                        </div>
                                    </div>

                                    <button onClick={() => this.endUpdatingScores()} type="button" className="btn btn-success">Update score!</button>

                                    <hr className="my-4" />
                                </div>

                                <div id="AddEventInputs" className="container" style={{ display: addingEvents }}>

                                    <div className="form-row bottomPadding">
                                        <div className="form-group col-md-6">
                                            <label>Minute of the event: </label>
                                            <input type="number" min="0" step="1" className="form-control" id="minute" placeholder="" value={this.state.minute} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label>Set/Quarter of the event:</label>
                                            <input type="number" min="0" step="1" className="form-control" id="time" placeholder="" value={this.state.time} onChange={this.handleChange} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="eventText">Event: </label>
                                        <textarea className="form-control" id="eventText" rows="3" value={this.state.eventText} onChange={this.handleChange} ></textarea>
                                    </div>

                                    <button onClick={() => this.endMatchEvent()} type="button" className="btn btn-success myAdminButton">Add match event</button>
                                    <button onClick={() => this.cancelMatchEvent()} type="button" className="btn btn-danger">Cancel</button>

                                    <hr className="my-4" />
                                </div>


                                <h5>Date: {eInfo.Date}</h5>
                                <div className="centeredDiv">
                                    {state}
                                    {score}
                                    {winnerInfo}

                                    <div id="ChartCointainer" className="doughnutChart">
                                        <canvas id="myChart" className="betsChart">

                                        </canvas>
                                    </div>

                                    <h5>Match events: </h5>

                                    <div className="container">

                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <a className="nav-link active show" data-toggle="tab" href="#MatchEvents">Match events</a>
                                            </li>

                                            {mUserType == "ADMIN" ?
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#UsersBets">Users Bets</a>
                                                </li>
                                                : ""}

                                            {mUserType == "USER" ?
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#Myhistory">My History</a>
                                                </li>
                                                : ""}
                                        </ul>

                                        <div className="tab-content">
                                            <div id="MatchEvents" className="tab-pane fade in active show">
                                                {this.generateListOfEvents()}
                                            </div>

                                            {mUserType == "ADMIN" ?
                                                <div id="UsersBets" className="tab-pane">
                                                    <table className="table table-sm table-hover table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">{eInfo.Team1}</th>
                                                                <th scope="col">Tie</th>
                                                                <th scope="col">{eInfo.Team2}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.GenerateBetsHistory("ADMIN")}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : ""}

                                            {mUserType == "USER" ?
                                                <div id="Myhistory" className="tab-pane">
                                                    <table className="table table-sm table-hover table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">{eInfo.Team1}</th>
                                                                <th scope="col">Tie</th>
                                                                <th scope="col">{eInfo.Team2}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.GenerateBetsHistory("USER")}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : ""}
                                        </div>

                                    </div>
                                </div>
                                <hr className="my-4" />
                                {mUserType == "ADMIN" && eventState == "STARTED" ? <button onClick={() => this.startMatchEvent()} type="button" className="btn btn-warning myAdminButton">Add match event</button> : ""}
                            </div>
                        </div>

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

EventPage.propTypes = {
    eventInfo: PropTypes.array.isRequired
};

export default withTracker(
    () => {
        Meteor.subscribe("Events");

        return {
        }
    }
)(EventPage);