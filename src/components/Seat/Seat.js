import "./Seat.css"

const Seat = (props) => {
    return <div
        className={`seat ${props.status}${(props.restricted) ? ' restricted' : ''}`}
        title= {(props.status==='occupied')?'Seat already occupied':(props.restricted)?'Select Seats from different Group':''}
    >
        {props.seatNumber}
    </div>
}


export default Seat;