import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fakeAPI from "../../fakeAPI/getSeatsDeatailByMovie";
import { setSeats } from "../../redux/actions/seatActions";
import SeatMatrix from "../../components/SeatMatrix/SeatMatrix";
import RequiredSeats from "../../components/RequiredSeats/RequiredSeats";

const Booking = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const { bookedSeats } = useSelector((state) => state);

    //get list of Movies
    const fetchSeats = () => {
        const response = fakeAPI.getSeatsDeatailByMovie[movieId];
        dispatch(setSeats(response));
    }

    useEffect(() => {
        fetchSeats();
    }, []);

    return (
        <>{(bookedSeats.requiredSeats) ? <SeatMatrix /> : <RequiredSeats />}</>
    )
}

export default Booking;