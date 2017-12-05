import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import moment from "moment";
import LaunchList from "../components/LaunchList";
import SearchPanel from "../components/SearchPanel";
import FilterPanel from "../components/FilterPanel";
import * as actions from "../actions/LaunchActions";
import { blue, white, gray, darkGray } from "../utils/colors";

class Search extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    initialFetchedLaunches: PropTypes.array,
    launches: PropTypes.array,
    favorites: PropTypes.object,
    err: PropTypes.string,
    navigation: PropTypes.object,
    getNextLaunches: PropTypes.func,
    searchLaunches: PropTypes.func,
    saveLaunch: PropTypes.func,
    removeLaunch: PropTypes.func,
    filterLaunches: PropTypes.func
  };

  state = {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    selectedFilter: "",
    refreshing: false,
    isFilterModalVisible: false
  };

  componentDidMount() {
    const { getNextLaunches } = this.props;
    getNextLaunches();
  }

  handleDateChange = (startDate, endDate, options) => {
    const { searchLaunches } = this.props;
    options === "startdate"
      ? this.setState({
          startDate,
          endDate: startDate,
          selectedFilter: ""
        })
      : this.setState({ 
          endDate, 
          selectedFilter: "" 
        });
    searchLaunches(startDate, endDate);
  };

  handleFilter = value => {
    const { filterLaunches } = this.props;
    filterLaunches(value);
    this.setState({
      selectedFilter: value
    });
  };

  handleRefresh = () => {
    const { getNextLaunches } = this.props;
    getNextLaunches();
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.setState({
          refreshing: false,
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD"),
          selectedFilter: ""
        });
      }
    );
  };

  renderLaunchList = launch => {
    const { navigation, saveLaunch, removeLaunch, favorites } = this.props;
    const { id, name, windowstart, location, rocket } = launch;
    const matchedFavorite = Object.keys(favorites).find(
      favoriteId => parseInt(favoriteId) === id
    );
    return (
      <LaunchList
        key={id}
        name={name}
        windowstart={windowstart}
        agencies={rocket.agencies}
        location={location}
        rocket={rocket}
        navigation={navigation.navigate}
        favoritesLaunchIcon={
          matchedFavorite ? (
            <Ionicons
              name="ios-star"
              size={35}
              onPress={() => removeLaunch(id)}
            />
          ) : (
            <Ionicons
              name="ios-star-outline"
              size={35}
              onPress={() => saveLaunch(launch)}
            />
          )
        }
      />
    );
  };

  render() {
    const {
      isFetching,
      initialFetchedLaunches,
      launches,
      favorites,
      err,
      searchLaunches,
      filterLaunches,
      handleDateChange
    } = this.props;
    const {
      startDate,
      endDate,
      selectedFilter,
      refreshing,
      isFilterModalVisible
    } = this.state;

    return (
      <View style={styles.container}>
        <SearchPanel
          onDateChange={this.handleDateChange}
          startDate={startDate}
          endDate={endDate}
        />
        <View style={styles.buttonContainer}>
          <Button
            icon={{ name: "sliders", type: "font-awesome" }}
            title="Filters"
            buttonStyle={styles.button}
            borderRadius={5}
            backgroundColor={blue}
            onPress={() => this.setState({
              isFilterModalVisible: true
            })}/>
        </View>
        <Modal
          isVisible={isFilterModalVisible}
          backdropOpacity={0.7}
          onBackdropPress={() =>
            this.setState({
              isFilterModalVisible: false
            })}>
          <FilterPanel
            selectedFilter={selectedFilter}
            onFilter={this.handleFilter}
            closeModal={() => this.setState({ 
                isFilterModalVisible: false 
            })}/>
        </Modal>
        {isFetching ? (
          <ActivityIndicator style={{ margin: 40 }} size={"large"} />
        ) : (
          <View style={styles.launchListContainer}>
            <ScrollView refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.handleRefresh}
                />
              }>
              <Text style={styles.refreshText}>
                Pull Down to refresh next 10 Launches
              </Text>
              {launches.map(launch => this.renderLaunchList(launch))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  buttonContainer: {
    alignItems: "flex-start",
    paddingVertical: 10,
    backgroundColor: gray
  },
  button: {
    width: width / 3
  },
  searchModal: {
    justifyContent: "flex-end",
    margin: 0,
    width
  },
  launchListContainer: {
    flex: 1,
    backgroundColor: white
  },
  refreshText: {
    textAlign: "center",
    paddingTop: 15,
    color: darkGray
  }
});

const mapStateToProps = ({
  isFetching,
  initialFetchedLaunches,
  launches,
  favorites,
  err
}) => ({
  isFetching,
  initialFetchedLaunches,
  launches,
  favorites,
  err
});

export default connect(mapStateToProps, actions)(Search);