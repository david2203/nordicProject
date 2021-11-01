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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import setTeamFlag from "./Flags"






function ElimGame({event_id,eid_xml,eventname,grp,odds_1,odds_x,odds_2,status}) {
    
    const instance = axios.create({baseURL: server})
    const playingTeams = eventname.split("-");
    const home_team = playingTeams[0]
    const away_team = playingTeams[1]
    const [gameId, setGameId] = useState()
    const user_id = localStorage.getItem("user_id")
   //  const token = localStorage.getItem("jwt")
    const [homeFlag, setHomeFlag] = useState("AQ")
    const [awayFlag, setAwayFlag] = useState("AQ")

    

    useEffect(()=> {
        const fetchGameId = async()=>{
            const response = await instance.get(`Euro_events?eid_xml=${event_id}`)
            setGameId(response.data[0].id)
        }
        fetchGameId()

        setHomeFlag(setTeamFlag("home",home_team))
        setAwayFlag(setTeamFlag("away",away_team))
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Card className="bg-light" container spacing={6} sx={{ maxWidth: '100%',
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

export default ElimGame