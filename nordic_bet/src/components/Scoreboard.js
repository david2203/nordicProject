import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./config";
import Scorecard from "./Scorecard";
import { DataGrid } from '@mui/x-data-grid';
import { borderRight, textAlign } from "@mui/system";

function Scoreboard() {
    const instance = axios.create({baseURL: server})
    const rowsEmpty = [
        { id: 1, Username: "", score : ""},
        { id: 2, Username: "", score : ""},
        { id: 3, Username: "", score : ""},
        { id: 4, Username: "", score : ""},
        { id: 5, Username: "", score : ""},
        { id: 6, Username: "", score : ""},
        { id: 7, Username: "", score : ""},
        { id: 8, Username: "", score : ""},
        { id: 9, Username: "", score : ""},
        { id: 10, Username: "", score : ""},   
    ]
    const [state, setState] = useState(rowsEmpty)
    const [userArray2, setUserArray2] = useState([["0","test"]])
    const userArray = [["0","test"],["1","david"]]
    useEffect( ()=>{
            const fetchUsers= async()=>{
            const response = await instance.get(`/users?_sort=Score:DESC`)
            const users = response.data
            return (
                users
            )
            }
            fetchUsers().then((resp)=>mapUsers(resp)).then(console.log(userArray)).then(fillRows())

            function mapUsers(users) {
                users.forEach(user => {
                    const username = user.username
                    const score= user.Score
                    setUserArray2(...userArray2, userArray2.push([score, username]))

                  })
            }
        },[])

        const columns = [
            { field: 'Rank', headerName: 'Rank', width: 130, textAlign:borderRight },
            { field: 'Username', headerName: 'Username', width: 150 },
            { field: 'score', headerName: 'Score', width: 130 },
          ];
          
          
        
        function fillRows() {
            console.log(userArray2)
            const rows = [
                
                { id: 1, Rank: 1, Username: userArray2[0][1], score : "userArray[1][0]"},
                // { id: 2, Rank: 2, Username: userArray[2][1], score : userArray[2][0]},
                { id: 3, Rank: 3, Username: "david", score : 5},
                { id: 4, Rank: 4, Username: "", score : ""},
                { id: 5, Rank: 5, Username: "", score : ""},
                { id: 6, Rank: 6, Username: "", score : ""},
                { id: 7, Rank: 7, Username: "", score : ""},
                { id: 8, Rank: 8, Username: "", score : ""},
                { id: 9, Rank: 9, Username: "", score : ""},
                { id: 10, Rank: 10, Username: "", score : ""},
                

                
            ]
            setState(rows)
        }
        
          
    
    return (
        <>
            Top 10 <br/>
    <div style={{ height: 400, width: '28%', marginLeft:"36.5%"  }}>
      <DataGrid
        rows={state}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>
    {/* {users.map((user)=>{
            return(
                <Scorecard key={user.id} id={user.id}  username={user.username} score={user.Score} />
            )
        })} */}
            
        </>
    )
}

export default Scoreboard
