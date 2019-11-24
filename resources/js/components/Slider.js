import React, {Component} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import background from "./images/home-middle-univer.jpg";
import {Row, Col, Button, Modal, show} from "react-bootstrap";
import JoinModal from "./JoinModal";

export default class Background extends Component {

    render() {
        const background = './images/home-middle-univer.jpg';
        const inviteCoded = this.state.inviteCode;
        const countId = this.state.count;
        return (
            <React.Fragment>
                <div data-section="univer/middle-home.html">
                    <div className="azen azen1 azen2 azen3">
                        <div
                            data-full-width="true"
                            data-stretch-content="false"
                            data-without-padding="false"
                            className="azen-univer-middle-home c63c96e2"
                            style={{}}
                            data-darken-background="false"
                        >
                            <div className="azen-middle-wrapper">
                                <div className="azen-page-header">
                                    <div
                                        className="azen-header-title"
                                        data-group="title page"
                                    >
                                        Better Education For a Better World
                                    </div>
                                </div>
                                <div
                                    className="azen-text-middle"
                                    data-group="description"
                                >
                                    Investigationes Demonstraverunt lectores
                                    legere me lius ii legunt saepius lectorum
                                    parum calarm.
                                </div>
                                <div className="join-now-form">
                                    <Row className="azen-row">
                                        <Col md="3" lg="3">
                                            <div className="country-code">
                                                +977
                                            </div>
                                        </Col>
                                        <Col md="5" lg="5">
                                            <div className="phone-number">
                                                <input
                                                    type="number"
                                                    name="phone"
                                                    maxLength="10"
                                                    onChange={this.handleChange}
                                                    value={
                                                        this.state.info.phone
                                                    }
                                                />
                                            </div>
                                        </Col>
                                        <Col md="4" lg="4">
                                            <div className="Submit">
                                                <Button
                                                    variant="success"
                                                    onClick={this.toggleModal}
                                                >
                                                    Join
                                                </Button>
                                            </div>
                                        </Col>
                                        {/*modal location*/}
                                        <JoinModal/>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
