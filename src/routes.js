import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import EventDetails from './pages/EventDetails'
import EventsPage from './pages/EventsPage'
import MyRegistrations from './pages/MyRegistration'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import Reports from './pages/Reports'
import TopNav from './components/TopNav/TopNav'
// import Slider from './components/Slider/Slider'
import Footer from './components/Footer/Footer'

export default function Routes() {
    return (
        <BrowserRouter>
            <TopNav/>
            {/* <Slider/> */}
            <div className="container content ">
            <Switch>
                <Route path='/' exact component={Dashboard} /> 
                <Route path='/reports' exact component={Reports} /> 
                <Route path='/eventdetails' exact component={EventDetails} />
                <Route path='/myregistrations' exact component={MyRegistrations} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/contactus' exact component={ContactUs} />
                <Route path='/aboutus' exact component={AboutUs} />
                <Route path='/events' component={EventsPage} /> 
            </Switch>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}