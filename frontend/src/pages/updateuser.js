import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/adminsidebar";
import {Redirect} from "react-router-dom";


export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.user_status = sessionStorage.getItem('user_status');
        this.token = sessionStorage.getItem('token');
    }

    render() {        
        if (this.user_status === null) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header></Header>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">




     
                    </div>
                </div>
             </div>

        );
    }
}
