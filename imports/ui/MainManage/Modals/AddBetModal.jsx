import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "../../css/AddEventModal.css";

class AddBetModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bet1: 0,
            bet2: 0,
            betT: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    AddBet() {
        this.props.AddBet(parseFloat(this.state.bet1), parseFloat(this.state.bet2), parseFloat(this.state.betT), this.getEarnings(1), this.getEarnings(2), this.getEarnings("T"));
    }

    getFee(percent) {
        let res = 100 / percent;

        return Math.round(res * 100) / 100;
    }

    getEarnings(v) {
        let lEarnings = 0;

        let eInfo = this.props.eventInfo;

        if(v == 1){
            lEarnings += this.getFee(eInfo.Prob1) * this.state.bet1;
        }else if (v == 2){            
            lEarnings += this.getFee(eInfo.Prob2) * this.state.bet2;
        }else{            
            lEarnings += this.getFee(eInfo.Tie) * this.state.betT;
        }

        return Math.round(lEarnings * 100) / 100;
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        //console.log(this.props.eventInfo);
        return (
            <div id={"Add" + this.props.eventInfo.Name + this.props.fromW + "BetModal"} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add bet</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">

                            <div className="form-row bottomPadding">
                                <div className="form-group col-md-4">
                                    <label>{this.props.eventInfo.Team1 + " bet"}</label>
                                    <input type="number" min="0" step="0.01" className="form-control" id="bet1" placeholder="" value={this.state.bet1} onChange={this.handleChange} />
                                </div>

                                <div className="form-group col-md-4">
                                    <label>Tie bet</label>
                                    <input type="number" min="0" step="0.01" className="form-control" id="betT" placeholder="" value={this.state.betT} onChange={this.handleChange} />
                                </div>

                                <div className="form-group col-md-4">
                                    <label>{this.props.eventInfo.Team2 + " bet"}</label>
                                    <input type="number" min="0" step="0.01" className="form-control" id="bet2" placeholder="" value={this.state.bet2} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Earnings:</label>

                                <div className="form-row col-md-12">
                                    <div className="form-group col-md-4">
                                        <input className="form-control" type="text" placeholder={this.getEarnings(1) + ""} readOnly />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <input className="form-control" type="text" placeholder={this.getEarnings("T") + ""} readOnly />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <input className="form-control" type="text" placeholder={this.getEarnings(2) + ""} readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button onClick={() => this.AddBet()} type="button" className="btn btn-primary">Bet!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddBetModal.propTypes = {
    eventInfo: PropTypes.object.isRequired,
    fromW: PropTypes.string.isRequired
}

export default AddBetModal;