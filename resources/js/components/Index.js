import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./Header";
import Contain from "./Contain";
import { Row, Col, Button, Modal, show } from "react-bootstrap";

export default class Index extends Component{
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
        this.setState ({ modalIsOpen: true });
    };

    handleClose = () => this.setState({ modalIsOpen: false, inviteCode: false });

    invitedCode = () => this.setState({ inviteCode: true, count: this.count + 1 })

    handleChange = e => {

        this.setState({
            info:{
                ...this.state.info,
                [e.target.name]: e.target.value
            }
        })
    };
    checkValidation = () => {
        let phoneError = "";
        let phone  = this.state.info.phone;
        if(phone.length < 10){
            phoneError = "Phone Number Invalid";
        }
        if(phoneError){
            this.setState({
                info:{
                    ...this.state.info,
                    phoneError
                }
            });
            return false;
        }
        return true;
    };
    submitForm = e =>{
        e.preventDefault();
        const isValid = this.checkValidation()
        if(isValid){
            axios.post('/api/register', this.state.info).then(response => {
                console.log(response);
                if(response.data === 'success'){
                    this.setState({  modalIsOpen: false, modalResponse: true,
                        info:{
                            ...this.state.info,
                            name: "",
                            phone: ""
                        }
                    })
                }
            }).then(error =>{
                console.log(error);
            })
        }
    };
    render(){
        return(
            <React.Fragment>
                <div id="preloader">
                    <div id="status">
                    </div>
                </div>
                <Header/>
                <Contain/>
            </React.Fragment>
        )
    }
}

if(document.getElementById('root')){
    ReactDOM.render(<Index />, document.getElementById('root'));
}