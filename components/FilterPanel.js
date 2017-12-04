import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { blue, white } from "../utils/colors";
import { deDupeAndFlattenArr } from "../utils/helpers";

const FilterPanel = ({ initialFetchedLaunches, selectedFilter, onFilter, closeModal }) => {
  // Dedupe and flatten arrays
  const abbrev = "abbrev";
  const countryCode = "countryCode";
  const agencyAbbrevList = deDupeAndFlattenArr(initialFetchedLaunches, abbrev);
  const countryCodeList = deDupeAndFlattenArr(initialFetchedLaunches,countryCode);
  return (
    <View style={styles.filterPanelContainer}>
      <Text style={styles.title}>Filters</Text>
      <View style={styles.filterListsContainer}>
        <View style={styles.listContainer}>
          <View style={styles.filterTypeTitle}>
            <Text style={styles.filterText}>Agency: </Text>
          </View>
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
        </View>
        <View style={styles.listContainer}>
          <View style={styles.filterTypeTitle}>
            <Text style={styles.filterText}>Country: </Text>
          </View>
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

FilterPanel.propTypes = {
  initialFetchedLaunches: PropTypes.array,
  selectedFilter: PropTypes.string, 
  onFilter: PropTypes.func, 
  closeModal: PropTypes.func
}

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
    borderBottomWidth: 1,
    borderBottomColor: white
  },
  filterListsContainer: {
    paddingLeft: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  listContainer: {
    flex: 1
  },
  filterTypeTitle: {
    marginRight: 30,
    padding: 5,
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
    paddingVertical: 10,
    paddingRight: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center"
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

export default FilterPanel;