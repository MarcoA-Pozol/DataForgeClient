import axios from "axios";
import React, {useState} from "react";

const UsersDataList = () => {  
    const [response, setResponse] = useState({'Juan':'Es un pendejo'});

    const fetchUsers = async () => {
        // Fetch users from backend
        try {
            setResponse(await axios.get('http://localhost:10200/api/users-usernames/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }));
        } catch (error) {
            alert(`Impossible to fetch data: ${error.response ? error.response.data.detail : error.message}`);
        }
    }
    

    return (
        <>  
            <h2>Users List</h2>
            <button onClick={fetchUsers}>Fetch</button>
            <div>
                {JSON.stringify(response.data)}
            </div>
        </>
    );
}

export default UsersDataList