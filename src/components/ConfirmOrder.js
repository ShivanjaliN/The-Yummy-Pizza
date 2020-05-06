import React, { Component } from "react";
import {
  NavLink,
} from "react-router-dom";

import Modal from "react-bootstrap/Modal";
// import ModalBody from "react-bootstrap/ModalBody";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faUser,faAddressBook } from '@fortawesome/free-solid-svg-icons'

import '../styles/Popup.css';

const faEmailIcon = <FontAwesomeIcon icon={faEnvelope} />;
const faUserIcon = <FontAwesomeIcon icon={faUser} />;
const faAddressBookIcon = <FontAwesomeIcon icon={faAddressBook} />;

class ConfirmOrder extends Component{
	
	render(){
		return(

			<div className="popup">

				<div className="confirm_popup_inner">
				  <Modal.Dialog className="myModal">
					<Modal.Header closeButton onClick={this.props.closeConfirmPopup} className="text-center">
						<Modal.Title>Place Your Order</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<div className="row">
						{!this.props.orderPlaced &&
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<form>
								  <div className="input-group mb-3">
									  <div className="input-group-prepend">
									    <span className="input-group-text">{faEmailIcon}</span>
									  </div>
									  <input type="email" value={this.props.emailId} onChange={this.props.changeEmailHandler} className="form-control" placeholder="Email Id" aria-label="Username" />
									</div>
								
									<div>
										<label className="text-danger">{this.props.emailErr}</label>
									</div>
								
									<div className="input-group mb-3">
									  <div className="input-group-prepend">
									    <span className="input-group-text">{faUserIcon}</span>
									  </div>
									  <input type="text" value={this.props.name} onChange={this.props.changeNameHandler} className="form-control" placeholder="Name"/>
									</div>
								
									<div className="input-group mb-3">
									  <div className="input-group-prepend">
									    <span className="input-group-text">{faAddressBookIcon}</span>
									  </div>
									  <input type="text" value={this.props.street} onChange={this.props.changeStreetHandler} className="form-control" placeholder="Street"/>
									</div>


									<div className="input-group mb-3">
									  <div className="input-group-prepend">
									    <span className="input-group-text">{faAddressBookIcon}</span>
									  </div>
									  <input type="text" value={this.props.city} onChange={this.props.changeCityHandler} className="form-control" placeholder="City"/>
									</div>

									<div className="input-group mb-3">
									  <div className="input-group-prepend">
									    <span className="input-group-text">{faAddressBookIcon}</span>
									  </div>
									  <input type="text" value={this.props.pincode} onChange={this.props.changePincodeHandler} className="form-control" placeholder="Pincode"/>
									</div>

									<div className="input-group mb-3">
									  <div className="input-group-prepend">
									    <span className="input-group-text">{faAddressBookIcon}</span>
									  </div>
									  
									  <select className="form-control" value={this.props.country} onChange={this.props.changeCountryHandler}>
									  	<option value="0">Select Country</option>
									  	<option value="Italy">Italy</option>
									  	<option value="Germany">Germany</option>
									  	<option value="France">France</option>
									  	<option value="USA">USA</option>
									  	<option value="India">India</option>
									  </select>
									</div>
								</form>

								<div>
									<label className="text-info"><b>Total Amount To Be Paid : {this.props.orderedItems.reduce( function(cnt,o){ return cnt + o.calculated_price; }, 0)} &euro;</b></label>
								</div>

								<div>
									<label className="text-danger">{this.props.errMsg}</label>
								</div>
							</div>
						}
							{this.props.orderPlaced &&
								<div className="col-md-12">
									<label className="text-success">Your Order is placed Successfully!</label>
									<NavLink className="navbar-brand" to="/yourOrders">View Your Orders</NavLink>
								</div>
							}
						</div>
					</Modal.Body>

					<Modal.Footer>
					{!this.props.orderPlaced &&
						<div>
							<button className="btn btn-success" onClick={this.props.checkOut}>Check Out</button>
							<button className="btn btn-danger"  onClick={this.props.closeConfirmPopup}>Cancel</button>
						</div>
					}
					</Modal.Footer>
				   </Modal.Dialog>
				</div>
			</div>
		);
	}
}

export default ConfirmOrder;