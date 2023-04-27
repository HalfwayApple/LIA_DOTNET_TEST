import { React, useContext } from 'react'
import { BookingContext } from '../contexts/BookingProvider';
import BookingRow from './BookingRow';

const BookingTable = () => {

  const { bookings } = useContext(BookingContext);

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="booking-table">
      {weekDays.map((dayName, i) => {
        const day = i + 1;
        const booking = bookings[day] || [];
        
        return (<BookingRow key={dayName} day={day} dayName={dayName} booking={booking} />)
      })}
    </div>
  )
}

export default BookingTable