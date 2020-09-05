import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import TitleComponent from "../pages/title";


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.handleClickLogout = this.handleClickLogout.bind(this);
        this.user_status = sessionStorage.getItem('user_status');
    }


    handleClickLogout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_status');
        localStorage.setItem('isLoggedIn', false);
    }

    render() {
        if (this.user_status === null) {
            return <Redirect to='/' />
        }
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                <TitleComponent title="Voltron "></TitleComponent>



                {this.user_status === 'true' ?
                    <Link to={'/admin/dashboard'} className="navbar-brand mr-1">Voltron</Link>
                    :
                    <Link to={'/client/dashboard'} className="navbar-brand mr-1">Voltron</Link>
                }

                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item button no-arrow">
                            <Link to={'/'} onClick={this.handleClickLogout} className="nav-link button" id="userDropdown" role="button"
                            >
                                <a href="#" class="btn btn-info btn-lg">
                                    <span class="glyphicon glyphicon-log-out"></span> Log out
        </a>
                            </Link>

                        </li>
                    </ul>
                </form>


            </nav>
        );
    }
}
