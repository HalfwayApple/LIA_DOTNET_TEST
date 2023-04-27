import { React, useContext } from 'react';
import { BookingContext } from '../contexts/BookingProvider';


const UserDropdownList = () => {

    const { users } = useContext(BookingContext);
    const { currentUser } = useContext(BookingContext);
    const { setCurrentUser } = useContext(BookingContext);

    const handleChange = (event) => {
        setCurrentUser(users.find(x => x.id == event.target.value));
    };

    return (
        <div>
            <label htmlFor="my-dropdown">User:</label>
            <select id="my-dropdown" value={currentUser.id} onChange={handleChange}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <p>Which ends up being: {currentUser.name}</p>
        </div>
    );
};

export default UserDropdownList