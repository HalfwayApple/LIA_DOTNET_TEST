import React from 'react';
import {useState, useEffect, createContext} from 'react';
import { groupBy } from "../utils/utils";

export const BookingContext= createContext();

const BookingProvider = (props) => {

    const [bookings, setBookings] = useState({});
    const [timeSlots, setTimeSlots] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);


    useEffect(() => {


        (async () => {
            try
            {
                let timeSlots = await fetch("/booking/timeslots").then((response) => response.json());
                let users = await fetch("/booking/users").then((response) => response.json());
                setTimeSlots(timeSlots);
                setUsers(users);
                setCurrentUser(users[2]);
                updateBookings();
            }
            catch (error)
            {
                console.error(error);
            }
        })();
    }, []);

    const updateBookings = async () =>
    {
        let bookings = await fetch("/booking").then((response) => response.json());
        setBookings(groupBy(bookings, "day"));
    }

    const addBooking = async (inputStartTime, inputEndTime, inputDay) =>
    {

        let data =
        {
            "StartTime": inputStartTime,
            "EndTime": inputEndTime,
            "Day": inputDay,
            "User": currentUser
        }

        console.log(data);

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

        updateBookings();
    }

    const removeBooking = async (id) =>
    {
        await fetch(`/booking/${id}`,
            {
                method: 'DELETE',
                headers:
                {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => console.log(response))
            .catch(error => {
                console.error('Error:', error);
            });

        updateBookings();
    }

  return (<BookingContext.Provider value={{ bookings, timeSlots, addBooking, removeBooking, users, currentUser, setCurrentUser }}>
        {props.children}
    </BookingContext.Provider>);
}

export default BookingProvider