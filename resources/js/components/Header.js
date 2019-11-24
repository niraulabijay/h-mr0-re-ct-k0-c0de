import React,{Component} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {Row, Col, Button, Modal, show} from "react-bootstrap";
import logouniver from "../../../public/html/images/logouniver.png"

export default class Header extends Component{
    constructor(){
        super();
        // this.state{

        // }
    }
    render(){
        const style= {
            border: "2px solid green"
        }
        return(
            <header id="masthead" className="site-header clearfix">
                <div className="header-main clearfix">
                    <div className="header-parts container">
                        <a className="site-title" href="home.html" rel="home"><img src={logouniver} alt="logo" /></a>
                        <div className="mobile-menu-button">
                            <span><i className="fa fa-bars"></i></span>
                        </div>
                        <nav className="site-navigation mobile-menu">
                            <div className="menu-primary-container">
                                <ul id="primary-menu-mobile" className="nav-menu">
                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item current_page_item">
                                        <a href="home.html" className="menu-link">Home</a>
                                    </li>
                                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                                        <a href="#" className="menu-link">Classes</a>
                                        <ul className="sub-menu">
                                            <li className="menu-item menu-item-type-post_type menu-item-object-page">
                                                <a href="class.html" className="menu-link">SEE</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                                        <a href="#" className="menu-link">Preparation</a>
                                        <ul className="sub-menu">
                                            <li className="menu-item menu-item-type-post_type menu-item-object-page">
                                                <a href="timetable.html" className="menu-link">Bridge Course</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                                        <a href="blog.html" className="menu-link">Blog</a>
                                        <ul className="sub-menu">
                                            <li className="menu-item menu-item-type-post_type menu-item-object-post">
                                                <a href="single-post.html" className="menu-link">Single post</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <nav className="site-navigation primary-navigation">
                            <div className="menu-primary-container">
                                <ul id="primary-menu" className="nav-menu">
                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item current_page_item">
                                        <a href="home.html" className="menu-link">Home</a>
                                    </li>
                                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                                        <a href="#" className="menu-link">Classes</a>
                                        <ul className="sub-menu">
                                            <li className="menu-item menu-item-type-post_type menu-item-object-page">
                                                <a href="class.html" className="menu-link">SEE</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                                        <a href="#" className="menu-link">Preparation</a>
                                        <ul className="sub-menu">
                                            <li className="menu-item menu-item-type-post_type menu-item-object-page">
                                                <a href="timetable.html" className="menu-link">Bridge Course</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                                        <a href="blog.html" className="menu-link">Blog</a>
                                        <ul className="sub-menu">
                                            <li className="menu-item menu-item-type-post_type menu-item-object-post">
                                                <a href="single-post.html" className="menu-link">Single post</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="search-wrapper">
                            <form method="get" className="searchform" action="http://azexo.com/">
                                <span className="toggle"></span>
                                <div className="searchform-wrapper">
                                    <div className="pull-left mx-3">
                                        <a href="" className="btn btn-success azen-button" data-toggle="modal" data-target="#myModal">Join Now</a>
                                    </div>
                                    <div className="azen-button pull-right">
                                        <a href="" className="btn btn-default" style= {style}>Login</a>
                                    </div>
                                </div>
                            </form><i className="fa fa-search"></i>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}