import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-modal';
import server from "./config"

function Game({eid_xml,eventname,grp,odds_1,odds_x,odds_2,status}) {
    const instance = axios.create({baseURL: server})
    const playingTeams = eventname.split("-");
    const home_team = playingTeams[0]
    const away_team = playingTeams[1]

    const [game, setGame] = useState()
    const [layBetIsOpen,setLayBetIsOpen] = useState(false);
    // const [gameId, setGameId] = useState()
    const initialValues = {
        typeOfBet:"",
        homeTeamGoals:"",
        awayTeamGoals:"",
        winner:""
    }
    const [formValues, setFormValues] = useState(initialValues)
    const customStyles = {
        content : {
          background : "lightblue",
          height: "40vw",
          width:"50vw",
          margin: "3px",
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
      
    function openLayBet(e) {
        setLayBetIsOpen(true);
    }
    function closeLayBet(e) {
        setLayBetIsOpen(false);
    }
    function clearForm() {
        setFormValues(initialValues)
    }
    function handleOnSubmit() {
        if(formValues.typeOfBet === "betOnResult") {
            instance.post(`bets`,{
                type:formValues.typeOfBet,
                homeTeamGoals:formValues.homeTeamGoals,
                awayTeamGoals:formValues.awayTeamGoals,
                winner:formValues.winner
              }).then(
              closeLayBet()
            )
            console.log("success")
        }
    }
    function handleOnChange(e) {
        console.log(formValues)
        setFormValues({...formValues,[e.target.name]: e.target.value})
        console.log(formValues)
    }
    return (
        <>
        <div className="game_info">
            
            Game name: {eid_xml}
            <div>{eventname}<br/></div>
            {grp}<br/>
            {odds_1}<br/>
            {odds_x}<br/>
            {odds_2}<br/>
            {status}<br/>
            <div>{eventname}<br/></div>
            <button className="bet_btn" onClick={openLayBet}> Lay bet </button><br/>
        </div>

        <Modal
          isOpen={layBetIsOpen}
          onRequestClose={closeLayBet}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >

<form onSubmit={handleOnSubmit}>
            <h1>You have chosen to lay a bet on the game between: <strong>{home_team}</strong> and <strong>{away_team}</strong> </h1>
                    <div>
                        <div>
                            <span>Type of bet:</span>
                            <select name="typeOfBet"  id="type" value={formValues.type} onChange={handleOnChange}>
                                <option value="empty"> Choose type </option>
                                <option value="BetOnResult"> Bet on result </option>
                                <option value="BetOnGoals"> Bet on goals </option>
                                <option value="BetOnWinner"> Bet on winner </option>  
                            </select><br/>
                            {formValues.typeOfBet === "BetOnResult" ? (
                                <>
                                <span>{home_team} goals:</span>
                                <select name="homeTeamGoals" id="homeTeamGoals" value={formValues.homeTeamGoals} onChange={handleOnChange}>
                                    <option value=""> Choose option </option>
                                    <option value="0"> 0 </option>
                                    <option value="1"> 1 </option>
                                    <option value="2"> 2 </option>
                                    <option value="3"> 3 </option>  
                                    <option value="4"> 4 </option>  
                                    <option value="5"> 5 </option>  
                                    <option value="6"> 6 </option>  
                                    <option value="7"> 7 </option>
                                    <option value="8"> 8 </option>  
                                </select><br/>
                                <span>{away_team} goals:</span>
                                <select name="awayTeamGoals" id="awayTeamGoals" value={formValues.awayTeamGoals} onChange={handleOnChange}>
                                    <option value=""> Choose option </option>
                                    <option value="0"> 0 </option>
                                    <option value="1"> 1 </option>
                                    <option value="2"> 2 </option>
                                    <option value="3"> 3 </option>  
                                    <option value="4"> 4 </option>  
                                    <option value="5"> 5 </option>  
                                    <option value="6"> 6 </option>  
                                    <option value="7"> 7 </option>
                                    <option value="8"> 8 </option>  
                                </select><br/>
                                <span>Winner:</span>
                                <select name="winner" id="winner" value={formValues.winner} onChange={handleOnChange}>
                                    <option value=""> Choose option </option>
                                    <option value="homeTeam"> {home_team}  </option>
                                    <option value="awayTeam"> {away_team}  </option> 
                                </select><br/>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            {formValues.typeOfBet === "BetOnGoals" ? (
                                
                               <>
                               <span>{home_team}  goals:</span>
                            <select name="homeTeamGoals" id="homeTeamGoals" value={formValues.homeTeamGoals} onChange={handleOnChange}>
                                <option value=""> Choose option </option>
                                <option value="0"> 0 </option>
                                <option value="1"> 1 </option>
                                <option value="2"> 2 </option>
                                <option value="3"> 3 </option>  
                                <option value="4"> 4 </option>  
                                <option value="5"> 5 </option>  
                                <option value="6"> 6 </option>  
                                <option value="7"> 7 </option>
                                <option value="8"> 8 </option>  
                            </select><br/>
                            <span>{away_team} goals:</span>
                            <select name="awayTeamGoals" id="awayTeamGoals" value={formValues.awayTeamGoals} onChange={handleOnChange}>
                                <option value=""> Choose option </option>
                                <option value="0"> 0 </option>
                                <option value="1"> 1 </option>
                                <option value="2"> 2 </option>
                                <option value="3"> 3 </option>  
                                <option value="4"> 4 </option>  
                                <option value="5"> 5 </option>  
                                <option value="6"> 6 </option>  
                                <option value="7"> 7 </option>
                                <option value="8"> 8 </option>  
                            </select><br/>
                               </>
                            ) : (
                                <>
                                </>
                            )}
                            {formValues.typeOfBet === "BetOnWinner" ? (
                                <>
                                <span>Winner:</span>
                                <select name="winner" id="winner" value={formValues.winner} onChange={handleOnChange}>
                                    <option value=""> Choose option </option>
                                    <option value="homeTeam"> {home_team}  </option>
                                    <option value="awayTeam"> {away_team}  </option> 
                                </select><br/>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>

                        <button type="submit">Submit bet</button>
                    </div>
                </form>

                <button onClick={closeLayBet}>Cancel bet</button>

        </Modal>
        </>
    )
}

export default Game
