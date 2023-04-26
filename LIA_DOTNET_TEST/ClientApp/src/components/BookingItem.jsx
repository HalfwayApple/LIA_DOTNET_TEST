import React, { useContext } from 'react'
import { BookingContext } from '../contexts/BookingProvider';


const BookingItem = ({ booker, startTime, endTime, dayName, day }) => {
  
  const { addBooking, removeBooking } = useContext(BookingContext);

  return (
    <div key={`${dayName}_${startTime}_${endTime}`} className="booking-item">
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