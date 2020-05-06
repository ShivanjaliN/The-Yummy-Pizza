import React, { Component } from "react";
import { API_BASE_URL, ASSET_BASE_URL } from '../config';
import '../styles/Stuff.css';

import Pizza from './Pizza';
import Popup from './Popup';
import ConfirmOrder from './ConfirmOrder';

class Stuff extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
          pizzas: null,
          isLoading: null,
          popupShowed: false,
          orderedList: [],
          selectedPizza: {},
          quantity : 1,
          showConfirmPopup : false,
          errMsg:'',
          errMsg1:'',
          emailId:'',
          name:'',
          street:'',
          city:'',
          pincode:'',
          country:0,
          orderPlaced:false,
          emailErr:'',
		  delivery_charges:10
      };
  }

  componentDidMount() {
      this.getPizzas();
  }

  async getPizzas() {
    if (! this.state.pizzas) {
      try {
          this.setState({ isLoading: true });
          const response = await fetch(API_BASE_URL + '/pizzas', {
          });
          let pizzaList = await response.json();
          pizzaList.forEach(item =>{
            item.img_url = ASSET_BASE_URL+item.img_url
          })
          this.setState({ pizzas: pizzaList, isLoading: false});
      } catch (err) {
          this.setState({ isLoading: false });
          console.error(err);
      }
    }
  }

  closePopup(){
    this.setState({
      popupShowed: false,
      orderedList : []
    })
  }

  togglePopup(item) {
    const selected_item = item;
    let myOrders = {
      'pizza_id' : selected_item.id, 
      'name' : selected_item.name,
      'quantity' : this.state.quantity, 
      'price' : selected_item.price,
      'calculated_price' : selected_item.price
    }
    let arr = this.state.orderedList;
    if (this.state.orderedList.filter(e => { return e.pizza_id === selected_item.id; }).length > 0) {
        this.addToCart(selected_item);
        this.setState({
          popupShowed: !this.state.popupShowed,
          selectedPizza: item, 
        })
    }else{
      arr.push(myOrders);
      this.setState({
        popupShowed: !this.state.popupShowed,
        selectedPizza: item, 
        orderedList : arr
      })
    }
  };

  addToCart(selected_item){
    let arr = this.state.orderedList;
    let myOrders = {
      'pizza_id' : selected_item.id, 
      'name' : selected_item.name,
      'quantity' : this.state.quantity, 
      'price' : selected_item.price,
      'calculated_price' : selected_item.price
    }
    if (this.state.orderedList.filter(e => { return e.pizza_id === selected_item.id; }).length > 0) {
      arr.forEach(item => {
        if(item.pizza_id === selected_item.id){
          item.quantity++;
          item.calculated_price = item.quantity*item.price;
        }
      })
      this.setState({
        orderedList : arr,
        errMsg: ''
      })
    }else{
      arr.push(myOrders);
      this.setState({
        orderedList : arr,
        errMsg: ''
      })
    }
  }

  removeFromCart(selected_item){
    let arr = this.state.orderedList;

    arr.forEach(item => {
      if(item.quantity > 1){
        if(item.pizza_id === selected_item.id){
          item.quantity--;
          item.calculated_price -= item.price;
        }
      }else{
        arr.splice(arr.indexOf(item), 1);
      }
    })
    this.setState({
      orderedList : arr
    })
  }

  addMore(orderedItems){
    this.setState({
      popupShowed: !this.state.popupShowed,
      orderedList: orderedItems,
      errMsg: ''
    });
  }

  deleteItem(item){
    let arr = this.state.orderedList;
    arr.splice(arr.indexOf(item), 1);
    this.setState({
      orderedList : arr
    })
  }

  placeOrder(){
    if(this.state.orderedList.length > 0){
      this.setState({
        showConfirmPopup: !this.state.showConfirmPopup
      })
    } 
    else{
      this.setState({
        errMsg: 'Please Increase the quantity or Select Any other Item!'
      })
    }
  }

  toggleConfirmPopup(){
    this.setState({
        showConfirmPopup: false
      })
  }


  changeEmailHandler(event){
    this.setState({
      emailId: event.target.value,
      errMsg1 : ''
    })
  }

  changeNameHandler(event){
    this.setState({
      name: event.target.value,
      errMsg1 : ''
    })
  }

  changeStreetHandler(event){
    this.setState({
      street: event.target.value,
      errMsg1 : ''
    })
  }

  changeCityHandler(event){
    this.setState({
      city: event.target.value,
      errMsg1 : ''
    })
  }

  changePincodeHandler(event){
    this.setState({
      pincode: event.target.value,
      errMsg1 : ''
    })
  }

  changeCountryHandler(event){
    this.setState({
      country: event.target.value,
      errMsg1 : ''
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

  checkOut(){
    if(this.state.emailId){
      if(this.state.name){
        if(this.state.street){
          if(this.state.city){
            if(this.state.pincode){
              if(this.state.country){
                const isValid = this.validate();
                if(isValid){
                  fetch(API_BASE_URL + '/addUser', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email : this.state.emailId,
                      name : this.state.name,
                      street : this.state.street,
                      city : this.state.city,
                      pincode : this.state.pincode,
                      country : this.state.country
                    }),
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Success:', data);
                    this.state.orderedList.forEach(item => {
                      fetch(API_BASE_URL + '/placeOrder', {
                          method: 'POST', 
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            'user_id' : data,
                            'pizza_id' : item.pizza_id,
                            'quantity' : item.quantity
                          }),
                        })
                        .then(response => response.json())
                        .then(data => {
                          console.log('Success:', data);
                        })
                        .catch((error) => {
                          console.error('Error:', error);
                        });
                        this.setState({
                          popupShowed: false,
                          orderedList: [],
                          selectedPizza: {},
                          quantity : 1,
                          //showConfirmPopup : false,
                          orderPlaced:true,
                          errMsg:'',
                          errMsg1:'',
                          emailId:'',
                          name:'',
                          street:'',
                          city:'',
                          pincode:'',
                          country:0
                        })
                    })
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
                }
              }
              else{
                this.setState({
                  errMsg1 : 'Please Select Country'
                })
              }
            }
            else{
              this.setState({
                errMsg1 : 'Please Enter Pincode'
              })
            }
          }
          else{
            this.setState({
              errMsg1 : 'Please Enter City'
            })
          }
        }
        else{
          this.setState({
            errMsg1 : 'Please Enter Street'
          })
        }
      }
      else{
        this.setState({
          errMsg1 : 'Please Enter Name'
        })
      }
    }else{
      this.setState({
        errMsg1 : 'Please Enter Email Id'
      })
    }
  }

  render() {
    return (
      <div className="text-center container-fluid mt-20">
        <h2>Try Our Astonishing Flavours!</h2>
        {this.state.isLoading &&
          <div>
            <img src={process.env.PUBLIC_URL +'/loader.gif'} className="mt-200" alt="Loading" />
          </div>
        }
        <div className="row">
        {this.state.pizzas && this.state.pizzas.map(
            pizza =>
              <Pizza
                key={pizza.id}
                id={pizza.id}
                name={pizza.pizza_name}
                description={pizza.description}
                price={pizza.price}
                imageSource={pizza.img_url}
                imageAlt={pizza.pizza_name}
                popupShowed={this.state.popupShowed}
                togglePopup={this.togglePopup.bind(this)} 
                errMsg={this.state.errMsg}
              />
            )}
          </div>

          {this.state.popupShowed && (
            <Popup 
              pizza_details={this.state.selectedPizza } 
              closePopup={this.closePopup.bind(this)} 
              add={this.addToCart.bind(this)}
              remove={this.removeFromCart.bind(this)}
              placeOrder={this.placeOrder.bind(this)}
              orderedItems={this.state.orderedList}
              addMore={this.addMore.bind(this)}
              deleteItem={this.deleteItem.bind(this)}
              showConfirmPopup={this.state.showConfirmPopup}
              errMsg={this.state.errMsg}
			  delivery_charges={this.state.delivery_charges}
            />
          )}

          {this.state.showConfirmPopup && (
          <ConfirmOrder 
              orderedItems={this.state.orderedList} 
              errMsg={this.state.errMsg1}
              emailId={this.state.emailId}
              name={this.state.name}
              street={this.state.street}
              city={this.state.city}
              pincode={this.state.pincode}
              country={this.state.country}
              closeConfirmPopup={this.toggleConfirmPopup.bind(this)} 
              checkOut={this.checkOut.bind(this)}
              changeEmailHandler={this.changeEmailHandler.bind(this)}
              changeNameHandler={this.changeNameHandler.bind(this)}
              changeStreetHandler={this.changeStreetHandler.bind(this)}
              changeCityHandler={this.changeCityHandler.bind(this)}
              changePincodeHandler={this.changePincodeHandler.bind(this)}
              changeCountryHandler={this.changeCountryHandler.bind(this)}
              orderPlaced={this.state.orderPlaced}
              emailErr={this.state.emailErr}
			  delivery_charges={this.state.delivery_charges}
            />
          )}

        </div>  
    );
  }
}
 
export default Stuff;