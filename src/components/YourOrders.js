import React, { Component } from "react";
import { API_BASE_URL } from '../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import '../styles/Stuff.css'
const faEmailIcon = <FontAwesomeIcon icon={faEnvelope} />;

class YourOrders extends Component{

    constructor(props){
        super(props)    
        this.state = {
            emailId : '',
            emailErr: '',
            orderedItems : [],
            isLoading : false,
			no_records_found:false
        }
    }

    changeEmailHandler(event){
        this.setState({
          emailId: event.target.value,
        })
    }

    validate(){
        let emailErr = '';
        
        if(!this.state.emailId.includes('@')){
            emailErr = 'Invalid Email';
        }
        if(emailErr){
            this.setState({emailErr});
            return false;
        }
        return true;
    }
    
    getYourOrders(){
        const isValid = this.validate();
        if(isValid){
            this.setState({ isLoading: true });
            fetch(API_BASE_URL + '/getOrders', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email' : this.state.emailId
            }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if(data.length > 0){
					this.setState({
						orderedItems : data,
						isLoading : false,
						email:''
					})
				}
				else{
					this.setState({
						no_records_found : true,
						isLoading : false,
						email:''
					})
				}
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }
    }

    render(){
		return(
            <div className="container">
                <div className="row mt-20">
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 text-center">
                        <div className="card"  style={{height:'150px'}}>
                            <div className="card-block">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">{faEmailIcon}</span>
                                    </div>
                                    <input type="email" value={this.state.emailId} onChange={this.changeEmailHandler.bind(this)} className="form-control" placeholder="Email Id" aria-label="Username" />
                                </div>
                                <label className="text-danger">{this.state.emailErr}</label>
                                <br/>
                                <button className="btn btn-info" onClick={this.getYourOrders.bind(this)}>View Your Orders</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                    </div>
                </div>
                <div className="row mt-20 text-center">
                    {this.state.isLoading &&
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h4>Your Orders are Loading</h4>
                        <img src={process.env.PUBLIC_URL +'/loader.gif'} className="mt-20" alt="Loading" />
                    </div>
                    }
                    
                    {this.state.orderedItems.length > 0 &&
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-20">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Ordred On</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orderedItems.map(
                                item =>
                                    <tr key={item.pizza_id}>
                                        <td>{item.pizza_name}</td>
                                        <td>{item.price} &euro;</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.created_at.substring(0, 16)}</td>
                                        <td>{item.price*item.quantity} &euro;</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    }   
					
					{this.state.no_records_found &&
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-20">
						<label className="text-danger">No Orders Found!</label>
					</div>
					}
					
                </div>
            </div>
        )
    }
}

export default YourOrders
