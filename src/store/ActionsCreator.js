import {Actions} from './ActionsType';

export const onAddFavoriteCity = city => dispatch => {
  dispatch(addFavoriteCity(city));
};

export const onRemoveFavoriteCity = city => dispatch => {
  dispatch(removeFavoriteCity(city));
};

export const addFavoriteCity = city => ({
  type: Actions.ADD_FAVORITE_CITY,
  payload: city,
});

export const removeFavoriteCity = city => ({
  type: Actions.REMOVE_FAVORITE_CITY,
  payload: city,
});
