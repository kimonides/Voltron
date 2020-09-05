import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/login";
import NotFound from "./pages/notfound";
import Dashboard from './pages/dashboard';
import Data from './pages/data';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/admin/dashboard' component={Dashboard} />
                        <Route path='/admin/data' component={Data} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
