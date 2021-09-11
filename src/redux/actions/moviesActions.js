import { ActionTypes } from "../constants/action-types";

export const setMovies = (moviesList) => {
  return {
    type: ActionTypes.SET_MOVIES,
    payload: moviesList,
  };
};
