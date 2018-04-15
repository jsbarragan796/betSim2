import React, { Component } from 'react';

import InitNavBar from "../Navs/InitNavBar.jsx";
import "../../css/Init.css";

// Pages
import Login from '../../Accounts/Login.jsx'
import Signup from '../../Accounts/Signup.jsx'

class Init extends Component {

    constructor(props){
        super(props);
        
        this.state={
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

    LogedIn(){
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
                    {this.state.modalStatus == "LOGIN" ? <Login Signup={this.Signup} LogedIn={this.LogedIn} /> : <Signup Login={this.Login}  history={this.props.history} />}
                </div>

                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner initCarousel-item ">
                        <div className="carousel-item active">
                            <img className="first-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="First slide" />
                            <div className="container">
                                <div className="carousel-caption text-left">
                                    <h1>Example headline.</h1>
                                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item initCarousel-item ">
                            <img className="second-slide" src="img/MoneyHand.jpg" alt="Second slide" />
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Another example headline.</h1>
                                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item initCarousel-item ">
                            <img className="third-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Third slide" />
                            <div className="container">
                                <div className="carousel-caption text-right">
                                    <h1>One more for good measure.</h1>
                                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a></p>
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
                            <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
                            <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                        </div>
                        <div className="col-lg-4">
                            <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
                            <h2>Heading</h2>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                            <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                        </div>
                        <div className="col-lg-4">
                            <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                            <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn btn-primary myLargeButton" onClick={() => this.Signup()}>Sign up now!</button>
                    </div>
                </div>

                <footer className="container">
                    <p className="float-right"><a href="#">Back to top</a></p>
                    <p>&copy; 2017-2018 Camilo A. Carrillo N., Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
                </footer>
            </div>
        );
    }
}

export default Init;