import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

function Bet({ id, type, homeTeamGoals, awayTeamGoals, winner }) {
  const [expanded, setExpanded] = React.useState(false);

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

  function handleOnSubmit() {}

  return (
    <>
      <div className="bet_info">
        <Card
          sx={{ maxWidth: "100%", mx: "38%", width: ["100%", "50%", "25%"] }}
        >
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Type of bet: {type}
              {homeTeamGoals !== "Not included in this bet" ? (
                <>
                  <div> Home goals: {homeTeamGoals} </div>
                  <br />
                </>
              ) : (
                <></>
              )}
              {awayTeamGoals !== "Not included in this bet" ? (
                <>
                  <div> Away goals: {awayTeamGoals} </div>
                  <br />
                </>
              ) : (
                <></>
              )}
              {winner !== "Not included in this bet" ? (
                <>
                  <div> Winner: {winner} </div>
                  <br />
                </>
              ) : (
                <></>
              )}
              Maximum points for this bet: {score}
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
              <form onSubmit={handleOnSubmit}>
                <div>
                  Delete bet ?
                  <Button variant="text" type="submit">
                    Yes
                  </Button>
                  <br />
                </div>
              </form>
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
