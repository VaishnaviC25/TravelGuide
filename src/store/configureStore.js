import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import favoritesReducer from './favoritesReducer';

export const configureStore = () => {
  return createStore(
    combineReducers({
      favorites: favoritesReducer,
    }),
    applyMiddleware(thunk),
  );
};
