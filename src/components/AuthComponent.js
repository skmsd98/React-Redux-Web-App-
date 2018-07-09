import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input';
import { setUserToken } from '../actions/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


class AuthComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEmail: "",
      userPassword: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }


  handleEmailChange(value){
    this.setState({ userEmail: value });
    
  }

  handlePasswordChange(value){
    this.setState({ userPassword: value });
  }

  handleAuth(){
    const userEmail = this.state.userEmail;
    const userPassword = this.state.userPassword;
    axios.post("https://greencommunitylaundry.herokuapp.com/api/auth/local",
    {
      email: userEmail,
      password: userPassword
    })
    .then((tokenObj) => {
        if(tokenObj) {
          this.props.setToken(tokenObj.data.token);
          }
        }
      )
    .catch(error=>alert(error));
  }

  render() {
    return (
      <div>
        {
          this.props.userToken ?
          (
            <Redirect to="/products" />
          ) :
          (
            <div className="authCard" >
                <h3>You must Login to continue!</h3>
                <Input type="text" label="Email" onChange={this.handleEmailChange} />
                <Input type="password" label="Password" onChange={this.handlePasswordChange} />
                <Button label="Log In" primary raised onClick={this.handleAuth} id="loginButton" />
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userToken: state.userToken
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setUserToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);