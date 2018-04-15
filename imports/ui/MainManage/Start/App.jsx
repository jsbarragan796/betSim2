import React, { Component } from 'react';
import { withHistory } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";
import { isMoment } from "moment";

import AddCoinsModal from '../Modals/AddCoinsModal.jsx';
import MainPage from './MainPage.jsx';

import "../../css/App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            userData: {}
        });

        this.state = this.getMeteorData();
        this.logout = this.logout.bind(this);
        this.addCoins = this.addCoins.bind(this);
    }

    getMeteorData() {
        return { isAuthenticated: Meteor.userId() !== null };
    }

    componentWillMount() {
        if (!this.state.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    logout(e) {
        e.preventDefault();
        Meteor.logout((err) => {
            if (err) {
                console.log(err.reason);
            } else {
                this.props.history.push('/login');
            }
        });
    }

    addCoins(numCoins, nPrice, creditC){
        console.log("Adding coins from App | # coins: " + numCoins);
        let date = new Date();
        let x = moment().format("DD/MM/YYYY");
        let y = moment(date).format("DD/MM/YYYY");

        console.log("Date formated: " + date + " - " + x + " - " + y);

        Meteor.call("User.addCoins", numCoins, nPrice, creditC);
    }

    render() {

        return (
            <div id="App">
                { this.props.user ? <MainPage logout={this.logout} user={this.props.user} /> : <h1>Loading user data...</h1> }
                <AddCoinsModal addCoins={(numC, nPr, cC) => this.addCoins(numC, nPr, cC)}/>
            </div>
        );
    }
}
export default withTracker(
    () => {
        Meteor.subscribe('users');

        const currentUser = Meteor.user();

        return {
            user: currentUser
        }
    }
)(App);