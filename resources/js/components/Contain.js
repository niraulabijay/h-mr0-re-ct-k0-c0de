import React, { Component } from "react";
import ReactDOM from "react-dom";
import Slider from "./Slider";

export default class Contain extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="main" className="site-main">
                <div className="container">
                    <div id="primary" className="content-area">
                        <div id="content" className="site-content" role="main">
                            <div className="entry type-page status-publish hentry">
                                <div className="entry-content">
                                    <Slider />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
