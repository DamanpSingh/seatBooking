import { ActionTypes } from "../constants/action-types";
const intialState = {
  requiredSeats: 0,
  noOfSeatsBooked: 0,
  totalAmmount: 0
};

export const seatBookingReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_REQUIREDSEATS:
      return {
        ...state,
        requiredSeats: payload.requiredSeats
      };
    case ActionTypes.BOOK_SEAT:
      return {
        ...state,
        noOfSeatsBooked: payload.noOfSeatsBooked,
        totalAmmount: payload.totalAmmount
      };
    case ActionTypes.UNBOOK_SEAT:
      return {
        ...state,
        noOfSeatsBooked: payload.noOfSeatsBooked,
        totalAmmount: payload.totalAmmount
      };
    default:
      return state;
  }
};
