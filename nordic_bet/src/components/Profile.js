import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./config";

function Profile() {

    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [username, setUsername] = useState("");
    const instance = axios.create({baseURL: server});

    useEffect( ()=> {
        const fetchUsername = async () => {
            const response = await instance.get (`auth/local/users/${userId}`);
            
            console.log(response);

            setUsername(response.data[0].username);
            setUserId(response.data[0].username);
            console.log(response.data[0].username);
        };
        fetchUsername();
    })
    
    return (
        <div>
            UserId : {userId}<br/>
            username : {username}
        </div>
    )
}

export default Profile
