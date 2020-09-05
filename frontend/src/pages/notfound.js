import React, {Component} from 'react';
import Header from "../elements/header";
import {Link, Redirect} from "react-router-dom";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';

class NotFound extends Component {
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
                <Header/>
                <div id="wrapper">
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                            { this.user_status === 'true' ?
                              <Link to={'/admin/dashboard'}> Dashboard</Link>
                             :
                             <Link to={'/client/dashboard'}> Dashboard</Link>
                             }
                            </ol>

                            <h1 className="display-1">404</h1>
                            <p className="lead">Page not found. You can
                                <a href={this.props.history.goBack} onClick={this.props.history.goBack}> go back </a>
                                 to the previous page, or
                             { this.user_status === 'true' ?
                              <Link to={'/admin/dashboard'}> return home</Link>
                             :
                             <Link to={'/client/dashboard'}> return home</Link>
                             }
                             .</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const {string, object} = PropTypes;
NotFound.propTypes = {
    title: string.isRequired,
    history: object
};

export default withRouter(NotFound)
