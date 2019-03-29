import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Home from '../src/Pages/Home';
import Appointments from '../src/Pages/Appointments';
import Registration from './Pages/Registration';

class Routes extends Component{
    state = {
        loggedIn: true,
    }
    render() {
        const {loggedIn} = this.state;
        return(
            <BrowserRouter>
                <div className="Routes">
                    <Route path="/" exact component={Home}/>
                    <Route path="/Appointments" exact component={Appointments}/>
                    <Route path="/Registration" exact component={Registration}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Routes;
