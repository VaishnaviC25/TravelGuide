import React from 'react';

import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './Home/Homepage';
import CityDetail from './CityDetail/CityDetail';
import {onAddFavoriteCity, onRemoveFavoriteCity} from '../store/ActionsCreator';

const Stack = createStackNavigator();

const MyStack = props => {
  const {favoriteCities, onAddFavoriteCity, onRemoveFavoriteCity} = props;
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{title: 'City Guide'}}>
        {props => (
          <HomePage
            {...props}
            favoriteCities={favoriteCities}
            onAddFavoriteCity={onAddFavoriteCity}
            onRemoveFavoriteCity={onRemoveFavoriteCity}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CityDetail" options={{title: 'City Detail'}}>
        {props => (
          <CityDetail
            {...props}
            favoriteCities={favoriteCities}
            onAddFavoriteCity={onAddFavoriteCity}
            onRemoveFavoriteCity={onRemoveFavoriteCity}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    favoriteCities: state.favorites.cities,
  };
};

const mapDispatchToProps = {
  onAddFavoriteCity: onAddFavoriteCity,
  onRemoveFavoriteCity: onRemoveFavoriteCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyStack);
