import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import axios from "axios";
import server from "../Global/config";

import { styled } from "@mui/material/styles";

function Bet({ id, type, homeTeamGoals, awayTeamGoals, winner, euro_event }) {
  const [expanded, setExpanded] = React.useState(false);
  const instance = axios.create({ baseURL: server });
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const teams = euro_event.eventname.split("-")
  const home_name = teams[0]
  const away_name = teams[1]
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  var score = 0;
  if (type === "BetOnResult") {
    score = +5;
  } else if (type === "BetOnGoals") {
    score = +2;
  } else if (type === "BetOnWinner") {
    score = +3;
  }

  function handleOnSubmit() {
    const deleteBet = async () => {
      const response = await instance
        .delete(`bets/${id}`, {
          
        })
        .then(
          window.location.reload()
        );
      console.log(response);
    };
    deleteBet();
  }

  return (
    <>
      <div className="bet_info">
        <Card
          sx={{ maxWidth: "100%", mx: "38%", width: ["100%", "50%", "25%"] }}
        >
          <CardContent>
            <Typography variant="body2" color="text.secondary">
             <strong> Event: </strong> {euro_event.eventname}<br/>
              <strong>Type of bet:</strong> {type} <br/> <br/>
              
              <strong>Bet:</strong>
              {homeTeamGoals !== "Not included in this bet" ? (
                <>
                  <div> {home_name} goals: {homeTeamGoals} </div>
                  
                </>
              ) : (
                <></>
              )}
              {awayTeamGoals !== "Not included in this bet" ? (
                <>
                  <div> {away_name} goals: {awayTeamGoals} </div>
                 
                </>
              ) : (
                <></>
              )}
              {winner !== "Not included in this bet" ? (
                <>
                  <div> Winner: {winner} </div>
                  
                </>
              ) : (
                <></>
              )}
              <br/>
              <strong>Maximum points for this bet: </strong>{score}
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{ display: "inline-flex", verticalAlign: "middle" }}
          >
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon></ExpandMoreIcon>
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              
                <div>
                  Delete bet ?
                  <Button variant="text" onClick={handleOnSubmit}>
                    Yes
                  </Button>
                  <br />
                </div>
              
              <Typography paragraph></Typography>
              <Typography paragraph></Typography>
              <Typography paragraph></Typography>
              <Typography paragraph></Typography>
              <Typography></Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
}

export default Bet;
