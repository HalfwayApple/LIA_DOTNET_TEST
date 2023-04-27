import { React, useContext } from 'react';
import { BookingContext } from '../contexts/BookingProvider';


const UserDropdownList = () => {

    const { users, currentUser, setCurrentUser, movingBookingInProcess } = useContext(BookingContext);

    const handleChange = (event) => {
        setCurrentUser(users.find(x => x.id == event.target.value));
    };

    return (
        <div>
            <label htmlFor="my-dropdown">User:</label>
            <select
                id="my-dropdown"
                value={currentUser.id}
                onChange={handleChange}
                disabled={movingBookingInProcess}
            >
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserDropdownList