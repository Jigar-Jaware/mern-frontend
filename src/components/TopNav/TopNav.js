import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavbarBrand, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {UserContext} from '../../user-context';
import './style.css';

const TopNav = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => setIsOpen(!isOpen);

    // const [collapsed, setCollapsed] = useState(true);
    // const toggleNavbar = () => setCollapsed(!collapsed);

    const  { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const logoutHandler = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('user_id')
        setIsLoggedIn(false)
    }

  return isLoggedIn ?
    <div className="topnav" >
      <Navbar light expand="md">
        <NavbarBrand href="/"><strong>Fix My Date</strong></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar}/>
        
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
                <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
                <Link to="/aboutus">About</Link>
            </NavItem>
            <NavItem>
                <Link to="/contactus">Contact</Link>
            </NavItem>
            <NavItem>
                <Link to="/events">Create Event</Link>
            </NavItem>
            <NavItem>
                <Link to="/myregistrations">My Registrations</Link>
            </NavItem>
            <NavItem>
                <Link to="/reports">Data Reports</Link>
            </NavItem>
            <NavItem>
                <Link to="/login" onClick ={logoutHandler}><strong>Logout</strong></Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  : ""
}

export default TopNav;