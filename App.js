import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {getPersistor} from '@rematch/persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import colors from './src/assets/color';
import AppRouter from './src/navigations';

const persistor = getPersistor();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.Container}>
          <StatusBar backgroundColor={colors.primary} />
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
          <Toast ref={ref => Toast.setRef(ref)} />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default App;
