import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Button from 'react-toolbox/lib/button/Button';
import HeaderComponent from './HeaderComponent';
import { connect } from 'react-redux';
import { deleteFromCart } from '../actions/actions';


class CartComponent extends Component {
  constructor(props){
    super(props);
    const array = props.cartItems.map(() => {
      return 0;
    });
    this.state = { netAmountArray: array };

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleChange(event){
    const index = event.target.id;
    const netAmount = event.target.value * this.props.cartItems[index].price;
    const localArray = this.state.netAmountArray;
    localArray[index] = netAmount;
    this.setState({
      netAmountArray: localArray
    });
  }

  handleDelete(index, event, value){
    var localArray = this.state.netAmountArray;
    localArray.splice(index, 1);
    this.setState({netAmountArray: localArray});
    this.props.deleteFromCart(event.target.id);
  }

  render() {
    var count = 0, temp = 0;
    const totalPrice = this.state.netAmountArray.map(elm=>(
      temp+=elm
    ));
    return (
      <div>
        <HeaderComponent />
        <Table selectable={false} >
          <TableHead>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell></TableCell>       
          </TableHead>   
            {
              this.props.cartItems.map((item, index)=>(
                <TableRow>
                    <TableCell>{count+=1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price} /Item</TableCell>
                    <TableCell><input className="_2WvFs" id={index} type="number" onChange={this.handleChange} /></TableCell>
                    <TableCell>${this.state.netAmountArray[index]}</TableCell>
                    <TableCell><Button id={item._id} label="Delete" raised accent onClick={this.handleDelete.bind(this, index)} /></TableCell>
                </TableRow>
              ))
            }
            {
              count>0 && 
              (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell><h2>Total Price</h2></TableCell>
                  <TableCell><h2>${totalPrice[(totalPrice.length)-1]}</h2></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ) 
            }
        </Table>
        {
          count<=0 && 
          (
            <div id="emptyCartDiv">
              <h2>Cart Empty!</h2>
              <i class="fas fa-shopping-cart fa-7x"></i>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart
});

const mapDispatchToProps = (dispatch) => ({
  deleteFromCart: (productID) => dispatch(deleteFromCart(productID))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);