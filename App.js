import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import NavigatorContainer from './navigation/NavigationContainer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigatorContainer />
    </Provider>
  );
}
