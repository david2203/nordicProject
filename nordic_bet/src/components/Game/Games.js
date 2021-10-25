import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config";
import Game from "./Game";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Scoreboard from "../Scoreboard";
import { Parallax, Background } from "react-parallax";
import Footer from "../Global/Menu"
import 'bootstrap/dist/css/bootstrap.min.css';


 

function Games() {
    const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    const instance = axios.create({baseURL: server})
    const [games, setGames] = useState([]);
    const [loadPage, setLoadPage] = useState(3)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
      const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

    

    useEffect(()=> {
        const fetchGame = async()=>{
            const response = await instance.get(`Euro_events?status=Not Started&&_limit=${loadPage}`)
                setGames(response.data)   
        }
        fetchGame()
    }, [loadPage])

    function loadMore() {
        let dynamicPage = loadPage + 2
        setLoadPage(dynamicPage)
        
    }
    function showLess() {
        setLoadPage(3)
    }

    const image1 =
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80";

    const insideStyles = {
  background: "white",
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

    return (
      <>
        <div>
            <Parallax bgImage={image1} strength={500}>
      <div style={{ height: 'auto' }}>
        
      <Scoreboard/>
            {games.map((game)=>{
                return(
                    <Game key={game.eid_xml} event_id={game.eid_xml}  eventname={game.eventname} grp={game.grp}  odds_1={game.odds_1} odds_x={game.odds_x} odds_2={game.odds_2} status={game.status}/>
                )
            })}
            {/* pagination function */}
            { loadPage <= games.length ? 
                (<button onClick={loadMore} className="mt-5 mb-5">Load more</button>):
                (<button onClick={showLess} className="mt-5 mb-5">Show less</button>)
            }
      </div>

</Parallax>
        </div>
        {/* <Footer/> */}
        </>
    )
}

export default Games
