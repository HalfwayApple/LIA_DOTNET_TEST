import { React, useContext, useState } from 'react';
import { BookingContext } from '../contexts/BookingProvider';


const UserDropdownList = () => {

    const { users } = useContext(BookingContext);
    const { currentUser } = useContext(BookingContext);
    const { setCurrentUser } = useContext(BookingContext);

    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setCurrentUser(users[event.target.value - 1]);
    };

    return (
        <div>
            <label htmlFor="my-dropdown">User:</label>
            <select id="my-dropdown" value={selectedValue} onChange={handleChange}>
                <option value="">--Please choose a user--</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <p>You have selected: {selectedValue}</p>
            <p>Which ends up being: {currentUser.name}</p>
        </div>
    );
};

export default UserDropdownList