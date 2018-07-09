import { FETCH_PRODUCTS, ADD_TO_CART, DELETE_FROM_CART, SET_USER_TOKEN, RESET_USER_TOKEN } from '../actions/types';

const initialState = {
    products: [],
    cart: [],
    userToken: undefined
};

export default (state = initialState, action) => {

    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.product]
            }

        case DELETE_FROM_CART:
            {
                var newCart = state.cart.map(elm=>{
                    if(elm._id !== action.productID){
                        return elm;
                    }
                });
                newCart = newCart.filter(elm=> elm != undefined);
                
                return {
                ...state,
                cart: newCart
            }}
        
        case SET_USER_TOKEN:
            return {
                ...state,
                userToken: action.userToken
            }

        case RESET_USER_TOKEN:
            return {
                ...state,
                userToken: undefined
            }
        default:
            return state;
    }
}