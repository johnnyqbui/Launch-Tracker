import * as RocketLaunchApi from "../utils/RocketLaunchApi";
import {
	FETCH_NEXT_LAUNCHES_REQUEST,
	FETCH_NEXT_LAUNCHES_SUCCESS,
	FETCH_NEXT_LAUNCHES_FAIL,
	SEARCH_LAUNCHES,
	FILTER_LAUNCHES,
	GET_FAVORITE_LAUNCHES,
	SAVE_LAUNCH,
	REMOVE_LAUNCH
} from "./types";

import { AsyncStorage } from "react-native";
const LAUNCH_TRACKER_STORAGE_KEY = "Launchtracker:key";

export const getNextLaunches = () => dispatch => {
	dispatch({
		type: FETCH_NEXT_LAUNCHES_REQUEST
	});
	RocketLaunchApi.getNextLaunches().then(results => {
		results.status === "error"
			? dispatch({
					type: FETCH_NEXT_LAUNCHES_FAIL,
					err: results
				})
			: dispatch({
					type: FETCH_NEXT_LAUNCHES_SUCCESS,
					...results
				});
	});
};

export const searchLaunches = (startDate, endDate) => dispatch => {
	return RocketLaunchApi.searchLaunches(startDate, endDate).then(launches =>
		dispatch({
			type: SEARCH_LAUNCHES,
			...launches
		})
	);
};

export const filterLaunches = value => dispatch => {
	dispatch({
		type: FILTER_LAUNCHES,
		value
	});
};

export const getFavoriteLaunches = () => dispatch => {
	return RocketLaunchApi.getFavoriteLaunches().then(launches =>
		dispatch({
			type: GET_FAVORITE_LAUNCHES,
			launches
		})
	);
};

export const saveLaunch = launchInfo => dispatch => {
	return RocketLaunchApi.saveLaunch(launchInfo).then(launch => {
		dispatch({
			type: SAVE_LAUNCH,
			launch
		});
	});
};

export const removeLaunch = id => dispatch => {
	return RocketLaunchApi.removeLaunch(id).then(launches =>
		dispatch({
			type: REMOVE_LAUNCH,
			launches
		})
	);
};