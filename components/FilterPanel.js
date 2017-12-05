import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { blue, white } from "../utils/colors";
import { deDupeAndFlattenArr } from "../utils/helpers";

const propTypes = {
  initialFetchedLaunches: PropTypes.array,
  selectedFilter: PropTypes.string,
  onFilter: PropTypes.func,
  closeModal: PropTypes.func
};

const FilterPanel = ({
  initialFetchedLaunches,
  selectedFilter,
  onFilter,
  closeModal
}) => {
  // Dedupe and flatten arrays
  const abbrev = "abbrev";
  const countryCode = "countryCode";
  const agencyAbbrevList = deDupeAndFlattenArr(initialFetchedLaunches, abbrev);
  const countryCodeList = deDupeAndFlattenArr(initialFetchedLaunches, countryCode);

  return (
    <View style={styles.filterPanelContainer}>
      <Text style={styles.title}>Filters</Text>
      <View style={styles.filterListsContainer}>
        <View style={styles.listContainer}>
          <View style={styles.filterTypeTitle}>
            <Text style={styles.filterText}>Agency: </Text>
          </View>
          <ScrollView>
          {agencyAbbrevList.map((agency, i) => (
            <TouchableWithoutFeedback key={i} onPress={() => onFilter(agency)}>
              <View style={styles.list}>
                <Text style={styles.text}>{agency}</Text>
                {selectedFilter === agency && (
                  <Ionicons name="ios-checkmark" size={26} color={white} />
                )}
              </View>
            </TouchableWithoutFeedback>
          ))}
          </ScrollView>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.filterTypeTitle}>
            <Text style={styles.filterText}>Country: </Text>
          </View>
          <ScrollView>
          {countryCodeList.map((country, i) => (
            <TouchableWithoutFeedback key={i} onPress={() => onFilter(country)}>
              <View style={styles.list}>
                <Text style={styles.text}>{country}</Text>
                {selectedFilter === country && (
                  <Ionicons name="ios-checkmark" size={26} color={white} />
                )}
              </View>
            </TouchableWithoutFeedback>
          ))}
          </ScrollView>
        </View>
      </View>
      <Button
        title="Close"
        borderRadius={5}
        backgroundColor={blue}
        containerViewStyle={styles.button}
        onPress={() => closeModal()}
      />
    </View>
  );
};

FilterPanel.propTypes = propTypes;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  filterPanelContainer: {
    backgroundColor: "rgba(50, 50, 50, .9)",
    borderRadius: 10,
    height: height / 1.25
  },
  title: {
    textAlign: "center",
    color: white,
    fontSize: 22,
    padding: 20,
  },
  filterListsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 70 
  },
  listContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 5
  },
  filterTypeTitle: {
    marginRight: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: white
  },
  filterText: {
    color: white,
    fontSize: 16
  },
  text: {
    color: white
  },
  list: {
    height: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: 'space-between',
    marginRight: 20
  },
  button: {
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 20
  }
});

const mapStateToProps = ({ initialFetchedLaunches }) => ({ initialFetchedLaunches });

export default connect(mapStateToProps, null)(FilterPanel);