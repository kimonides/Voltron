import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import TitleComponent from "./title";
import https from 'https';
import qs from "qs";
import ReactDOMServer from 'react-dom/server';

export default class Login extends Component {

    state = {
        Username: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false
    };

    handleUsernameChange = event => {
        this.setState({Username: event.target.value});
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        axios({
            method: 'post',
            url: 'http://localhost:8765/energy/api/Login',
            data: qs.stringify({
                username: this.state.Username,
                password: this.state.password
            }),
            headers:{
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        })
            .then(result => {
                console.log(result.data.token);
                console.log(result.data.admin);
                if (result.data.token) {
                    sessionStorage.setItem('token', result.data.token);
                    sessionStorage.setItem('user_status', result.data.admin);
                    this.setState({redirect: true, isLoading: false});
                    sessionStorage.setItem('isLoggedIn', true);
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({authError: true, isLoading: false});
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            if(ReactDOMServer.renderToString(sessionStorage.getItem('user_status')) === 'true'){
                return <Redirect to='admin/dashboard'/>
            }
            else{
                return <Redirect to='client/dashboard'/> 
            }
        }
        
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <TitleComponent title="Voltron "></TitleComponent>
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputUsername" placeholder="Username " type="text" name="Username" onChange={this.handleUsernameChange} autoFocus required/>
                                    <label htmlFor="inputUsername">Username </label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Username.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
              {this.renderRedirect()}
            </div>
        );
    }
}


