import React from "react";
// import axios from "axios";
// import server from "./Global/config";


function Scorecard({id,username,score, row}) {
    return (
        <>
    <tr>
      <th scope="row">{row +1 }</th>
      <td>{username}</td>
      <td>{score}</td>   
    </tr> 
        </>
    )
}

export default Scorecard
