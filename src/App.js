import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import './assets/react-toolbox/theme.css';
import AuthComponent from './components/AuthComponent';
import CartComponent from './components/CartComponent';
import ProductListComponent from './components/ProductListComponent';
import ProfileComponent from './components/ProfileComponent';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class AppRouter extends Component {
  render() {
    const userToken = this.props.userToken;
    return (
      <Router>
        <div>
          <Route exact path="/" component={AuthComponent} />
          <Route path="/products" component={userToken ? ProductListComponent : ()=>(<Redirect to="/" />)} />
          <Route path="/cart" component={userToken ? CartComponent : ()=>(<Redirect to="/" />)} />
          <Route path="/profile" component={userToken ? ProfileComponent : ()=>(<Redirect to="/" />)} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userToken
});

export default connect(mapStateToProps)(AppRouter);