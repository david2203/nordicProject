import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config";

function Profile() {

    const userId = localStorage.getItem("user_id");
    const [username, setUsername] = useState("");
    const instance = axios.create({baseURL: server});

    useEffect( ()=> {
        const fetchUsername = async () => {
            const response = await instance.get (`users?id`);
            
            console.log(response);


 
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
