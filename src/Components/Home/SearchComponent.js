import React from 'react';
import {TextInput, View, StyleSheet, Image} from 'react-native';

const SearchComponent = ({data, cityInfo, setResultCityInfo}) => {
  const handleCityChange = e => {
    const filter = e.toLowerCase();

    if (filter.length === 0) {
      setResultCityInfo(cityInfo);
    } else {
      let qr = cityInfo.filter(c => {
        return c.cityName.toLowerCase().indexOf(filter) > -1;
      });
      setResultCityInfo(qr);
    }
  };
  return (
    <View style={styles.inputContainer}>
      <Image
        style={{height: 30, width: 30}}
        source={require('../../assets/searchIcon.png')}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="Search City"
        // value=""
        onChangeText={handleCityChange}
      />
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
});

export default SearchComponent;
