import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import { connect } from "react-redux";

import LaunchList from "../components/LaunchList";
import * as actions from "../actions/LaunchActions";
import { white, blue } from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

class Favorites extends Component {
  static propTypes = {
    favorites: PropTypes.object,
    err: PropTypes.string,
    navigation: PropTypes.object,
    getFavoriteLaunches: PropTypes.func,
    removeLaunch: PropTypes.func,
  }

  static navigationOptions = ({ navigation }) => 
    ({
      title: navigation.state.routeName,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: {
        color: white,
        alignSelf: 'center',
        fontSize: 24,
      }
    })
  componentDidMount() {
    const { getFavoriteLaunches } = this.props;
    getFavoriteLaunches();
  }

  renderFavoritesList = ({ id, name, windowstart, location, rocket }) => {
    const { navigation, removeLaunch } = this.props;
    return (
      <LaunchList
        key={id}
        name={name}
        windowstart={windowstart}
        agencies={rocket.agencies}
        location={location}
        rocket={rocket}
        navigation={navigation.navigate}
        favoritesLaunchIcon={<Ionicons name='md-close' size={40} onPress={() => removeLaunch(id)}/>}
      />
    );
  };

  render() {
    const { favorites } = this.props;
    const favoritesArr = Object.values(favorites)
    return (
      <View style={styles.favoritesContainer}>
        <ScrollView>
          {favoritesArr.map(favorites => this.renderFavoritesList(favorites))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favoritesContainer: {
    flex: 1,
    backgroundColor: white
  },
})

const mapStateToProps = ({ favorites }) => ({ favorites });

export default connect(mapStateToProps, actions)(Favorites);