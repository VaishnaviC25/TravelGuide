import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PlacesList from './PlacesList';

const CityDetail = props => {
  const {
    route,
    favoriteCities,
    onAddFavoriteCity,
    onRemoveFavoriteCity,
  } = props;

  // console.log('citydetail' + JSON.stringify(route.params));

  const [selectedCity, setSelectedCity] = useState({});

  useEffect(() => {
    setSelectedCity(route.params);
  }, [route]);

  const getIconURL = cityName => {
    if (favoriteCities.includes(cityName)) {
      return require('../../assets/favourite.png');
    } else {
      return require('../../assets/unfavourite.png');
    }
  };

  if (Object.keys(selectedCity).length !== 0) {
    return (
      <View>
        <View style={styles.headingContainer}>
          <Text style={{fontSize: 40, marginLeft: 10}}>
            {selectedCity.cityName}
          </Text>
          <TouchableOpacity
            onPress={e => {
              if (!favoriteCities.includes(selectedCity.cityName)) {
                onAddFavoriteCity(selectedCity.cityName);
              } else {
                onRemoveFavoriteCity(selectedCity.cityName);
              }
            }}>
            <Image
              style={{height: 40, width: 40, marginRight: 10}}
              source={getIconURL(selectedCity.cityName)}></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
          <Image
            style={{height: 250, width: 380}}
            source={{
              uri:
                'https://images1.livehindustan.com/uploadimage/library/2018/10/07/16_9/16_9_1/google_map_Symbolic_Image__1538892270.jpg',
            }}></Image>
        </View>
        {/* conditional rendering */}
        <PlacesList places={selectedCity.places} />
      </View>
    );
  } else {
    return <Text>loaging</Text>;
  }
};

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mapContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    margin: 5,
    alignItems: 'stretch',
  },
});

export default CityDetail;
