import React, { useLayoutEffect } from "react";
import {
  Card,
  FormGroup,
  TextField,
  Typography,
  Paper,
  Button,
  Link,
  FormControl,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, color } from "@mui/system";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
export function Login({ currentUser, setCurrentUser }) {
  let navigate = useNavigate();
  let backGrad = "linear-gradient(1deg, #00377C 40%, #F5F5F5)";
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const [largeView, setLargeView] = useState();
  const xlScreen = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    console.log(largeView);
    return setLargeView(xlScreen);
  }, [xlScreen]);

  return (
    <Box>
        <Grid
          container
          spacing={3}
          direction="column"
          columns={3}
          rowGap={{ xs: 3 }}
          alignContent="center"
          alignItems="center"
          textAlign="center"
          justifyContent="space-between"
        >

          <Grid item sx={{zIndex: 'tooltip'}}>
         
            <Paper elevation={4} sx={{ flexShrink: 1}}>
              <Box sx={{zIndex: 'tooltip'}}>
              <FormGroup>
                <Stack
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "space-around",
                    padding: ".8rem",
                  }}
                >
                  <Typography variant="h5">Sign in</Typography>
                  <FormControl>
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      margin="dense"
                      sx={{ minWidth: "16rem", maxWidth: "90%" }}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormControl>
                  
                  <Button
                    
                    variant="contained"
                    sx={{ maxWidth: "50%",
        
                  borderRadius: ".3rem" }}
                  >
                    {" "}
                    Log in{" "}
                  </Button>
                  
                </Stack>
              </FormGroup>
              </Box>
            </Paper>
          </Grid>

          
        </Grid>
    </Box>)
}