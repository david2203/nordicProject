import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import server from "../Global/config"
import Brackets from "./Brackets"
import Group from "./Group"



function Groups() {

    const useGetGames = () => {
        const [gamesArray, setGamesArray] = useState([]);
        const [loading, setLoading] = useState(true);
      
        const groups = [
          'EURO Grp. A',
          'EURO Grp. B',
          'EURO Grp. C',
          'EURO Grp. D',
          'EURO Grp. E',
          'EURO Grp. F',
        ];
      
        const instance = axios.create({ baseURL: server });
      
        const fetchGames = async() => {
          try {
            for (let i = 0; i < groups.length; i++) {
              const { data } = await instance.get(`Euro_events?grp=${groups[i]}`);
              setGamesArray((games) => [...games, ...data]);
            }
          } catch (err) {
            console.log(err);
          }
      
          setLoading(false);
        };
      
        useEffect(() => {
          fetchGames();
        }, []);
      
        return { loading, gamesArray };
      };

      const { loading, gamesArray } = useGetGames()

      if (!loading) {
          const chunked = []
          // All data should be available
          console.log(gamesArray)
          for (let i = 0;  i < gamesArray.length; i += 5) {
            chunked.push(gamesArray.slice(i, i + 5))
          }
          console.log(chunked)
      }
    return (
        <div>
             <table className="table table-hover w-25 border bg-light mt-3 mx-auto">
  <thead>
    <tr>
      <th scope="col">Eventname</th>
      <th scope="col">Status</th>   
    </tr>
  </thead>
  <tbody>

        {gamesArray.map((game)=>{
            return (
                <Group key={game.id} eventname={game.eventname} status={game.status}/>
              )
        })}
  </tbody>
</table>
        </div>
    )
}

export default Groups
