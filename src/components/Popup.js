import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
// import ModalBody from "react-bootstrap/ModalBody";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMinus,faTimes } from '@fortawesome/free-solid-svg-icons'

import '../styles/Popup.css';

const faPlusIcon = <FontAwesomeIcon icon={faPlus} />;
const faMinusIcon = <FontAwesomeIcon icon={faMinus} />;
const faCloseIcon = <FontAwesomeIcon icon={faTimes} />;

class Popup extends Component{

	render(){
		return(
			<div className="popup">

				<div className="popup_inner">
				  <Modal.Dialog className="myModal">
					<Modal.Header closeButton onClick={this.props.closePopup}>
						<Modal.Title>{this.props.pizza_details.name}</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<div className="row">
							<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
								<img className="dispImg" src={this.props.pizza_details.imageSource} alt={this.props.pizza_details.name}/>
							</div>
							<div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
								<p>{this.props.pizza_details.description}</p>
								<p>Price : {this.props.pizza_details.price} &euro;</p>
								
								<span>Quantity : </span>
								<button className="btn btn-info btn-sm mr-10" onClick={() => this.props.add(this.props.pizza_details)}>{faPlusIcon}</button>
								<button className="btn btn-info btn-sm" onClick={() => this.props.remove(this.props.pizza_details)}>{faMinusIcon}</button>

							</div>

							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<span className="text-danger">{this.props.errMsg}</span>
							</div>

							{ this.props.orderedItems.length > 0 &&
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<h6>You have Ordered</h6>
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Item</th>
											<th>Price</th>
											<th>Quantity</th>
											<th>Total</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{this.props.orderedItems.map(
		        						item =>
											<tr key={item.pizza_id}>
												<td>{item.name}</td>
												<td>{item.price} &euro;</td>
												<td>{item.quantity}</td>
												<td>{item.calculated_price} &euro;</td>
												<td>
													<span className="text-danger hoverMe" onClick={() => this.props.deleteItem(item)}>{faCloseIcon}</span>
												</td>
											</tr>
										)}
									</tbody>
								</table>

								<table className="table table-bordered">
									<tbody>
									<tr>
										<td colSpan="3">Delivery Charges</td>
										<td>{this.props.delivery_charges} &euro;</td>
									</tr>
									<tr>
										<td colSpan="3">Sub Total</td>
										<td>{this.props.orderedItems.reduce( function(cnt,o){ return cnt + o.calculated_price; }, 0)+this.props.delivery_charges} &euro;</td>
									</tr>
									</tbody>
								</table>
							</div>
							}
						</div>
						
					</Modal.Body>

					<Modal.Footer>
						<button className="btn btn-warning" onClick={() => this.props.addMore(this.props.orderedItems)}>Add More From Menu</button>
						<button className="btn btn-success" onClick={this.props.placeOrder}>Place Order</button>
						<button className="btn btn-danger"  onClick={this.props.closePopup}>Cancel</button>
					</Modal.Footer>
				   </Modal.Dialog>
				</div>
			</div>
		)
	}
}


export default Popup;