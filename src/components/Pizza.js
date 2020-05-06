import React, { Component } from "react";

class Pizza extends Component {

  render(){
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
          <div className="card">
              <div className="card-block">
                  <img className="dispImg" src={this.props.imageSource} alt={this.props.name} />
                  <h4 className="card-title mt-3">{this.props.name}</h4>
                  <div className="card-text">
                      {this.props.description.substring(0, 40)}..
                  </div>
              </div>
              <div className="card-footer">
                  <span className="float-left text-danger"><b>{this.props.price} &euro;</b></span>
                  
                  <button className="btn btn-success float-right btn-sm" onClick={() => this.props.togglePopup(this.props)}>Order Now</button>
              </div>
          </div>
      </div>
    )
  }
}
 
export default Pizza;