import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productsReducer, newProductReducer, productDetailsReducer, productReducer, newReviewReducer, getMaxPriceReducer, productReviewsReducer, reviewReducer } from './redux/reducers/productReducer';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './redux/reducers/userReducer';
import { cartReducer } from './redux/reducers/cartReducer';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './redux/reducers/orderReducer';

const reducer = combineReducers({
    productsFromStore: productsReducer,
    maxPriceFromStore: getMaxPriceReducer,
    productReviewsFromStore: productReviewsReducer,
    reviewFromStore: reviewReducer,
    productDetailsFromStore: productDetailsReducer,
    newProductFromStore: newProductReducer,
    productFromStore: productReducer,
    authFromStore: authReducer,
    userFromStore: userReducer,
    allUsersFromStore: allUsersReducer,
    userDetailsFromStore: userDetailsReducer,
    forgotPasswordFromStore: forgotPasswordReducer,
    cartFromStore: cartReducer,
    newOrderFromStore: newOrderReducer,
    myOrdersFromStore: myOrdersReducer,
    orderDetailsFromStore: orderDetailsReducer,
    allOrdersFromStore: allOrdersReducer,
    orderFromStore: orderReducer,
    newReviewFromStore: newReviewReducer
});

let initialState = {
    cartFromStore: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
};

const middlewares = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;