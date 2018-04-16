import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "../../css/AddEventModal.css";

import ImageGallery from "../Others/ImageGallery.jsx";

class AddEventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            place: "",
            date: "",
            image: "Basketball_1.png",
            team1: "",
            team2: "",
            prob1: 0.0,
            prob2: 0.0,
            tie: 0.0
        };

        this.handleChange = this.handleChange.bind(this);
        this.AddEvent = this.AddEvent.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    AddEvent(e) {
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();

        let actCarouselImage = "Basic_Event.png";
        let currentIndex = $('div.active').index();

        let indicator = document.getElementById(this.props.categoryInfo.name + "EventImageCarousel").getElementsByClassName("active");

        console.log(indicator[0]);
        console.log(indicator[0].attributes);
        console.log(indicator[0].attributes.name.value);

        actCarouselImage = indicator[0].attributes.name.value;

        /*let txtTest = "";
 
         txtTest += (this.state.name + "\n");
         txtTest += (this.state.place + "\n");
         txtTest += (this.state.date + "\n");
         txtTest += (actCarouselImage + "\n");
         txtTest += (this.state.team1 + "\n");
         txtTest += (this.state.team2 + "\n");
         txtTest += (this.state.prob1 + "\n");
         txtTest += (this.state.prob2 + "\n");
         txtTest += (this.state.tie + "\n");
 
         alert("Adding the event on the modal: \n" + txtTest);*/
        if(this.state.name == "" || this.state.place == "" ||this.state.date == "" ||this.state.team1 == "" ||this.state.team2 == "" ||this.state.prob1 == "" ||this.state.prob2 == "" ||this.state.tie == ""){
            $('#emptyField').fadeIn();
        }else if ( (parseFloat(this.state.prob1) + parseFloat(this.state.prob2) + parseFloat(this.state.tie)) > 100) {
            $('#emptyField').fadeOut();
            $('#probabilitiesHigerThan100').fadeIn();
            //alert("The sum of all probabilities cannot be greater than 100.");
        } else {      
            $('#probabilitiesHigerThan100').fadeOut();
            $('#emptyField').fadeOut();

            this.props.AddCategoryEvent(this.state.name,
                this.state.place,
                this.state.date,
                actCarouselImage,
                this.state.team1,
                this.state.team2,
                this.state.prob1,
                this.state.prob2,
                this.state.tie);
                
                this.clearModal();
        }
    }

    clearModal(){
        $('#probabilitiesHigerThan100').fadeOut();
        $('#emptyField').fadeOut();

        this.setState({
            name: '',
            place: "",
            date: "",
            image: "Basketball_1.png",
            team1: "",
            team2: "",
            prob1: 0.0,
            prob2: 0.0,
            tie: 0.0
        });
    }

    render() {
        /*let txtTest = "";

        txtTest += (this.state.name + "\n");
        txtTest += (this.state.place + "\n");
        txtTest += (this.state.date + "\n");
        txtTest += (this.state.team1 + "\n");
        txtTest += (this.state.team2 + "\n");
        txtTest += (this.state.prob1 + "\n");
        txtTest += (this.state.prob2 + "\n");
        txtTest += (this.state.tie + "\n");

        console.log(txtTest);*/

        return (
            <div id={"Add" + this.props.categoryInfo.name + "EventModal"} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add {this.props.categoryInfo.name} Event</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div id="probabilitiesHigerThan100" className="alert alert-danger in" role="alert" style={ {display: "none"} }>
                                The sum of all probabilities cannot be greater than 100!
                            </div>
                            
                            <div id="emptyField" className="alert alert-warning in" role="alert" style={ {display: "none"} }>
                                All fields need to be full!
                            </div>

                            <div className="form-group">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Name: </div>
                                    </div>
                                    <input type="text" className="form-control" id="name" placeholder="Event name..." value={this.state.name} onChange={this.handleChange} />
                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Place: </div>
                                    </div>
                                    <input type="text" className="form-control" id="place" placeholder="Event place..." value={this.state.place} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Date: </div>
                                    </div>
                                    <input type="text" className="form-control" id="date" placeholder="dd/mm/aaaa" value={this.state.date} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Team 1</label>
                                    <input type="text" className="form-control" id="team1" placeholder="Team 1 Name..." value={this.state.team1} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Team 2</label>
                                    <input type="text" className="form-control" id="team2" placeholder="Team 2 Name..." value={this.state.team2} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Probabilities...</label>

                                    <div className="form-row">
                                        <div className="input-group col-md-4">
                                            <input type="number" min="0" step="0.01" className="form-control" id="prob1" placeholder="Team 1..." value={this.state.prob1} onChange={this.handleChange} />
                                        </div>

                                        <div className="input-group col-md-4">
                                            <input type="number" min="0" step="0.01" className="form-control" id="tie" placeholder="Tie..." value={this.state.tie} onChange={this.handleChange} />
                                        </div>

                                        <div className="input-group col-md-4">
                                            <input type="number" min="0" step="0.01" className="form-control" id="prob2" placeholder="Team 2..." value={this.state.prob2} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ImageGallery categoryInfo={this.props.categoryInfo} />

                            <div className="modal-footer">
                                <button onClick={() => this.clearModal()} type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button onClick={() => this.AddEvent()} type="button" className="btn btn-danger">Save event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddEventModal.propTypes = {
    categoryInfo: PropTypes.object.isRequired
}

export default AddEventModal;