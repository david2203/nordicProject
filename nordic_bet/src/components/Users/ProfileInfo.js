import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import "bootstrap-icons/font/bootstrap-icons.css";
import Profile from "./Profile";

function ProfileInfo() {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userInfo, setUserInfo] = useState([]);
  const instance = axios.create({ baseURL: server });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await instance.get(`Users?id=${userId}`);
      setUserInfo(response.data);
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      {userInfo.map((userinfo) => {
        console.log(userinfo.profilepicture);
        return (
          <Profile
            key={userinfo.Id}
            username={userinfo.username}
            firstname={userinfo.fname}
            lastname={userinfo.lname}
            adress={userinfo.adress}
            city={userinfo.city}
            zipcode={userinfo.zipcode}
            country={userinfo.country}
            email={userinfo.email}
            created={userinfo.created_at}
            profilepicture={userinfo.profilepicture}
          />
        );
      })}
    </>
  );
}

export default ProfileInfo;
