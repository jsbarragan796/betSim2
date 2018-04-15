import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "../../css/ImageGallery.css";

class ImageGallery extends Component {

    render() {
        return (
            <div id={this.props.categoryInfo.name + "EventImageCarousel"} className="carousel slide" data-ride="carousel">

                <ol className="carousel-indicators">
                    <li name="Basketball_1.png"  data-target={"#" + this.props.categoryInfo.name + "EventImageCarousel"} data-slide-to="0" className="active"></li>
                    <li name="Football_1.png" data-target={"#" + this.props.categoryInfo.name + "EventImageCarousel"} data-slide-to="1"></li>
                    <li name="Basic_Event.png" data-target={"#" + this.props.categoryInfo.name + "EventImageCarousel"} data-slide-to="2"></li>
                    <li name="Basic_Event_FondoNegro.png" data-target={"#" + this.props.categoryInfo.name + "EventImageCarousel"} data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active smGallery">
                        <img id="Slide0" className="d-block w-100" name="Basketball_1.png" src="img/Basketball_1.png" alt="Basketball event image" />
                    </div>

                    <div className="carousel-item smGallery">
                        <img id="Slide1" className="d-block w-100" name="Football_1.png" src="img/Football_1.png" alt="Football event image" />
                    </div>

                    <div className="carousel-item smGallery">
                        <img id="Slide2" className="d-block w-100" name="Basic_Event.png" src="img/Basic_Event.png" alt="Basic event image, white bakground" />
                    </div>

                    <div className="carousel-item smGallery">
                        <img id="Slide3" className="d-block w-100" name="Basic_Event_FondoNegro.png" src="img/Basic_Event_FondoNegro.png" alt="Basic event image, black bakground" />
                    </div>
                </div>
                <a className="carousel-control-prev" href={"#" + this.props.categoryInfo.name + "EventImageCarousel"} role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={"#" + this.props.categoryInfo.name + "EventImageCarousel"} role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

ImageGallery.propTypes = {
    categoryInfo: PropTypes.object.isRequired
}

export default ImageGallery;