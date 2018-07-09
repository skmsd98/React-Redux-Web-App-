import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAPIdata } from '../actions/actions';
import CardComponent from './CardComponent';
import axios from 'axios';
import HeaderComponent from './HeaderComponent'

class ProductListComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
    // if(this.props.token){
    //   axios.defaults.headers.common['Authorization'] = "Bearer "+this.props.token;
    // }
    this.props.getAPI();
    // axios.get("https://greencommunitylaundry.herokuapp.com/api/users/me").then(res=>{
    //   console.log(res.data);
    // })
  }    
    
  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="flex-container">
        {
          this.props.products == undefined ? 
          <i class="fas fa-spinner fa-spin fa-4x"></i> : 
          this.props.products.map(product => (<CardComponent product={product} />)
          )
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products
});


const mapDispatchToProps = (dispatch) => ({
  getAPI: () => dispatch(getAPIdata())
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductListComponent);
