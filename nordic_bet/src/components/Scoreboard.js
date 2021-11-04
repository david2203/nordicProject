import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./Global/config";
import Scorecard from "./Scorecard";
import "bootstrap/dist/css/bootstrap.min.css";
import gif from "./img/confetti.gif"


function Scoreboard() {
    const instance = axios.create({baseURL: server})
    const userId = Number(localStorage.getItem("user_id"))
   const current = []
   const currentRank = []
    const useGetGames = () => {
         const [rowcount, setRowcount] = useState()
        const [users, setUsers] = useState([])
        const [loading, setLoading] = useState(true);
    
       
        const instance = axios.create({ baseURL: server });
    
        const fetchUsers = async () => {
          try {
            const response = await instance.get(`/users?_sort=Score:DESC`)
            setUsers(response.data)
            setRowcount(response.data.length)
            
          } catch (err) {
            console.log(err);
          }
    
          setLoading(false);
        };
    
        useEffect(() => {
          fetchUsers();
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    
        return { users, loading, rowcount };
      };
    
      const { users, loading, rowcount } = useGetGames();
      
      if (!loading) {

        for(let i = 0; i< users.length; i++){
            if(users[i].id === userId){
                current.push(users[i])
                currentRank.push(i)


            }
        }
      }

   
           
            
  

    
    

    return (
        <> 
        <div className="min-vh-100">
        <span>
            <span className="d-flex justify-content-center">
        <img alt="" src={gif} style={{position: 'absolute', zIndex: '3', width: '80%' }}/>
        </span>
        </span>
        <div className="mt-5">
        <img src="https://cdn-icons-png.flaticon.com/512/4489/4489657.png" width="50px" alt=""/>
        <h3 className=" bg-light w-25 border mx-auto mt-3">Topplista </h3>
            <table className="table table-hover w-50 border bg-light mt-3 mx-auto">
  <thead>
    <tr>
      <th scope="col">#Rank</th>
      <th scope="col"></th>
      <th scope="col">Användarnamn</th>
      <th scope="col">Poäng</th>
    </tr>
  </thead>
  <tbody>
  {users.map((user,i)=>{
            return(
                <Scorecard key={user.id} id={user.id}  username={user.username} score={user.Score} avatar={user.profilepicture} row={i}/>
            )
        })}
  </tbody>
</table>
<h3 className=" bg-light w-25 border mx-auto mt-5">Din placering </h3>
<table className="table table-hover w-50 border bg-light mt-3 mx-auto">
  <thead>
    <tr>
      <th scope="col">#Rank</th>
      <th scope="col"></th>
      <th scope="col">Användarnamn</th>
      <th scope="col">Poäng</th>
    </tr>
  </thead>
  <tbody>
  {current.map((user,i)=>{
            return(
                <Scorecard key={user.id} id={user.id}  username={user.username} score={user.Score} avatar={user.profilepicture} row={currentRank[0]}/>
            )
        })}
  </tbody>
</table>
</div>

</div>
        </>
        
    )
}

export default Scoreboard
