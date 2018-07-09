import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';
import axios from 'axios';

class ProfileComponent extends Component {

    constructor(){
        super();
        this.state = { userDetails: {} }
    }


    componentWillMount(){
        axios.defaults.headers.common['Authorization'] = "Bearer "+this.props.userToken;
        axios.get("https://greencommunitylaundry.herokuapp.com/api/users/me").then(res => {
            this.setState({ userDetails: res.data })
        })
    }


  render() {   
    const userDetails = this.state.userDetails;
    return (
      <div>
        <HeaderComponent />
        <div className="profileCard" >
            <h2>Your Profile</h2>
            <p><b>ID:</b>  {userDetails._id}</p>
            <p><b>Name:</b>  {userDetails.name}</p>
            <p><b>Email:</b>  {userDetails.email}</p>
            <p><b>Provider:</b>  {userDetails.provider}</p>
            <p><b>Role:</b>  {userDetails.role}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    userToken: state.userToken
});

export default connect(mapStateToProps)(ProfileComponent);
