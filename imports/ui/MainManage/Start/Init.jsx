import React, { Component } from 'react';

import InitNavBar from "../Navs/InitNavBar.jsx";
import "../../css/Init.css";

// Pages
import Login from '../../Accounts/Login.jsx'
import Signup from '../../Accounts/Signup.jsx'

class Init extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalStatus: "LOGIN"
        }

        this.Login = this.Login.bind(this);
        this.Signup = this.Signup.bind(this);
        this.LogedIn = this.LogedIn.bind(this);
    }

    Login() {
        //alert("Log in");
        this.setState({
            modalStatus: "LOGIN"
        });
    }

    Signup() {
        //alert("Sign up");
        this.setState({
            modalStatus: "SIGNUP"
        });
    }

    LogedIn() {
        $('#LogModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        this.props.history.push('/App');
    }

    render() {
        return (
            <div id="InitPage">
                <InitNavBar Login={this.Login} />

                <div id="LogModal" className="modal" tabIndex="-1" role="dialog">
                    {this.state.modalStatus == "LOGIN" ? <Login Signup={this.Signup} LogedIn={this.LogedIn} /> : <Signup Login={this.Login} history={this.props.history} />}
                </div>

                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item initCarousel-item verticalAlign">
                            <img className="first-slide verticalAlign" src="img/Slide1.jpg" alt="First slide image" />
                            <div className="container">
                                <div className="carousel-caption text-left">
                                    <h1>Live games tracking!</h1>
                                    <p>Do not miss any event of your favorite match!</p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item initCarousel-item active">
                            <img className="second-slide" src="img/Slide2.jpg" alt="Second slide image" />
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Suscribe, bet and win!</h1>
                                    <p>It's easy, don't miss the oportunity!</p>

                                    <button type="button" className="btn btn-lg btn-primary" onClick={() => this.Signup()} data-toggle="modal" data-target="#LogModal">Sign up today!</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item initCarousel-item">
                            <img className="third-slide" src="img/Slide3.jpg" alt="Third slide image" />
                            <div className="container">
                                <div className="carousel-caption text-right">
                                    <h1>The best bet place on the Web!</h1>
                                    <p>The excitement of winning thanks to your favorite team, at your favorite betting place.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>


                <div className="Steps container" >
                    <div className="row">
                        <div className="col-lg-4">
                            <img className="rounded-circle myRoundedImage" src="img/registration.svg" alt="First step, register image" width="140" height="140" />
                            <h2 className="txtCentered">Register >></h2>
                        </div>
                        <div className="col-lg-4">
                            <img className="rounded-circle myRoundedImage" src="img/token.svg" alt="Second step, bet image" width="140" height="140" />
                            <h2 className="txtCentered">Bet >></h2>
                        </div>
                        <div className="col-lg-4">
                            <img className="rounded-circle myRoundedImage" src="img/winner.svg" alt="Last step, win image!" width="140" height="140" />
                            <h2 className="txtCentered">Win!</h2>
                        </div>
                    </div>
                </div>

                <div id="AttributionsModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Images and Icons information</h5>
                            </div>

                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <h4>Images attributions: </h4>
                                            <p className="noMargin">Bruce mars on <a href="https://unsplash.com">Unsplash</a></p>
                                            <p className="noMargin">Comefreak on <a href="https://unsplash.com">Pixabay</a></p>
                                            <p className="noMargin">Gratisography on <a href="www.pexels.com">Pexels</a></p>
                                        </div>
                                    </div>

                                    <hr className="my-3" />

                                    <div className="row">
                                        <div className="col">
                                            <h4>Icons attributions: </h4>
                                            <p>Icons made by Freepick and dDara from <a href="https://www.flaticon.com">Flaticon</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <p className="float-right"><a href="#">Back to top</a></p>
                    <p className="noMargin">&copy; 2018 Camilo A. Carrillo N., Inc. &middot; <a href="" data-toggle="modal" data-target="#AttributionsModal">Images attributions</a></p>
                </footer>
            </div>
        );
    }
}

export default Init;