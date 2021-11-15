import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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

export default function SignIn() {
  const history = useHistory();
  const [jwt, setJwt] = useState();
  const [error, setError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    instance
      .post(`auth/local`, {
        identifier: data.get("identifier"),
        password: data.get("password"),
      })
      .then((response) => {
        console.log("user token", response.data.jwt);
        console.log(response.data.user.fname);
        localStorage.setItem("firstname", response.data.user.fname);
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("username", response.data.user.username);
        history.push("/Landingpage");
        window.location.reload();
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

  const [visibility, setVisibility] = useState(false)
function handleToggle() {
  
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
    setVisibility(true)
  } else {
    x.type = "password";
    setVisibility(false)
  }
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
                <Typography component="h1" variant="h5">
                  Logga in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="identifier"
                    label="Email Adress"
                    name="identifier"
                    autoComplete="email"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={"Lösenord"}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {!  visibility ?  <i style={{cursor:'pointer'}} className="bi bi-eye-slash" onClick={handleToggle}> Visa lösenord</i>
              :
              <i  style={{cursor:'pointer'}}className="bi bi-eye" onClick={handleToggle}> Dölj lösenord</i>
              }
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
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Kom ihåg mig"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Logga in
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/ForgottenPassword" variant="body2">
                        Glömt lösenord?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/SignUp" variant="body2">
                        {"Har du inget konto? Registrera dig"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
}
