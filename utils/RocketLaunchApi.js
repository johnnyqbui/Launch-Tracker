import { AsyncStorage } from "react-native";
const LAUNCH_TRACKER_STORAGE_KEY = "Launchtracker:key";
const baseApi = "https://launchlibrary.net/1.2/launch";

export const getNextLaunches = () =>
  fetch(`${baseApi}/next/10`)
    .then(res => res.json())
    .catch(err => err);

export const searchLaunches = (startDate, endDate) =>
  fetch(`${baseApi}/${startDate}/${endDate}`)
    .then(res => res.json())
    .catch(err => err);

// Local Storage
export const getFavoriteLaunches = () => {
  return AsyncStorage.getItem(LAUNCH_TRACKER_STORAGE_KEY).then(results => {
    if (results) {
      return JSON.parse(results);
    } else {
      const favoritesData = {};
      AsyncStorage.setItem(
        LAUNCH_TRACKER_STORAGE_KEY,
        JSON.stringify(favoritesData)
      );
      return favoritesData;
    }
  });
};

export const saveLaunch = launchInfo => {
  return AsyncStorage.getItem(LAUNCH_TRACKER_STORAGE_KEY).then(results => {
    const launches = JSON.parse(results);
    const newLaunches = {
      ...launches,
      [launchInfo.id]: launchInfo
    };
    AsyncStorage.setItem(
      LAUNCH_TRACKER_STORAGE_KEY,
      JSON.stringify(newLaunches)
    );
    return newLaunches[launchInfo.id];
  });
};

export const removeLaunch = id => {
  return AsyncStorage.getItem(LAUNCH_TRACKER_STORAGE_KEY).then(results => {
    const launches = JSON.parse(results);
    launches[id] = undefined;
    delete launches[id];
    AsyncStorage.setItem(LAUNCH_TRACKER_STORAGE_KEY, JSON.stringify(launches));
    return launches;
  });
};