import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./Global/config";
import { DataGrid } from '@mui/x-data-grid';
import { borderRight, textAlign } from "@mui/system";

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
