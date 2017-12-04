import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { Constants } from "expo";
import Search from "./screens/Search";
import Favorites from "./screens/Favorites";
import { purple, darkPurp, blue, lightBlue } from "./utils/colors";

const Tabs = TabNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
        tabBarLabel: "Search",
        tabBarIcon: () => <Ionicons name="ios-search" size={26} color={"#fff"} />
      }
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        tabBarLabel: "Favorites",
        tabBarIcon: () => <Ionicons name="ios-star" size={26} color={"#fff"} />
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: lightBlue,
      labelStyle: {
        fontSize: 12,
        color: "#fff"
      },
      showIcon: true,
      showLabel: true,
      style: {
        height: Platform.OS === 'ios' ? 50 : 56,
        backgroundColor: blue
      }
    }
  }
);

export const rootNavigator = () => {
  return StackNavigator({
    Home: {
      screen: Tabs
    }
  });
};