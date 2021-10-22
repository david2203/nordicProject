import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config"
import Flags from 'country-flag-icons/react/3x2'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




function Game({event_id,eid_xml,eventname,grp,odds_1,odds_x,odds_2,status}) {
    
    const instance = axios.create({baseURL: server})
    const playingTeams = eventname.split("-");
    const home_team = playingTeams[0]
    const away_team = playingTeams[1]
    const [gameId, setGameId] = useState()
    const [layBetIsOpen,setLayBetIsOpen] = useState(false);
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("jwt")
    const [homeFlag, setHomeFlag] = useState("AQ")
    const [awayFlag, setAwayFlag] = useState("AQ")

    

    useEffect(()=> {
        const fetchGameId = async()=>{
            const response = await instance.get(`Euro_events?eid_xml=${event_id}`)
            setGameId(response.data[0].id)
        }
        fetchGameId()
        if (home_team === "Poland"){
            setHomeFlag("PL")
        } 
        else if (home_team === "Albania") {
           setHomeFlag("AL");
        }
        else if (home_team === "England") {
            setHomeFlag("GB");
         }
         else if (home_team === "Germany") {
            setHomeFlag("DE");
         }
         else if (home_team === "France") {
            setHomeFlag("FR");
         }
         else if (home_team === "Romania") {
            setHomeFlag("RO");
         }
         else if (home_team === "Switzerland") {
            setHomeFlag("CH");
         }
         else if (home_team === "Wales") {
            setHomeFlag("WS");
         }
         else if (home_team === "Slovakia") {
            setHomeFlag("SK");
         }
         else if (home_team === "Spain") {
            setHomeFlag("ES");
         }
         else if (home_team === "Sweden") {
            setHomeFlag("SE");
         }
         else if (home_team === "Ukraine") {
            setHomeFlag("UA");
         }
         else if (home_team === "N.Ireland") {
            setHomeFlag("JE");
         }
         else if (home_team === "Ireland") {
            setHomeFlag("IE");
         }
         else if (home_team === "Russia") {
            setHomeFlag("RU");
         }
         else if (home_team === "Belgium") {
            setHomeFlag("BE");
         }
         else if (home_team === "Croatia") {
            setHomeFlag("HR");
         }
         else if (home_team === "Czech Republic") {
            setHomeFlag("CZ");
         }
         else if (home_team === "Italy") {
            setHomeFlag("IT");
         }
         else if (home_team === "Hungary") {
            setHomeFlag("HU");
         }
         else if (home_team === "Iceland") {
            setHomeFlag("IS");
         }
         else if (home_team === "Portugal") {
            setHomeFlag("PT");
         }
         else if (home_team === "Turkey") {
            setHomeFlag("TR");
         }
         else if (home_team === "Austria") {
            setHomeFlag("AT");
         }



         if (away_team === "Poland"){
            setAwayFlag("PL")
        } 
        else if (away_team === "Albania") {
           setAwayFlag("AL");
        }
        else if (away_team === "England") {
            setAwayFlag("GB");
         }
         else if (away_team === "Germany") {
            setAwayFlag("DE");
         }
         else if (away_team === "France") {
            setAwayFlag("FR");
         }
         else if (away_team === "Romania") {
            setAwayFlag("RO");
         }
         else if (away_team === "Switzerland") {
            setAwayFlag("CH");
         }
         else if (away_team === "Wales") {
            setAwayFlag("WS");
         }
         else if (away_team === "Slovakia") {
            setAwayFlag("SK");
         }
         else if (away_team === "Spain") {
            setAwayFlag("ES");
         }
         else if (away_team === "Sweden") {
            setAwayFlag("SE");
         }
         else if (away_team === "Ukraine") {
            setAwayFlag("UA");
         }
         else if (away_team === "N.Ireland") {
            setAwayFlag("JE");
         }
         else if (away_team === "Ireland") {
            setAwayFlag("IE");
         }
         else if (away_team === "Russia") {
            setAwayFlag("RU");
         }
         else if (away_team === "Belgium") {
            setAwayFlag("BE");
         }
         else if (away_team === "Croatia") {
            setAwayFlag("HR");
         }
         else if (away_team === "Czech Republic") {
            setAwayFlag("CZ");
         }
         else if (away_team === "Italy") {
            setAwayFlag("IT");
         }
         else if (away_team === "Hungary") {
            setAwayFlag("HU");
         }
         else if (away_team === "Iceland") {
            setAwayFlag("IS");
         }
         else if (away_team === "Portugal") {
            setAwayFlag("PT");
         }
         else if (away_team === "Turkey") {
            setAwayFlag("TR");
         }
         else if (away_team === "Austria") {
            setAwayFlag("AT");
         }
        
    }, [])
    

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


    
    // const [gameId, setGameId] = useState()
    const initialValues = {
        typeOfBet:"",
        homeTeamGoals:"",
        awayTeamGoals:"",
        winner:""
        
    }

    
    
    
    const [formValues, setFormValues] = useState(initialValues)
    
    function handleOnSubmit() {
        
        if(formValues.typeOfBet === "BetOnResult")  {
            instance.get(`bets`, {

            })
            instance.post(`bets`,{
                type:formValues.typeOfBet,
                homeTeamGoals:formValues.homeTeamGoals,
                awayTeamGoals:formValues.awayTeamGoals,
                winner:formValues.winner,
                euro_event:gameId,
                user:user_id
              }).then(
             
            )
            window.location.reload()
        }
        else if(formValues.typeOfBet === "BetOnGoals" ) {
            instance.post(`bets`,{
                type:formValues.typeOfBet,
                homeTeamGoals:formValues.homeTeamGoals,
                awayTeamGoals:formValues.awayTeamGoals,
                winner:"Not included in this bet",
                euro_event:gameId,
                user:user_id

              }).then(
              
            )
            window.location.reload()
        }
        else if(formValues.typeOfBet === "BetOnWinner") {
            instance.post(`bets`,{
                type:formValues.typeOfBet,
                homeTeamGoals:"Not included in this bet",
                awayTeamGoals:"Not included in this bet",
                winner:formValues.winner,
                euro_event:gameId,
                user:user_id

              }).then(
              
            )
            window.location.reload()
            
        }
        else {
            console.log("empty fields")
        }
    }
    function handleOnChange(e) {
        setFormValues({...formValues,[e.target.name]: e.target.value})   
    }


    const HomeFlag = Flags[homeFlag]
    const AwayFlag = Flags[awayFlag]
    
    

    return (
        <>
        <div><br/><br/>
            <Card container spacing={3} sx={{ maxWidth: '100%',
                        mx: '38%',
                        width: ['100%', '50%', '25%'],
                        
                                     }}>


      
      <CardContent>
         </CardContent>
         
                               
        <Typography variant="body2" color="text.secondary"
        sx={{ fontSize: 20,
              
                                     }}>
        <HomeFlag width="40px" title="HomeFlag" className="..."/> 
      {eventname} 
    <AwayFlag width="40px" title="AwayFlag" className="..."/>
        </Typography>
        

      <CardActions disableSpacing
      sx={{ display: 'inline-flex',
            verticalAlign: 'middle'
         }}>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon>

         </ExpandMoreIcon>
   
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
           <form onSubmit={handleOnSubmit}>
        <div>
                        <div>
                            <span>Choose Type</span><br/>
                            <FormControl sx={{ m: 1, minWidth: 200}}>
                            <Select 
                              name="typeOfBet" 
                              id="type" 
                              value={formValues.type} 
                              onChange={handleOnChange}
                              sx={{ 
                              minWidth: 125,
                              minHeight: 5
                               }}>
                           
                                <MenuItem value="BetOnResult"> Bet on result </MenuItem>
                                <MenuItem value="BetOnGoals"> Bet on goals </MenuItem>
                                <MenuItem value="BetOnWinner"> Bet on winner </MenuItem>  
                            </Select><br/>
                            {formValues.typeOfBet === "BetOnResult" ? (
                                <>
                                <span>{home_team} goals:</span>
                                <Select 
                                required 
                                name="homeTeamGoals" 
                                id="homeTeamGoals" 
                                value={formValues.homeTeamGoals} 
                                onChange={handleOnChange}
                                value={formValues.type} 
                              sx={{ 
                              mx: 5,
                              minWidth: 125,
                              minHeight: 5
                               }}>
                                  <MenuItem value="">
                                  </MenuItem>
                                    <MenuItem value="0"> 0 </MenuItem>
                                    <MenuItem value="1"> 1 </MenuItem>
                                    <MenuItem value="2"> 2 </MenuItem>
                                    <MenuItem value="3"> 3 </MenuItem>  
                                    <MenuItem value="4"> 4 </MenuItem>  
                                    <MenuItem value="5"> 5 </MenuItem>  
                                    <MenuItem value="6"> 6 </MenuItem>  
                                    <MenuItem value="7"> 7 </MenuItem>
                                    <MenuItem value="8"> 8 </MenuItem>  
                                </Select><br/>
                                <span>{away_team} goals:</span>
                                <Select 
                                required 
                                name="awayTeamGoals" 
                                id="awayTeamGoals" 
                                value={formValues.awayTeamGoals} 
                                onChange={handleOnChange}
                                sx={{ 
                                 mx: 5,
                                 minWidth: 125,
                                 minHeight: 5
                                  }}>
                                  <MenuItem value="">
                                  </MenuItem>
                                    <MenuItem value="0"> 0 </MenuItem>
                                    <MenuItem value="1"> 1 </MenuItem>
                                    <MenuItem value="2"> 2 </MenuItem>
                                    <MenuItem value="3"> 3 </MenuItem>  
                                    <MenuItem value="4"> 4 </MenuItem>  
                                    <MenuItem value="5"> 5 </MenuItem>  
                                    <MenuItem value="6"> 6 </MenuItem>  
                                    <MenuItem value="7"> 7 </MenuItem>
                                    <MenuItem value="8"> 8 </MenuItem>  
                                </Select><br/>
                                <span>Winner:</span>
                                <Select 
                                required 
                                name="winner" 
                                id="winner" 
                                value={formValues.winner} 
                                onChange={handleOnChange}
                                sx={{ 
                                 mx: 5,
                                 minWidth: 125,
                                 minHeight: 5
                                  }}>
                                  <MenuItem value="">
                                  </MenuItem>
                                    <MenuItem value={home_team}> {home_team}  </MenuItem>
                                    <MenuItem value="X">Draw</MenuItem> 
                                    <MenuItem value={away_team}> {away_team}  </MenuItem> 
                                    
                                </Select><br/>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            {formValues.typeOfBet === "BetOnGoals" ? (
                                
                               <>
                               <span>{home_team}  goals:</span>
                            <Select 
                            required 
                            name="homeTeamGoals" 
                            id="homeTeamGoals" 
                            value={formValues.homeTeamGoals} 
                            onChange={handleOnChange}
                            sx={{ 
                              mx: 5,
                              minWidth: 125,
                              minHeight: 5
                               }}>
                                  <MenuItem value="">
                                  </MenuItem>
                                <MenuItem value="0"> 0 </MenuItem>
                                <MenuItem value="1"> 1 </MenuItem>
                                <MenuItem value="2"> 2 </MenuItem>
                                <MenuItem value="3"> 3 </MenuItem>  
                                <MenuItem value="4"> 4 </MenuItem>  
                                <MenuItem value="5"> 5 </MenuItem>  
                                <MenuItem value="6"> 6 </MenuItem>  
                                <MenuItem value="7"> 7 </MenuItem>
                                <MenuItem value="8"> 8 </MenuItem>  
                            </Select><br/>

                            <span>{away_team} goals:</span>
                            <Select 
                            required 
                            name="awayTeamGoals" 
                            id="awayTeamGoals" 
                            value={formValues.awayTeamGoals} 
                            onChange={handleOnChange}
                            sx={{ 
                              mx: 5,
                              minWidth: 125,
                              minHeight: 5
                               }}>
                                  <MenuItem value="">
                                  </MenuItem>
                                <MenuItem value="0"> 0 </MenuItem>
                                <MenuItem value="1"> 1 </MenuItem>
                                <MenuItem value="2"> 2 </MenuItem>
                                <MenuItem value="3"> 3 </MenuItem>  
                                <MenuItem value="4"> 4 </MenuItem>  
                                <MenuItem value="5"> 5 </MenuItem>  
                                <MenuItem value="6"> 6 </MenuItem>  
                                <MenuItem value="7"> 7 </MenuItem>
                                <MenuItem value="8"> 8 </MenuItem>  
                            </Select><br/>
                               </>
                            ) : (
                                <>
                                </>
                            )}
                            {formValues.typeOfBet === "BetOnWinner" ? (
                                <>
                                <span>Winner:</span>
                                <Select 
                                required 
                                name="winner" 
                                id="winner" 
                                value={formValues.winner} 
                                onChange={handleOnChange}
                                sx={{ 
                                 mx: 5,
                                 minWidth: 125,
                                 minHeight: 5
                                  }}>
                                     <MenuItem value="">
                                     </MenuItem>
                                    <MenuItem value={home_team}> {home_team}  </MenuItem>
                                    <MenuItem value="X">Draw</MenuItem>  
                                    <MenuItem value={away_team}> {away_team}  </MenuItem>
                                </Select><br/>

                                </>
                            ) : (
                                <>
                                </>
                            )}

                           {formValues.winner === home_team ? (
                              <div> 
                                 Odds, {odds_1}
                                 </div>
                           ): (

                              <>
                              </>
                           )}

                           {formValues.winner === away_team ? (
                              <div> 
                                 Odds, {odds_2}
                                 </div>
                           ): (

                              <>
                              </>
                           )}

                           {formValues.winner === "X" ? (
                              <div> 
                                 Odds, {odds_x}
                                 </div>
                           ): (

                              <>
                              </>
                           )}

                           </FormControl>
                        </div>

                        <Button variant='text' type="submit">Submit bet</Button>
                        <br/>
                    </div>
                  </form>
          <Typography paragraph></Typography>
          <Typography paragraph>
 
          </Typography>
          <Typography paragraph>

          </Typography>
          <Typography paragraph>

          </Typography>
          <Typography>
    
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
            
        </div>

        
        </>
    )
}

export default Game
