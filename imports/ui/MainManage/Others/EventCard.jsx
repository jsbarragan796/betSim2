import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddBetModal from "../Modals/AddBetModal.jsx";
import "../../css/EventCard.css";

class EventCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colSize: "col-md-3"
        };
    }

    AddBet(b1, b2, bT, eR1, eR2, eRt) {
        let eInfo = this.props.eventInfo;
        //console.log("EventCard earnings: " + eR);

        this.props.AddBet(eInfo._id, eInfo.Prob1, eInfo.Prob2, eInfo.Tie, b1, b2, bT, eR1, eR2, eRt, eInfo.Team1, eInfo.Team2);
    }

    componentDidMount() {
        if (this.state.colSize) {
            window.addEventListener('resize', () => {
                let nColSize = "col"

                let width = window.innerWidth;
                //console.log("EventCard | Width: " + width);

                if (width >= 1500) {
                    nColSize = "col-md-3";
                } else if (width > 900 && width < 1500) {
                    nColSize = "col-md-4";
                } else {
                    nColSize = "col-md-6";
                }

                this.setState({ colSize: nColSize });
            }, false);
        }
    }

    getFee(percent) {
        let res = 100 / percent;

        return Math.round(res * 100) / 100;
    }

    GenerateEventPage(eId) {
        this.props.GenerateEventPage(eId);
    }

    render() {
        let eInfo = this.props.eventInfo;

        let modal = "";
        let fDate = <h5 className="card-title subTitle">{eInfo.Date}</h5>;
        let isOver = "";
        let showResult = "none";
        let team1RI = "danger";
        let team2RI = "danger";

        if (eInfo.State == "STARTED") {
            fDate = <h5 className="card-title txtLive">Now live!</h5>;
        } else if (eInfo.State == "FINISHED") {
            fDate = <h5 className="card-title txtFinished">The event is over!</h5>;
            isOver = " none"
            showResult = ""
        }

        if (eInfo.Team1R > eInfo.Team2R) {
            team1RI = "success";
        } else if (eInfo.Team1R < eInfo.Team2R) {
            team1RI = "success";
        } else {
            team1RI = "warning";
        }

        modal = <AddBetModal eventInfo={eInfo} fromW="eventCard" AddBet={(b1, b2, bT, eR1, eR2, eRt) => this.AddBet(b1, b2, bT, eR1, eR2, eRt)} />;

        return (
            <div id={eInfo.Name} className={this.state.colSize}>
                <div className="card myCard">
                    <img className="card-img-top" src={"img/" + eInfo.Image} alt="Card image cap" />
                    <div className="card-body">
                        <h4 className="card-title">{eInfo.Name}</h4>
                        <h5 className="card-title subTitle noBotMargin">{eInfo.Place}</h5>
                        {fDate}

                        <div className="btn-group myButtonGroup">
                            <span className="badge badge-primary myButtonGroup">{eInfo.Team1}</span>
                            <span className="badge badge-secondary myButtonGroup">Tie</span>
                            <span className="badge badge-primary myButtonGroup">{eInfo.Team2}</span>
                        </div>

                        <div className="btn-group myButtonGroup" role="group" aria-label="Basic example" style={{ display: isOver }}>
                            <button type="button" className="btn btn-primary myButtonOnGroup" data-toggle="modal" data-target={"#Add" + eInfo.Name + "eventCardBetModal"}>{"" + this.getFee(eInfo.Prob1)}</button>
                            <button type="button" className="btn btn-secondary myButtonOnGroup" data-toggle="modal" data-target={"#Add" + eInfo.Name + "eventCardBetModal"}>{"" + this.getFee(eInfo.Tie)}</button>
                            <button type="button" className="btn btn-primary myButtonOnGroup" data-toggle="modal" data-target={"#Add" + eInfo.Name + "eventCardBetModal"}>{"" + this.getFee(eInfo.Prob2)}</button>
                        </div>

                        <div  className="btn-group myButtonGroup" role="group" aria-label="Basic example" style={{ display: isOver }}>
                            <button type="button" className="btn btn-success myLargeButton" data-toggle="modal" data-target={"#Add" + eInfo.Name + "eventCardBetModal"}>Bet!</button>
                        </div>

                        <div className="btn-group myButtonGroup" style={{ display: showResult }}>
                            <span className={"badge myButtonGroup badge-" + team1RI}>{eInfo.Team1R}</span>
                            <span className={"badge myButtonGroup badge-" + team2RI}>{eInfo.Team2R}</span>
                        </div>

                        <hr className="my-4" />

                        <button onClick={() => this.GenerateEventPage(eInfo._id)} className="btn btn-outline-info myCardButton" type="submit">More info</button>
                    </div>
                </div>
                {modal}
            </div>
        );
    }
}

EventCard.propTypes = {
    eventInfo: PropTypes.object.isRequired
}

export default EventCard;