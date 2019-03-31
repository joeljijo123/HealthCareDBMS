import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Home from './Pages/Home';
import Appointments from './Pages/Appointments';
import Registration from './Pages/Registration';
import Profile from './Pages/Profile';

class Paths extends Component{
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
                    <Route path="/Profile" exact component={Profile}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Paths;
