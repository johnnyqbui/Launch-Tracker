import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";
import DatePicker from "react-native-datepicker";
import { blue, white } from "../utils/colors";

const propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onDateChange: PropTypes.func
};

const SearchPanel = ({ startDate, endDate, onDateChange }) => {
  const startdate = "startdate";
  const enddate = "enddate";

  return (
    <View style={styles.dateSearchContainer}>
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerText}>Start: </Text>
        <DatePicker
          style={styles.datePicker}
          date={startDate}
          mode="date"
          format="YYYY-MM-DD"
          showIcon={true}
          customStyles={{
            dateInput: {
              alignItems: "flex-start",
              padding: 5,
              borderRadius: 5,
              backgroundColor: white
            }
          }}
          cancelBtnText={"Cancel"}
          confirmBtnText={"Confirm"}
          onDateChange={startDate => onDateChange(startDate, endDate, startdate)}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerText}>End: </Text>
        <DatePicker
          style={styles.datePicker}
          date={endDate}
          mode="date"
          format="YYYY-MM-DD"
          showIcon={true}
          customStyles={{
            dateInput: {
              alignItems: "flex-start",
              padding: 5,
              borderRadius: 5,
              backgroundColor: white
            }
          }}
          minDate={startDate}
          cancelBtnText={"Cancel"}
          confirmBtnText={"Confirm"}
          onDateChange={endDate => onDateChange(startDate, endDate, enddate)}
        />
      </View>
    </View>
  );
};

SearchPanel.propTypes = propTypes;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  dateSearchContainer: {
    paddingVertical: 10,
    backgroundColor: blue
  },
  datePickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 5
  },
  datePickerText: {
    color: white
  },
  datePicker: {
    width: width - 60,
    margin: 5,
    justifyContent: "flex-end"
  }
});

export default SearchPanel;