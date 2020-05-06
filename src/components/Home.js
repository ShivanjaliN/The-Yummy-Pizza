import React, { Component } from "react";
import Background from '../bg1.jpg';
import '../App.css'

var sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  width:'100%',
  height: '650px'
};


class Home extends Component {
  render() {
    return (
      <div style={sectionStyle}>
        <div className="layer">
          <h2 className="text-white">Try Our Astonishing Flavours!</h2>
          <br/><br/>
          <h4 className="text-white">Various varieties of Pizzas that you will always crave for!</h4>
        </div>
      </div>
    );
  }
}
 
export default Home;