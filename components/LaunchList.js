import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

const propTypes = {
  name: PropTypes.string,
  windowstart: PropTypes.string,
  agencies: PropTypes.array,
  location: PropTypes.object,
  rocket: PropTypes.object,
  favoritesLaunchIcon: PropTypes.object
}

const LaunchList = ({ name, windowstart, agencies, location, rocket, favoritesLaunchIcon }) => {
  const imageURL = rocket.imageURL.replace(/[0-9]{3,4}\./, '320.')
  return (
    <View style={styles.launchInfoContainer}>
      <View style={styles.launchInfo}>
        <Text><Text style={styles.launchInfoText}>Launch:</Text> {name}</Text>
        <Text><Text style={styles.launchInfoText}>Start Time:</Text> {windowstart}</Text>
        <Text><Text style={styles.launchInfoText}>Rocket:</Text> {rocket.name}</Text>
        <Text><Text style={styles.launchInfoText}>Agencies:</Text> {agencies.map(agency => agency.name).join(', ')}</Text>
        <Text><Text style={styles.launchInfoText}>Location:</Text> {location.name}</Text>
        <View style={styles.icon}>{favoritesLaunchIcon}</View>
      </View>
      <Image style={styles.image} source={{uri: imageURL}}/>
    </View>
  );
};

LaunchList.propTypes = propTypes;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  launchInfoContainer: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 20
  },
  launchInfo: {
    paddingVertical: 15,
    paddingLeft: 10,
    paddingRight: 40,
  },
  image: {
    height: height/2,
  },
  launchInfoText: {
    fontWeight: 'bold'
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 5,
    marginRight: 10
  }
})

export default LaunchList;