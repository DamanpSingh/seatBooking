import "./Seat.css"

const Seat = (props) => {
    return <div className="wraper">
        {props.extraCharges && <span className="extra">+10%</span>}
        <div
            className={`seat ${props.status}${(props.restricted) ? ' restricted' : ''}`}
            title={(props.status === 'occupied') ? 'Seat already occupied' : (props.restricted) ? 'Select Seats from different Group' : ''}
        >{props.seatNumber}
        </div>
    </div>
}


export default Seat;