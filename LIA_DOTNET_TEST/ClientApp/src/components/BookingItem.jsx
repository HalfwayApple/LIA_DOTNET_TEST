import { React, useContext } from 'react'
import { BookingContext } from '../contexts/BookingProvider';


const BookingItem = ({ booker, startTime, endTime, day }) => {
  
    const { addBooking, startMoveBooking, endMoveBooking, removeBooking, currentUser, movingBookingInProcess } = useContext(BookingContext);

    const isCurrentUserBooking = booker?.user.id === currentUser.id;

  return (
      <div className="booking-item">
          <span className="time-slot">
              {startTime} - {endTime}
          </span>
          {booker ? (
              <>
                  <span className={`username ${isCurrentUserBooking ? 'blue' : ''}`}>
                      {booker?.user?.name}
                  </span>
                  {isCurrentUserBooking ? (
                      <>
                          <button onClick={() => { startMoveBooking(booker.id) }}>Move booking</button>
                      </>
                  ) : (
                          <button onClick={() => { removeBooking(booker.id) }}>Remove booking</button>
                  )}
              </>
          ) : (
              <>
                  <span className="username green">Vacant</span>

                      {movingBookingInProcess ? (
                          <button onClick={() => { endMoveBooking(startTime, endTime, day) }}>Move to</button>
                      ) : (
                          <button onClick={() => { addBooking(startTime, endTime, day) }}>Add booking</button>
                      )}
              </>
          )}
      </div>
  );
};

export default BookingItem