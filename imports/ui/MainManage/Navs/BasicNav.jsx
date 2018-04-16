import React, { Component } from 'react';

import "../../css/BasicNav.css";

class BasicNav extends Component {
    render() {
        let fCoins = this.props.coins;
        fCoins = Math.round(fCoins * 100) / 100;

        return (
            <div id="BasicNav" className="myNav">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark myNav">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
                        <img src="" width="30" height="30" className="d-inline-block align-top" alt="" />
                        Bet Simulator
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navContent">

                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a name="" className="nav-link">Welcome {this.props.userName}! <span className="sr-only">(current)</span></a>
                            </li>

                            <li className="nav-item">
                                <a id="coins-info" className="nav-link">Coins bag: {fCoins}</a>
                            </li>

                            <li className="nav-item">
                                <a id="coins-info" className="nav-link">In bet: {this.props.InBet}</a>
                            </li>

                            <li>
                                <button onClick={this.props.addcoins} className="btn btn-outline-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#AddCoins">Add coins</button>
                            </li>
                        </ul>

                        <a className="navbar-brand" href="#UserInfoPage">
                            <img src="img/user.svg" width="30" height="30" alt="User icon" />
                        </a>
                        <button onClick={this.props.logout} className="btn btn-outline-danger my-2 my-sm-0" type="submit">Log out</button>
                    </div>
                </nav>

            </div>
        );
    }
}

export default BasicNav;