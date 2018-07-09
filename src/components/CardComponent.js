import React, { Component } from 'react';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import { addToCart } from '../actions/actions';
import { connect } from 'react-redux';


class CardComponent extends Component {
    constructor(){
        super();
        this.state={active: false};
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle = () => {
        this.setState({active: !this.state.active});
    }


    render() {
        const actions = [
            { label: "Back", onClick: this.handleToggle },
        ];
        return (
        <div>
            <Card style={{width: '280px'}}>
                <CardTitle
                title={"$"+this.props.product.price}
                />
                <CardMedia
                aspectRatio="wide"
                image={"https://greencommunitylaundry.herokuapp.com/api/Images/"+this.props.product.image}
                />
                <CardTitle
                title={this.props.product.name}
                />
                <CardActions theme={theme}>
                    <Button label="Details" accent onClick={this.handleToggle} />
                </CardActions>
                <CardActions theme={theme}>
                    <Button label="Add to Cart" primary onClick={this.props.addToCart.bind(this, this.props.product, this.props.cartArray)} />
                </CardActions>
            </Card>
            
            {this.state.active && (<Dialog
                actions={actions}
                active={this.state.active}
                onEscKeyDown={this.handleToggle}
                onOverlayClick={this.handleToggle}
                title="Product Details"
                >
                <Card style={{width: '600px'}}>
                <CardTitle
                title={"$"+this.props.product.price}
                />
                <CardMedia
                aspectRatio="wide"
                image={"https://greencommunitylaundry.herokuapp.com/api/Images/"+this.props.product.image}
                />
                <CardTitle
                title={this.props.product.name}
                subtitle={this.props.product.category.name}
                />
                <CardActions theme={theme}>
                    <Button label="Add to Cart" accent raised onClick={this.props.addToCart.bind(this, this.props.product, this.props.cartArray)}/>
                </CardActions>
            </Card>
            </Dialog>)}
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    var check = false;
    return {
    addToCart: (product, cart) => {
        cart.map(elm=>{
            if(elm._id === product._id){
                alert("Product Already added to the cart");
                check = true;
            }
        })
        if(!check){
            dispatch(addToCart(product))
        }
    }
}};

const mapStateToProps = (state) => ({
    cartArray: state.cart
});

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);