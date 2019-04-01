import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router-dom';
import Home from './Pages/Home';
import Appointments from './Pages/Appointments';
import Registration from './Pages/Registration';
import Profile from './Pages/Profile';
import Scheduling from './Pages/Scheduling';

class Paths extends Component{
    state = {
        loggedIn: true,
    }
    render() {
        return(
            <BrowserRouter>
                <div className="Routes">
                    <Route path="/" exact component={Home}/>
                    <Route path="/Appointments" exact component={Appointments}/>
                    <Route path="/Registration" exact component={Registration}/>
                    <Route path="/Profile" exact component={Profile}/>
                    <Route path="/Scheduling" exact component={Scheduling}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Paths;
