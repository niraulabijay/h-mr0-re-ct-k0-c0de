import React, {Component} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import background from "./images/home-middle-univer.jpg";
import {Row, Col, Button, Modal, show} from "react-bootstrap";

export default class Background extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            inviteCode: false,
            count: 1,
            modalResponse: false,
            info: {
                name: '',
                phone: '',
                nameError: '',
                phoneError: ''
            },
        };
    }

    toggleModal = () => {
        // console.log(this.state.count);
        this.setState({modalIsOpen: true});
    }

    handleClose = () => this.setState({modalIsOpen: false, inviteCode: false});

    invitedCode = () => this.setState({inviteCode: true, count: this.count + 1})

    handleChange = e => {

        this.setState({
            info: {
                ...this.state.info,
                [e.target.name]: e.target.value
            }
        })
    };
    checkValidation = () => {
        let phoneError = "";
        let phone = this.state.info.phone
        if (phone.length < 10) {
            phoneError = "Phone Number Invalid";
        }
        if (phoneError) {
            this.setState({
                info: {
                    ...this.state.info,
                    phoneError
                }
            });
            return false;
        }
        return true;
    };
    submitForm = e => {
        e.preventDefault();
        const isValid = this.checkValidation()
        if (isValid) {
            axios.post('/api/register', this.state.info).then(response => {
                console.log(response);
                if (response.data === 'success') {
                    this.setState({
                        modalIsOpen: false, modalResponse: true,
                        info: {
                            ...this.state.info,
                            name: "",
                            phone: ""
                        }
                    })
                }
            }).then(error => {
                console.log(error);
            })
        }
    };

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
                                        <Modal
                                            show={this.state.modalIsOpen}
                                            onHide={this.handleClose}
                                        >
                                            <Modal.Body>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    onClick={this.handleClose}
                                                >
                                                    &times;
                                                </button>
                                                <div
                                                    className="azen-col-xs-12 azen-col-sm-12 azen-col-md-12 azen-col-lg-12 azen-col-xs-offset-0 azen-col-sm-offset-0 azen-col-md-offset-0 azen-col-lg-offset-0"
                                                    data-cloneable=""
                                                    style={{
                                                        paddingRight: "0px"
                                                    }}
                                                >
                                                    <div data-element="univer/title-univer-creotive.html">
                                                        <div className="azen azen1 azen2 azen3">
                                                            <div
                                                                className="azen-univer-title c8e48d3c"
                                                                data-group="title univer"
                                                            >
                                                                <span className="az-inline ca259853">
                                                                    Join Company
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-element="univer/forms/form-container.html">
                                                        <div className="azen azen1 azen2 azen3">
                                                            <form
                                                                className="azen-univer-form-container"
                                                                data-cloneable=""
                                                                data-group="form"
                                                                data-white="true"
                                                            >
                                                                <div data-element="univer/forms/input-field.html">
                                                                    <div className="azen azen1 azen2 azen3">
                                                                        <div className="azen-univer-form-field">
                                                                            <input
                                                                                name="phone"
                                                                                type="text"
                                                                                placeholder="Phone Number"
                                                                                name="phone"
                                                                                value={
                                                                                    this
                                                                                        .state
                                                                                        .info
                                                                                        .phone
                                                                                }
                                                                                onChange={
                                                                                    this
                                                                                        .handleChange
                                                                                }
                                                                            />
                                                                            {this
                                                                                .state
                                                                                .info
                                                                                .phoneError ? (
                                                                                <div
                                                                                    style={{
                                                                                        fontSize: 12,
                                                                                        color:
                                                                                            "red"
                                                                                    }}
                                                                                >
                                                                                    {" "}
                                                                                    Invalid
                                                                                    Phone
                                                                                    Number{" "}
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div data-element="univer/forms/input-field.html">
                                                                    <div className="azen azen1 azen2 azen3">
                                                                        <div className="azen-univer-form-field">
                                                                            <input
                                                                                name="name"
                                                                                type="text"
                                                                                placeholder="Your Name"
                                                                                value={
                                                                                    this
                                                                                        .state
                                                                                        .info
                                                                                        .name
                                                                                }
                                                                                onChange={
                                                                                    this
                                                                                        .handleChange
                                                                                }
                                                                            />
                                                                            {this
                                                                                .state
                                                                                .info
                                                                                .nameError ? (
                                                                                <div
                                                                                    style={{
                                                                                        fontSize: 12,
                                                                                        color:
                                                                                            "red"
                                                                                    }}
                                                                                >
                                                                                    {" "}
                                                                                    Invalid
                                                                                    Name{" "}
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center mb-2">
                                                                    <div
                                                                        href=""
                                                                        style={{
                                                                            color:
                                                                                "blue",
                                                                            fontWeight:
                                                                                "bold"
                                                                        }}
                                                                        onClick={
                                                                            this
                                                                                .invitedCode
                                                                        }
                                                                    >
                                                                        I HAVE
                                                                        INVITE
                                                                        CODE
                                                                    </div>

                                                                    {inviteCoded ===
                                                                    false ? (
                                                                        <div
                                                                            style={{
                                                                                display:
                                                                                    "none"
                                                                            }}
                                                                        >
                                                                            <div className="azen azen1 azen2 azen3">
                                                                                <div className="azen-univer-form-field">
                                                                                    <input
                                                                                        name="text"
                                                                                        type="number"
                                                                                        placeholder="Invite Code"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <div className="azen azen1 azen2 azen3">
                                                                                <div className="azen-univer-form-field">
                                                                                    <input
                                                                                        name="text"
                                                                                        type="number"
                                                                                        placeholder="Invite Code"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div data-element="general/spacer.html">
                                                                    <div
                                                                        data-group="spacer"
                                                                        className="c0c78fd1"
                                                                    ></div>
                                                                </div>
                                                                <div data-element="univer/forms/submit-button.html">
                                                                    <div
                                                                        className="azen azen1 azen2 azen3"
                                                                        style={{
                                                                            textAlign:
                                                                                "center"
                                                                        }}
                                                                    >
                                                                        <div className="azen-univer-form-field">
                                                                            <button
                                                                                type="submit"
                                                                                style={{
                                                                                    width:
                                                                                        "50%"
                                                                                }}
                                                                                onClick={
                                                                                    this
                                                                                        .submitForm
                                                                                }
                                                                            >
                                                                                Join
                                                                                Now
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center mt-4">
                                                                    <a
                                                                        href=""
                                                                        style={{
                                                                            color:
                                                                                "grey",
                                                                            fontWeight:
                                                                                "bold"
                                                                        }}
                                                                    >
                                                                        I
                                                                        ALREADY
                                                                        HAVE
                                                                        ACCOUNT
                                                                    </a>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
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
