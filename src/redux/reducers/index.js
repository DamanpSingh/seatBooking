import { combineReducers } from "redux";
import {moviesReducer} from "./moviesReducer";
import {seatsReducer} from "./seatsReducer";
import {seatBookingReducer} from "./seatBookingReducer"

const reducers = combineReducers({
  movies: moviesReducer,
  seats: seatsReducer,
  bookedSeats: seatBookingReducer
});
export default reducers;
