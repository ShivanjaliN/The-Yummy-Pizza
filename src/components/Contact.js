import React, { Component } from "react";
import Background from '../bg2.jpg';

var sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  width:'100%',
  height: '650px'
};

class Contact extends Component {
  render() {
    return (
      <div style={sectionStyle}>
        
      </div>
    );
  }
}
 
export default Contact;