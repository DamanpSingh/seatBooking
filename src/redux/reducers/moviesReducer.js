import { ActionTypes } from "../constants/action-types";
const intialState = {
  moviesList: []
};

export const moviesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MOVIES:
      return { ...state,
        moviesList: payload };
    default:
      return state;
  }
};
