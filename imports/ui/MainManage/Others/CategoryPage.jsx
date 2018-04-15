import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddEventModal from "../Modals/AddEventModal.jsx";
import EventCard from "./EventCard.jsx";
import "../../css/CategoryPage.css";

import ImageGallery from "./ImageGallery.jsx";

class CategoryPage extends Component {

    constructor(props){
        super(props);

        this.AddEvent = this.AddEvent.bind(this);
        this.loadEventsCards = this.loadEventsCards.bind(this);
    }

    AddEvent(name, place, date, image, team1, team2, prob1, prob2, tie) {
        if (Meteor.user().profile.isAdmin) {
            /*let txtTest = "";

            txtTest += (name + "\n");
            txtTest += (place + "\n");
            txtTest += (date + "\n");
            txtTest += (image + "\n");
            txtTest += (team1 + "\n");
            txtTest += (team2 + "\n");
            txtTest += (prob1 + "\n");
            txtTest += (prob2 + "\n");
            txtTest += (tie + "\n");
            alert("Adding the event on Category page: \n" + txtTest);*/

            Meteor.call("Events.addEvent", this.props.categoryInfo.name, name, place, date, image, team1, team2, prob1, prob2, tie, (err, res) => {
                if (err) {
                  alert(err);
                } else {
                  alert("Event created!");
                }
              });
        } else {
            alert("You do not have rights to do that!");
        }
    }

    loadEventsCards() {
        let actEvents = this.props.events;
        let res = "";

        //console.log(this.props.categoryInfo);

        res = actEvents.map(e => (
            //console.log("CategoryPage | loadEventsCards | Event: " + e),
            //console.log(e),
            <EventCard key={e.Name + "Card"} eventInfo={e} AddBet={(eI, p1, p2, pT, b1, b2, bT, eR1, eR2, eRt, t1N, t2N) => this.props.AddBet(eI, p1, p2, pT, b1, b2, bT, eR1, eR2, eRt, t1N, t2N)} GenerateEventPage={(eId) => this.props.GenerateEventPage(eId)}/>
        ));

        return res;
    }

    render() {
        return (
            <div id={this.props.categoryInfo.name} className="container category">

                {Meteor.user().profile.isAdmin ?
                    <div id="Admin Bar" className="row verticalCenteredParent">

                        <div className="col">
                            <h1>{this.props.categoryInfo.name}</h1>
                        </div>

                        <div className="col pullRight">
                            <button type="button" className="btn btn-danger pull-right" data-toggle="modal" data-target={"#Add" + this.props.categoryInfo.name + "EventModal"}>
                                Add Event
                            </button>
                        </div>

                        <AddEventModal AddCategoryEvent={(n, p, d, i, t1, t2, p1, p2, t) => this.AddEvent(n, p, d, i, t1, t2, p1, p2, t)} categoryInfo={this.props.categoryInfo} />
                    </div>

                    : <h1>{this.props.categoryInfo.name}</h1>}

                <hr className="my-4" />

                <div className="row">
                    {this.loadEventsCards()}
                </div>
            </div>
        );
    }
}

CategoryPage.propTypes = {
    categoryInfo: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired
}

export default CategoryPage;