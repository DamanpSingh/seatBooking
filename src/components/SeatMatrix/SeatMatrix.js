import "./SeatMatrix.css";
import Seat from "../Seat/Seat";
import { useSelector, useDispatch } from "react-redux";
import { selectSeat } from "../../redux/actions/seatActions";
import { bookSeat } from "../../redux/actions/seatBookingActions";
import { useState } from "react";



const SeatMatrix = () => {
    const { seatsDetail } = useSelector((state) => state.seats);
    const { bookedSeats } = useSelector((state) => state);
    const dispatch = useDispatch();
    //Local state for seat group restrictions
    const [selectedGroupId, setSelectedGropuId] = useState(null);

    const selectSeatsHandler = (currSeatsDetail, currBookedSeats, currSeatIndex, rowID, groupID, seatPrice, rowSize) => {
        let newSeatsDeatil = { ...currSeatsDetail };
        const newBookedSeats = { ...currBookedSeats };
        newSeatsDeatil.seatGroups[groupID].rows[rowID][currSeatIndex] = {
            ...newSeatsDeatil.seatGroups[groupID].rows[rowID][currSeatIndex],
            status: "selected"
        }
        let selectedPrice = seatPrice;
        if (newSeatsDeatil.seatGroups[groupID].rows[rowID][currSeatIndex].specialChargePercentage) {
            selectedPrice += (seatPrice * newSeatsDeatil.seatGroups[groupID].rows[rowID][currSeatIndex].specialChargePercentage) / 100;
        }
        // Select the adjacent Right seats, if available
        let autoSelectedSeats = 0;
        let autoSelectedPrice = 0;
        let autoSelectionSeatsRequirement = newBookedSeats.requiredSeats - (newBookedSeats.noOfSeatsBooked + 1);
        if ((rowSize - (currSeatIndex)) > autoSelectionSeatsRequirement) {
            for (let seatIndex = currSeatIndex + 1; seatIndex <= currSeatIndex + autoSelectionSeatsRequirement; seatIndex++) {
                if (newSeatsDeatil.seatGroups[groupID].rows[rowID][seatIndex].status !== 'available') {
                    break;
                } else {
                    autoSelectedSeats++;
                    autoSelectedPrice += seatPrice;
                    if (newSeatsDeatil.seatGroups[groupID].rows[rowID][seatIndex].specialChargePercentage) {
                        autoSelectedPrice += (seatPrice * newSeatsDeatil.seatGroups[groupID].rows[rowID][seatIndex].specialChargePercentage) / 100;
                    }
                    newSeatsDeatil.seatGroups[groupID].rows[rowID][seatIndex] = {
                        ...newSeatsDeatil.seatGroups[groupID].rows[rowID][seatIndex],
                        status: "selected"
                    }
                }
            }
        }
        newBookedSeats.noOfSeatsBooked = newBookedSeats.noOfSeatsBooked + autoSelectedSeats + 1;
        newBookedSeats.totalAmmount = newBookedSeats.totalAmmount + selectedPrice + autoSelectedPrice;
        return { seatsDetail: newSeatsDeatil, bookedSeats: newBookedSeats };
    }
    const unSelectSeatsHandler = (currSeatsDetail, currBookedSeats) => {
        const newSeatsDeatil = { ...currSeatsDetail };
        Object.keys(newSeatsDeatil.seatGroups).forEach(groupID => {
            Object.keys(newSeatsDeatil.seatGroups[groupID].rows).forEach(rowID => {
                newSeatsDeatil.seatGroups[groupID].rows[rowID].forEach(seat => {
                    if (seat.status === "selected") seat.status = "available";
                })
            })
        })
        const newBookedSeats = { ...currBookedSeats };
        newBookedSeats.noOfSeatsBooked = 0;
        newBookedSeats.totalAmmount = 0;
        return { seatsDetail: newSeatsDeatil, bookedSeats: newBookedSeats };

    }
    const getSelectionGroup = (groupId) => {
        if (!selectedGroupId) {
            setSelectedGropuId(groupId);
            return groupId;
        } else if (selectedGroupId !== groupId) {
            setSelectedGropuId(groupId);
            return selectedGroupId;
        }
        else return selectedGroupId;
    }

    const seatHandler = (status, seatIndex, rowID, groupID, seatPrice, rowSize) => {
        if (status === 'occupied') return;
        // get the currently selected group
        const currGroup = getSelectionGroup(groupID);
        if (currGroup !== groupID || bookedSeats.noOfSeatsBooked === bookedSeats.requiredSeats) {
            let currSeatStatus = unSelectSeatsHandler(seatsDetail, bookedSeats);
            currSeatStatus = selectSeatsHandler(currSeatStatus.seatsDetail, currSeatStatus.bookedSeats, seatIndex, rowID, groupID, seatPrice, rowSize);
            dispatch(selectSeat(currSeatStatus.seatsDetail));
            dispatch(bookSeat(currSeatStatus.bookedSeats));
        }
        else if (status === "available") {
            let currSeatStatus = selectSeatsHandler(seatsDetail, bookedSeats, seatIndex, rowID, groupID, seatPrice, rowSize);
            dispatch(selectSeat(currSeatStatus.seatsDetail));
            dispatch(bookSeat(currSeatStatus.bookedSeats));
        }
        else return null;
    }

    const renderSeats = <div className="seatMatrix">{
        Object.keys(seatsDetail.seatGroups).map((groupID, index) => {
            const group = seatsDetail.seatGroups[groupID];
            return (
                <div className="seatGroup" key={index}>
                    <div className="groupDesc" >{group.groupName}-Rs {group.seatPrice}</div>
                    <div className="rows" >
                        {
                            Object.keys(group.rows).map((row, index) => {
                                return (<div className="seatsRow" key={index}>
                                    <div className="rowName">{row}</div>{
                                        group.rows[row].map((seat, index) => {
                                            return (
                                                <div onClick={() => seatHandler(seat.status, index, row, groupID, group.seatPrice, group.rows[row].length)}
                                                    key={index}>
                                                    <Seat
                                                        status={(index === group.rows[row].length / 2) ? `${seat.status} midSeat` : seat.status}
                                                        restricted={selectedGroupId !== groupID && selectedGroupId}
                                                        seatNumber={seat.seatNumber}
                                                        extraCharges={seat.specialChargePercentage}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            )

        })}
    </div>
    const renderFooter = <div className="bookingFooter">
        <button className="payButton">Pay {bookedSeats.totalAmmount}</button>
    </div>
    const seatsInfo = <div className="seatInfor">
        <div className="seatType">
            <Seat dummy={true} status="available" />
            <div className="seatDesc">Available</div>
        </div>
        <div className="seatType">
            <Seat dummy={true} status="selected" />
            <div className="seatDesc">Selected</div>
        </div>
        <div className="seatType">
            <Seat dummy={true} status="occupied" />
            <div className="seatDesc">Occupied</div>
        </div >
    </div >
    return (
        <div>
            <div className="bookingheader">
                <div className="movieName">{seatsDetail.movieName}</div>
                <div className="totalSelectedSeats">{bookedSeats.noOfSeatsBooked} Seat{bookedSeats.noOfSeatsBooked !== 1 && 's'} Selected</div>
            </div>
            {renderSeats}
            {(bookedSeats.requiredSeats === bookedSeats.noOfSeatsBooked) ? renderFooter : seatsInfo}
        </div>
    );
}

export default SeatMatrix;