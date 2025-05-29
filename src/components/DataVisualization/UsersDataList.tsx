import axios, {AxiosResponse, AxiosError} from "axios";
import {useState} from "react";

interface UserResponse {
    one:string;
    two:string;
}

const UsersDataList = () => {  
    const [response, setResponse] = useState<AxiosResponse<UserResponse>|null>(null);

    const fetchUsers = async () => {
        // Fetch users from backend
        try {
            setResponse(await axios.get('http://localhost:10200/api/users-usernames/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }));
        } catch (error) {
            const err = error as AxiosError<{detail:string}>
            alert(`Impossible to fetch data: ${err.response ? err.response.data.detail : err.message}`);
        }
    }
    

    return (
        <>  
            <h2>Users List</h2>
            <button onClick={fetchUsers}>Fetch</button>
            <div>
                {JSON.stringify(response?.data)}
            </div>
        </>
    );
}

export default UsersDataList