import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import Card from '../CardView/Card';
import openMap from 'react-native-open-maps';
import Geolocation from '@react-native-community/geolocation';
import ReadMore from 'react-native-read-more-text';

const imageRender = imageList => {
  const images = [];
  let c = 0;
  for (const imageurl of imageList) {
    images.push(
      <Image
        key={c}
        style={{height: 100, width: 100}}
        source={{
          uri: imageurl,
        }}></Image>,
    );
    c += 1;
  }
  return images;
};

const goToApp = (lat, lon) => {
  openMap({latitude: lat, longitude: lon});
};

const _renderTruncatedFooter = handlePress => {
  return (
    <Text style={{color: 'blue', marginTop: 5}} onPress={handlePress}>
      Read more
    </Text>
  );
};

const _renderRevealedFooter = handlePress => {
  return (
    <Text style={{color: 'blue', marginTop: 5}} onPress={handlePress}>
      Show less
    </Text>
  );
};

const _handleTextReady = () => {
  // ...
};

const PlacesList = ({places}) => {
  const [currentLatitude, setLatitude] = useState();
  const [currentLongitude, setLongitude] = useState();

  const getDistance = (lat1, lon1) => {
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

    console.log(
      'lat1: ' + lat1 + 'lan1: ' + lon1 + 'lat2: ' + lat2 + 'lon2: ' + lon2,
    );

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

  return (
    <FlatList
      horizontal
      data={places}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <Card>
            <View style={styles.cardContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.headingStyle}>{item.placeName}</Text>
                <Text style={styles.distContainer}>
                  {getDistance(
                    item.lat,
                    item.lon,
                    currentLatitude,
                    currentLongitude,
                  ).toFixed(1)}
                  km
                </Text>
              </View>

              <View style={styles.descStyle}>
                <ReadMore
                  numberOfLines={5}
                  renderTruncatedFooter={_renderTruncatedFooter}
                  renderRevealedFooter={_renderRevealedFooter}
                  onReady={_handleTextReady}>
                  <Text>{item.placeDesc}</Text>
                </ReadMore>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goToApp(item.lat, item.lon);
                  }}>
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Google Map</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Book Uber</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <ScrollView horizontal={true}>
                  {imageRender(item.image)}
                </ScrollView>
                {/* Cant use nested horizontal list inside horizontal list */}
                {/* <FlatList
                  data={item.image}
                  keyExtractor={item => item.keyImg}
                  renderItem={({item}) => {
                    return (
                      //   <Image
                      //     style={{height: 200, width: 200}}
                      //     source={{
                      //       uri:{item.url} }}></Image>
                      <Text>hellojvghvvyvghvgvh</Text>
                    );
                  }}
                /> */}
              </View>
            </View>
          </Card>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    width: 360,
  },
  headingStyle: {
    fontSize: 30,
    marginLeft: 10,
    marginTop: 10,
  },
  distContainer: {
    fontSize: 20,
    marginRight: 10,
    marginTop: 20,
  },
  descStyle: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    height: 40,
    width: 140,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    marginVertical: 5,
  },
});

export default PlacesList;
