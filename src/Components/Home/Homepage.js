import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  searchIcon,
  Text,
} from 'react-native';
import axios from 'axios';
import CityListComponent from './CityListComponent';
import {cityList} from '../../Shared/cityList';
import {getApiURL} from '../../Shared/apiURL';
import SearchComponent from './SearchComponent';

const HomePage = props => {
  const {
    navigation,
    favoriteCities,
    onAddFavoriteCity,
    onRemoveFavoriteCity,
  } = props;

  const [cityName, setCityName] = useState('');
  const [cityInfo, setCityInfo] = useState();
  const [resultCityInfo, setResultCityInfo] = useState();

  useEffect(() => {
    if (!cityInfo) {
      let axiosInstances = [];
      let cityInfoTemp = [];
      for (let city of cityList) {
        let c = {...city};
        axiosInstances.push(axios.get(getApiURL(city.cityName)));
        cityInfoTemp.push(c);
      }
      axios
        .all(axiosInstances)
        .then(responseArr => {
          for (let i = 0; i < responseArr.length; i++) {
            cityInfoTemp[i].weatherInfo = {...responseArr[i].data};
          }

          setCityInfo(cityInfoTemp);
          setResultCityInfo(cityInfoTemp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [cityInfo]);

  const data = {};

  return (
    <View>
      <SearchComponent
        data={data}
        cityInfo={cityInfo}
        setResultCityInfo={setResultCityInfo}
      />

      {/* <View
        style={styles.viewContainer}
        onStartShouldSetResponder={() =>
          navigation.navigate('CityDetail', {name: 'Jane'})
        }></View> */}

      <CityListComponent
        cityList={resultCityInfo}
        navigation={navigation}
        favoriteCities={favoriteCities}
        onAddFavoriteCity={onAddFavoriteCity}
        onRemoveFavoriteCity={onRemoveFavoriteCity}
      />
      {/* <CityListComponent data={data} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingLeft: 10,
    margin: 15,
    borderColor: 'black',
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: '#dcdcdc',
    height: 40,
  },
  input: {
    marginLeft: 5,
  },
  searchIcon: {
    padding: 10,
  },
  viewContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
  },
});

export default HomePage;
