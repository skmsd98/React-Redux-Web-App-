import axios from 'axios';
import { FETCH_PRODUCTS, ADD_TO_CART, DELETE_FROM_CART, SET_USER_TOKEN, RESET_USER_TOKEN } from './types.js';
    
export const getAPIdata = () => dispatch => (
    axios.get("https://greencommunitylaundry.herokuapp.com/api/products").then(res => {
            dispatch({
                type: FETCH_PRODUCTS,
                products: res.data
            })
        }
    )
);

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    product: product
});

export const deleteFromCart = (productID) => ({
    type: DELETE_FROM_CART,
    productID: productID
});

export const setUserToken = (userToken) => ({
    type: SET_USER_TOKEN,
    userToken: userToken
});

export const resetToken = () => ({
    type: RESET_USER_TOKEN,
});
