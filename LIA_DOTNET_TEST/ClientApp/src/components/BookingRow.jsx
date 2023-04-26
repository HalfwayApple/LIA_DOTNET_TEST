import { React, useContext } from 'react'
import { BookingContext } from '../contexts/BookingProvider';
import BookingProvider from '../contexts/BookingProvider';
import BookingItem from './BookingItem';

const BookingRow = ({ dayName, booking, day }) => {
  
  const {timeSlots} = useContext(BookingContext)

  
  return (
    <div key={dayName} className="booking-row">
      <div className="booking-title">{dayName}</div>
      <div className="timeslot-list">
        {timeSlots?.map(({ startTime, endTime }) => {
          const booker = booking?.find(({ timeSlot }) => timeSlot.startTime === startTime && timeSlot.endTime === endTime);
          return(
            <BookingItem
              booker={booker}
              startTime={startTime}
              endTime={endTime}
              dayName={dayName}
              day={day}
            />
          )
        })}
      </div>
    </div>
  )
}

export default BookingRow