import React, { useContext } from 'react'
import { BookingContext } from '../contexts/BookingProvider';


const BookingItem = ({ booker, startTime, endTime, day }) => {

    const { addBooking, moveBooking, removeBooking, currentUser } = useContext(BookingContext);

    const isCurrentUserBooking = booker?.user.id === currentUser.id;

    return (
        <div className="booking-item">
            <span className="time-slot">
                {startTime} - {endTime}
            </span>
            {booker ?
                <>
                    <span className="username">{booker?.user?.name}</span>
                    <button onClick={() => { removeBooking(booker.id) }}>Remove booking</button>
                </>
                :
                <>
                    <span className="username green">Vacant</span>
                    <button onClick={() => { addBooking(startTime, endTime, day) }}>Add booking</button>
                </>
            }
        </div>
    )
};

export default BookingItem