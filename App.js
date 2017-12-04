import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store';
import { Constants } from 'expo';
import { rootNavigator } from "./routes";

const FlashCardsStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  render() {
    const Layout = rootNavigator();
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar 
            backgroundColor="white"
            barStyle="dark-content"
          />
          <Layout />
        </View>
      </Provider>
    );
  }
}