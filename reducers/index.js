import {
  FETCH_NEXT_LAUNCHES_REQUEST,
  FETCH_NEXT_LAUNCHES_SUCCESS,
  FETCH_NEXT_LAUNCHES_FAIL,
  SEARCH_LAUNCHES,
  FILTER_LAUNCHES,
  GET_FAVORITE_LAUNCHES,
  SAVE_LAUNCH,
  REMOVE_LAUNCH
} from "../actions/types";

const launchDataState = {
  isFetching: false,
  initialFetchedLaunches: [],
  launches: [],
  favorites: {},
  err: ""
};

const launchData = (state = launchDataState, action) => {
  const { isFetching } = state;
  const { launches, launch, value, err } = action;
  switch (action.type) {
    case FETCH_NEXT_LAUNCHES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_NEXT_LAUNCHES_SUCCESS:
      return {
        ...state,
        initialFetchedLaunches: launches,
        launches,
        isFetching: false
      };
    case FETCH_NEXT_LAUNCHES_FAIL:
      return {
        ...state,
        isFetching: false,
        err
      };
    case SEARCH_LAUNCHES:
      return {
        ...state,
        initialFetchedLaunches: launches,
        launches
      };
    case FILTER_LAUNCHES:
      return {
        ...state,
        launches: state.initialFetchedLaunches.filter(launch =>
          launch.rocket.agencies.find(
            agency => agency.abbrev === value || agency.countryCode === value
          )
        )
      };
    case GET_FAVORITE_LAUNCHES:
      return {
        ...state,
        favorites: launches
      };
    case SAVE_LAUNCH:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [launch.id]: launch
        }
      };
    case REMOVE_LAUNCH:
      return {
        ...state,
        favorites: launches
      };
    default:
      return state;
  }
};

export default launchData;