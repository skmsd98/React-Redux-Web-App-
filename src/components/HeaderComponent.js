import React, { Component } from 'react'
import { connect } from 'react-redux';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import { Link } from 'react-router-dom';
import { resetToken } from '../actions/actions'

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <AppBar title=''  leftIcon="Shopping.pk" >
          <Link to="/products" >
            <p className="homeLink">Home</p>
          </Link>
          <Link to="/profile" >
            <p className="homeLink">Profile</p>
          </Link>
          <Link to="/" onClick={this.props.resetToken} >
            <p className="homeLink" >Logout</p>
          </Link>
          <Link to="/cart" >
            <i className="fa fa-shopping-cart fa-2x">{this.props.cartArray == undefined ? "" : this.props.cartArray.length}</i>
          </Link> 
        </AppBar> 
      </div>
    )
  }
}


const mapStatetoProps = (state) => ({
  cartArray: state.cart
});

const mapDispatchToProps = (dispatch) => ({
  resetToken: () => dispatch(resetToken())
});

export default connect(mapStatetoProps, mapDispatchToProps)(HeaderComponent);