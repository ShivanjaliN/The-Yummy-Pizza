import React, { Component }from 'react';

import {
	BrowserRouter as Router,
  NavLink,
	Switch,
	Route,
} from "react-router-dom";

import Home from "./components/Home";
import Stuff from "./components/Stuff";
import Contact from "./components/Contact";
import YourOrders from './components/YourOrders';
import './styles/App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'

const logo =  <FontAwesomeIcon icon={faPizzaSlice} />;

class App extends Component {
	  
  render() {
    return (
    	<Router>
    		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon  text-black"></span>
			  </button>
			  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
			  	<span className="logo d-none d-sm-block" >{logo}</span>
			    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
			      <li className="nav-item active">
			        <NavLink className="navbar-brand" to="/">Home</NavLink>
			      </li>
			      <li className="nav-item">
			        <NavLink className="navbar-brand" to="/stuff">Place Order</NavLink>
			      </li>
						<li className="nav-item">
			        <NavLink className="navbar-brand" to="/yourOrders">Your Orders</NavLink>
			      </li>
			      <li className="nav-item">
			        <NavLink className="navbar-brand" to="/contact">Contact Us</NavLink>
			      </li>
			    </ul>
			    
			  </div>
			</nav>

    			
          <div>
					<Switch>
					<Route path="/yourOrders">
							<YourOrders />
						</Route>
						<Route path="/contact">
							<Contact />
						</Route>
						<Route path="/stuff">
							<Stuff />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
    	  </div>
			</Router>
    );
  }
}
 
export default App;