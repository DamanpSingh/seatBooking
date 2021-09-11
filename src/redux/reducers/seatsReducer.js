import { ActionTypes } from "../constants/action-types";
const intialState = {
  seatsDetail: {
    seatGroups: []
  },
};

export const seatsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SEATS:
      return {
        ...state,
        seatsDetail: payload
      };
    case ActionTypes.SELECT_SEAT:
      return {
        ...state,
        seatsDetail: { ...payload }
      };
    case ActionTypes.UNSELECT_SEAT:
      return {
        ...state,
        seatsDetail: { ...payload }
      };
    default:
      return state;
  }
};
