import React from 'react';
import type {Node} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import MainComponent from './src/Components/MainComponent';
import {configureStore} from './src/store/configureStore';

const store = configureStore();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainComponent />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
