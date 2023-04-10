import React, { useEffect, useState } from "react";
import { groupBy } from "./utils/utils";
import "./custom.css";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function App() {
  const [bookings, setBookings] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let [bookings, timeSlots] = await Promise.all([fetch("/booking").then((response) => response.json()), fetch("/booking/timeslots").then((response) => response.json())]);
        setBookings(groupBy(bookings, "day"));
        setTimeSlots(timeSlots);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

    const handleAddBooking = async (inputStartTime, inputEndTime, inputDay) =>
    {
        console.log(inputStartTime);
        console.log(inputEndTime);
        console.log(inputDay);

        let data =
        {
            "StartTime": inputStartTime,
            "EndTime": inputEndTime,
            "Day": inputDay
        }

        console.log(data);
        console.log(JSON.stringify(data));

        await fetch("/booking",
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        let bookings = await fetch("/booking").then((response) => response.json());
        setBookings(groupBy(bookings, "day"));
    };

  return (
    <div className="booking-table">
      {weekDays.map((dayName, i) => {
        const day = i + 1;
        const booking = bookings[day] || [];
        return (
          <div key={dayName} className="booking-row">
            <div className="booking-title">{dayName}</div>
            <div className="timeslot-list">
              {timeSlots?.map(({ startTime, endTime }) => {
                const booker = booking?.find(({ timeSlot }) => timeSlot.startTime === startTime && timeSlot.endTime === endTime);
                return (
                  <div key={`${dayName}_${startTime}_${endTime}`} className="booking-item">
                    <span className="time-slot">
                      {startTime} - {endTime}
                    </span>
                  {booker ? <span className="username">{booker?.user?.name}</span> : <button onClick={() => { handleAddBooking(startTime, endTime, day) }}>Add booking</button>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
