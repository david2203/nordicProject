import React, { useState, useEffect } from "react";
import server from "./Global/config";
// import axios from "axios";


//component that is looped by scoreboard to write out every line in the table with unique looks for first second and third palce
function Scorecard({ id, username, score, avatar, row }) {
  const [url, setUrl] = useState(
    "https://gravatar.com/avatar/a0310ba74bcd933a1f4a3cb00de31fea?s=400&d=mp&r=x"
  );

  useEffect(() => {
    if (avatar) {
      const avatarUrl = avatar.formats.small.url;

      setUrl(server + avatarUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (

    //icons for first second and third place
    <>
      <tr>
        <th scope="row">
          {row === 0 ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png"
              width="50px"
              alt=""
            />
          ) : (
            <></>
          )}
          {row === 1 ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/2583/2583319.png"
              width="50px"
              alt=""
            />
          ) : (
            <></>
          )}
          {row === 2 ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/2583/2583434.png"
              width="50px"
              alt=""
            />
          ) : (
            <></>
          )}
          {row > 2 ? <>{row + 1}</> : <></>}
        </th>
        <td>
          {" "}
          <img
            src={url}
            style={{
              width: "50px",
              height: "50px",
              backgroundSize: "cover",
              display: "block",
              objectFit: "cover",
            }}
            className="rounded-circle"
            alt=""
          />
        </td>
        <td>{username}</td>
        <td>{score}</td>
      </tr>
    </>
  );
}

export default Scorecard;
