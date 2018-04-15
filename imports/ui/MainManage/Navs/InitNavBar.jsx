import React, { Component } from 'react';

import "../../css/InitNavBar.css";

class InitNavBar extends Component {
    render() {
        return (
            <div id="InitNavBar" className="myNav">
                <div className="navbar navbar-expand-lg bg-dark box-shadow myNav">
                    <h5 className="my-0 mr-md-auto font-weight-normal">Bet Simulator</h5>

                    <button className="btn btn-outline-primary" onClick={()=> this.props.Login()} data-toggle="modal" data-target="#LogModal">Log in</button>
                </div>
            </div>
        );
    }
}

export default InitNavBar;