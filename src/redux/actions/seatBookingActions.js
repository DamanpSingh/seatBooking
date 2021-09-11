import { ActionTypes } from "../constants/action-types";

export const setRequiredSeats = (seats) => {
  return {
    type: ActionTypes.SET_REQUIREDSEATS,
    payload: seats,
  };
};

export const bookSeat = (seat) => {
  return {
    type: ActionTypes.BOOK_SEAT,
    payload: seat,
  };
};

export const unBookSeat = (seat) => {
  return {
    type: ActionTypes.UNBOOK_SEAT,
    payload: seat,
  };
};
