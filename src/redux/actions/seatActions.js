import { ActionTypes } from "../constants/action-types";

export const setSeats = (seats) => {
  return {
    type: ActionTypes.SET_SEATS,
    payload: seats,
  };
};

export const selectSeat = (seats) => {
  return {
    type: ActionTypes.SELECT_SEAT,
    payload: seats,
  };
};

export const unSelectSeat = (seats) => {
  return {
    type: ActionTypes.UNSELECT_SEAT,
    payload: seats,
  };
};
