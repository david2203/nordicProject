import React, { useState, useEffect } from "react";
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
import Flags from "country-flag-icons/react/3x2";
import setTeamFlag from "../Game/Flags";

import { styled } from "@mui/material/styles";

function Bet({
  id,
  type,
  homeTeamGoals,
  awayTeamGoals,
  winner,
  euro_event,
  status,
  points_recieved,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const instance = axios.create({ baseURL: server });
  const [homeFlag, setHomeFlag] = useState("AQ");
  const [awayFlag, setAwayFlag] = useState("AQ");
  const [winnerFlag, setWinnerFlag] = useState("AQ");
  const [betWinnerFlag, setBetWinnerFlag] = useState("AQ");

  const real_winner = euro_event.winner;
  const teams = euro_event.eventname.split("-");
  let home_name = teams[0];
  let away_name = teams[1];
  if (euro_event.home_team !== "" && euro_event.home_team !== null) {
    home_name = euro_event.home_team;
  }
  if (euro_event.away_team !== "" && euro_event.away_team !== null) {
    away_name = euro_event.away_team;
  }
  var liveStatus = "";
  if (status) {
    liveStatus = "Active";
  } else {
    liveStatus = "Score given!";
  }
  const dateArray = euro_event.deadline.split("T");
  const date = dateArray[0];
  const timeArray = dateArray[1].split(":");
  const time = timeArray[0] + ":" + timeArray[1];

  useEffect(() => {
    setWinnerFlag(setTeamFlag("home", real_winner));
    setBetWinnerFlag(setTeamFlag("home", winner));
    setHomeFlag(setTeamFlag("home", home_name));
    setAwayFlag(setTeamFlag("away", away_name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        .delete(`bets/${id}`, {})
        .then(window.location.reload());
      console.log(response);
    };
    deleteBet();
  }

  const HomeFlag = Flags[homeFlag];
  const AwayFlag = Flags[awayFlag];
  const BetWinnerFlag = Flags[betWinnerFlag];
  const WinnerFlag = Flags[winnerFlag];

  return (
    <>
      <div className="bet_info">
        <Card
          sx={{ maxWidth: "100%", mx: "22.5%", width: ["100%", "50%", "55%"] }}
        >
          <CardContent>
            <Typography
              component={"span"}
              variant="body2"
              color="text.secondary"
            >
              <strong> Status: </strong> {liveStatus}
              <br />
              <strong> Datum: {date} </strong> <br />
              <strong>Tid: {time}</strong> <br />
              <strong> Händelse: </strong>
              <HomeFlag
                width="20px"
                style={{ border: "1px solid" }}
                className="..."
              />
              <span> </span>
              {home_name}
              <span> - </span>
              {away_name}
              <span> </span>
              <AwayFlag
                width="20px"
                style={{ border: "1px solid" }}
                className="..."
              />
              <br />
              <strong>Typ av spel:</strong> {type} <br /> <br />
              <strong>Spel:</strong>
              {homeTeamGoals !== "Not included in this bet" ? (
                <>
                  <div>
                    {" "}
                    {home_name} Mål: {homeTeamGoals}{" "}
                  </div>
                </>
              ) : (
                <></>
              )}
              {awayTeamGoals !== "Not included in this bet" ? (
                <>
                  <div>
                    {" "}
                    {away_name} Mål: {awayTeamGoals}{" "}
                  </div>
                </>
              ) : (
                <></>
              )}
              {winner !== "Not included in this bet" ? (
                <>
                  {winner === "X" ? (
                    <div> Vinnare: {winner}</div>
                  ) : (
                    <div>
                      {" "}
                      Vinnare:{" "}
                      <BetWinnerFlag
                        width="20px"
                        style={{ border: "1px solid" }}
                        className="..."
                      />{" "}
                      {winner}
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
              <br />
              <strong>Max antal poäng för detta spel: </strong>
              {score}
            </Typography>
          </CardContent>
          {liveStatus === "Active" ? (
            <>
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
                    Ta bort spel?
                    <Button variant="text" onClick={handleOnSubmit}>
                      Ja
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
            </>
          ) : (
            <>
              <CardContent>
                <Typography
                  component={"span"}
                  variant="body2"
                  color="text.secondary"
                >
                  <div>
                    <strong>Outcome: </strong>
                    <br />
                    {home_name}: {euro_event.home_final}
                    <br />
                    {away_name}: {euro_event.away_final}
                    <br />
                    Vinnare:{" "}
                    <WinnerFlag
                      width="20px"
                      style={{ border: "1px solid" }}
                      className="..."
                    />{" "}
                    {euro_event.winner}
                    <br />
                  </div>
                  <br />
                  <div>
                    <strong> Poäng tilldelad: </strong>
                    {points_recieved}
                  </div>
                </Typography>
                <Typography></Typography>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </>
  );
}

export default Bet;
