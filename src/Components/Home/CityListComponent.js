import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Card from '../CardView/Card';
import CardSection from '../CardView/CardSection';
import Geolocation from '@react-native-community/geolocation';

const CityListComponent = props => {
  const {
    cityList,
    navigation,
    favoriteCities,
    onAddFavoriteCity,
    onRemoveFavoriteCity,
  } = props;

  const [currentLongitude, setLongitude] = useState('...');
  const [currentLatitude, setLatitude] = useState('...');

  const getDistance = (lon1, lat1) => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        setLongitude(JSON.stringify(position.coords.longitude));

        //getting the Latitude from the location json
        setLatitude(JSON.stringify(position.coords.latitude));
      },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );

    let lat2 = currentLatitude;
    let lon2 = currentLongitude;

    // console.log(
    //   'lat1: ' + lat1 + 'lan1: ' + lon1 + 'lat2: ' + lat2 + 'lon2: ' + lon2,
    // );

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };
  // Converts numeric degrees to radians
  function deg2rad(Value) {
    return (Value * Math.PI) / 180;
  }

  const getTemp = kelvin => {
    return kelvin - 273.15;
  };

  const getIconURL = cityName => {
    if (favoriteCities.includes(cityName)) {
      return require('../../assets/favourite.png');
    } else {
      return require('../../assets/unfavourite.png');
    }
  };

  return (
    <View>
      <FlatList
        data={props.cityList}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('hello');
                props.navigation.navigate('CityDetail', item);
              }}>
              <Card>
                <CardSection>
                  <ImageBackground
                    source={{
                      uri: item.image,
                    }}
                    style={styles.image}>
                    <View style={styles.imageTextContainer}>
                      <View>
                        <Text style={styles.text}>{item.cityName}</Text>
                        <Text>
                          Temp: {getTemp(item.weatherInfo.main.temp).toFixed(1)}
                          °C
                        </Text>
                        <Text>
                          Dist:
                          {getDistance(
                            item.weatherInfo.coord.lon,
                            item.weatherInfo.coord.lat,
                          ).toFixed(1)}{' '}
                          km
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={e => {
                          if (!favoriteCities.includes(item.cityName)) {
                            onAddFavoriteCity(item.cityName);
                          } else {
                            onRemoveFavoriteCity(item.cityName);
                          }
                        }}>
                        <Image
                          style={{height: 50, width: 50}}
                          source={getIconURL(item.cityName)}></Image>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </CardSection>
                <CardSection>
                  <Text>{item.cityDesc}</Text>
                </CardSection>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
    height: 200,
    width: 350,
  },
  text: {
    fontSize: 30,
  },
  viewContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
  },
  imageTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CityListComponent;
