import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import AdminGame from "./Admin_game";
import { FloatingLabel, Form, Row, Col } from "react-bootstrap";

function Admin() {
  const [games, setGames] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
 
  const initialValues = {
    typeOfView: "Grp.",
  };

  const [formValues, setFormValues] = useState(initialValues);
  function handleOnChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }
 
  console.log(formValues)
  useEffect(() => {
    const instance = axios.create({ baseURL: server });
    const userId = localStorage.getItem("user_id");
    if (userId !== null) {
      const fetchRole = async () => {
        const response = await instance.get(`/users?id=${userId}`);
        setIsAdmin(response.data[0].isAdmin);
      };
      fetchRole();
    }
  }, []);

  useEffect(() => {
    const instance = axios.create({ baseURL: server });
    const fetchGame = async () => {
      const response = await instance.get(`Euro_events?grp_contains=${formValues.typeOfView}`);
      setGames(response.data);
    };
    fetchGame();
  }, [formValues]);
  

  return (
    <>
    
        <div style={{ height: "auto" }} className="bg-secondary">
        <div className="d-flex flex-column align-items-center">
        
          {isAdmin ? (
            <>
            <Row className="g-2 mt-3 mb-3">
            

              <Col md>
                <FloatingLabel controlId="floatingSelectGrid" label="Välj">
                  <Form.Select
                    aria-label="Floating label select example"
                    className="opacity-75"
                    name="typeOfView"
                    id="view"
                    value={formValues.typeOfView}
                    onChange={handleOnChange}
                  >
                    <option value="Grp."> Grupp spel</option>
                    <option value="1/8">Åttondelsfinal spel</option>
                    <option value="Quarter">Kvartsfinal spel</option>
                    <option value="Semi">Semifinal spel</option>
                    <option value="EURO Final">Final spel</option>

                  </Form.Select>
                </FloatingLabel>
              </Col>

            </Row>
            
              {games.map((game) => {
                if(formValues.typeOfView === "Grp."){
                  return (
                    <AdminGame
                      key={game.eid_xml}
                      event_id={game.eid_xml}
                      eventname={game.eventname}
                      grp={game.grp}
                      odds_1={game.odds_1}
                      odds_x={game.odds_x}
                      odds_2={game.odds_2}
                      status={game.status}
                      score_given={game.score_given}
                      deadline={game.deadline}
                    />
                  );
                }else if (formValues.typeOfView === "1/8" || formValues.typeOfView === "Quarter" ||formValues.typeOfView === "Semi" || formValues.typeOfView === "EURO Final" ){
                  const playingTeams = game.eventname.split("-")
                  let home = playingTeams[0]
                  let away = playingTeams[1]
                  if(game.home_team !== "" && game.home_team !== null){
                    home =  game.home_team
                  }
                  if(game.away_team !== "" && game.away_team !== null){
                    away =  game.away_team
                  }
                  
                  
                  const eventname = home + "-" + away
                  return (
                    <AdminGame
                      key={game.eid_xml}
                      event_id={game.eid_xml}
                      eventname={eventname}
                      grp={game.grp}
                      odds_1={game.odds_1}
                      odds_x={game.odds_x}
                      odds_2={game.odds_2}
                      status={game.status}
                      score_given={game.score_given}
                      deadline={game.deadline}
                    />
                  );
                } else {
                  return (
                    <></>
                  )
                }
                
              
               
              })}
              
            </>
          ) : (
            <h1 className="pt-5 display-1">404: <br/>Not Found</h1>
          )}
        </div>
        </div>
      
    </>
  );
}

export default Admin;
