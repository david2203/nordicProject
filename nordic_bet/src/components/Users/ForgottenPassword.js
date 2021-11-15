import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import server from "../Global/config";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://nordicbet.se/rights">
        Nordic Bet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const instance = axios.create({ baseURL: server });

export default function RequestPassword() {
  
  const history = useHistory();

  const [requested,setRequested] = useState(false)
  const [jwt, setJwt] = useState();
  const [error, setError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("identifier"));
    instance
      .post("/auth/forgot-password", {
        email: data.get("identifier"), // user's email
      })
      .then((response) => {
        console.log("Your user received an email");
        setRequested(true)
      })
      .catch(showError);
  };

  function showError(e) {
    setError(true);
  }

  useEffect(() => {
    const JWT = localStorage.getItem("jwt");
    setJwt(JWT);
  }, []);
  const [email, setEmail] = useState()
  function handleOnChange(event) {
    
    const mail = event.currentTarget.value;
    console.log(mail)
    setEmail(mail)
  }
  function pushLogin(){
    setRequested(false)
    history.push("./SignIn")
  }
  return (
    <>
      {jwt ? (
        <div>token {jwt}</div>
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://source.unsplash.com/Z0KjmjxUsKs)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              {!requested ? 
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
                
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                  Du har efterfrågat ett <strong>lösenords byte</strong>. <br />
                  Vänligen skriv in den E-mail som är kopplat till dit konto: 
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <Grid container spacing={2}>
                    <Grid sm={20}>
                      <TextField
                        className="col"
                        margin="normal"
                        required
                        fullWidth
                        id="identifier"
                        label="Email Adress"
                        name="identifier"
                        autoComplete="email"
                        autoFocus
                        onChange={handleOnChange}
                      />
                    </Grid>
                  </Grid>

                  <br />
                  {error ? (
                    <Alert
                      sx={{ marginTop: 2, width: "100%" }}
                      severity="error"
                    >
                      Fel Email eller lösenord.
                    </Alert>
                  ) : (
                    <></>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Efterfråga lösenord
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      <Link href="/SignIn" variant="body2">
                        {"Kommer du ihåg ditt lösen? Klicka här!"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
              : 
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
                
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                  Vi har nu skickat ett E-mail till <strong>{email}</strong><br/>
                  Följ instruktionerna i mailet för att välja ett nytt lösenord
                </Typography>
                <Button
                    onClick={pushLogin}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Till Inlogg
                  </Button>
             
              </Box> 
              </Box> 
                  }
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
}
