import {Actions} from './ActionsType';

const initialState = {
  cities: [],
};

export default favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_FAVORITE_CITY:
      return {...state, cities: [...state.cities, action.payload]};
    case Actions.REMOVE_FAVORITE_CITY:
      let c = state.cities.filter(c => c !== action.payload);
      return {...state, cities: c};
    default:
      return state;
  }
};
