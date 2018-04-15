import React, { Component } from 'react';

import "../../css/AddCoinsModal.css";

class AddCoinsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txtCardNumber: "",
            txtCode: 0,
            txtMonth: 0,
            txtYear: 0,
            numCoins: 0
        }

        this.addCoins = this.addCoins.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addCoins() {
        let coins = $('#coinsSelector')[0].options.selectedIndex;

        let finalNum = 0;
        let nPrice = 0;

        if (coins == 0) {
            finalNum = 100;
            nPrice = 10000;
        } else if (coins == 1) {
            finalNum = 510;
            nPrice = 50000;
        } else if (coins == 2) {
            finalNum = 1050;
            nPrice = 100000;
        }

        let creditCard =  this.state.txtCardNumber.substring(12, 16);

        this.props.addCoins(finalNum, nPrice, creditCard);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <div id="AddCoins" className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add more coins!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">

                            <div className="form-group">
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">Card # : </div>
                                    </div>
                                    <input type="text" className="form-control" id="txtCardNumber" placeholder="XXXX-XXXX-XXXX-XXXX" value={this.state.txtCardNumber} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-row bottomPadding">
                                <div className="form-group col-md-4">
                                    <label>Security code: </label>
                                    <input type="number" className="form-control" id="txtCode" placeholder="" value={this.state.txtCode} onChange={this.handleChange} />
                                </div>

                                <div className="form-group col-md-4">
                                    <label>Month</label>
                                    <input type="number" min="0" max="12" step="1" className="form-control" id="txtMonth" placeholder="" value={this.state.txtMonth} onChange={this.handleChange} />
                                </div>

                                <div className="form-group col-md-4">
                                    <label>Year</label>
                                    <input type="number" min="2018" step="1" className="form-control" id="txtYear" placeholder="" value={this.state.txtYear} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="coinsSelector">Select your coins package:</label>
                                <select className="form-control" id="coinsSelector">
                                    <option>100 / $10.000</option>
                                    <option>510 / $50.000</option>
                                    <option>1050 / $100.000</option>
                                </select>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.addCoins()}>Add coins!</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCoinsModal;