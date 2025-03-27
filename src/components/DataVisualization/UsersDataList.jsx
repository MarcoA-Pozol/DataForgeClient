import axios from "axios";
import React, {useState} from "react";

const UsersDataList = () => {
    const [usersList, setUsersList] = useState([]);    

    const fetchUsers = async () => {
        // Fetch users from backend
        try {
            const response = await axios.get('http://localhost/api/users/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (response) {
                setUsersList(response.data)
            }
        } catch (error) {
            alert('Impossible to fetch data')
        }
    }
    

    return (
        <>  
            <h2>Users List</h2>
            <button onClick={fetchUsers}>Fetch</button>
            <div>
                {usersList.map((user, index) => (
                    <p key={index}>{user}</p>
                ))}
            </div>
        </>
    );
}

export default UsersDataList