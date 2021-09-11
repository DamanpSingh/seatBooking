import "./RequiredSeats.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRequiredSeats } from "../../redux/actions/seatBookingActions";

const RequiredSeats = () => {
    // Max values of required seats is 10
    const noOfSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [ selectedRequiredSeats, setSelectedRequiredSeats ] = useState(0);
    const dispatch = useDispatch();

    return (
        <div className="requiredSeatsSelector">
            <div> Select Required Number of Seats </div>
            <div className="seatOptions">
                {noOfSeats.map((no, index) => {
                    return (
                        <div
                            className={`selectNoOfSeats${(selectedRequiredSeats === no) ? ' selected' : ''}`}
                            onClick= {()=>setSelectedRequiredSeats(no)}
                            key= {index}
                        >
                            {no}
                        </div>
                    )
                })}
            </div>
            <button 
            className="seatSelect"
            onClick= {()=> {selectedRequiredSeats && dispatch(setRequiredSeats({"requiredSeats": selectedRequiredSeats}))}}
            >Select Seats</button>
        </div>
    );
}

export default RequiredSeats;