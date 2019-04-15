import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router-dom';
import Home from './Pages/Home';
import Appointments from './Pages/Appointments';
import Registration from './Pages/Registration';
import Profile from './Pages/Profile';
import Scheduling from './Pages/Scheduling';
import Report from './Pages/Report';
import DoctorRegistration from './Pages/DoctorRegistration';
import Locator from './Pages/Locator';

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
                    <Route path="/Locator" exact component={Locator}/>
                    <Route path="/Scheduling" exact component={Scheduling}/>
                    <Route path="/Reports" exact component={Report}/>
                    <Route path="/DoctorRegistration" exact component={DoctorRegistration}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Paths;
