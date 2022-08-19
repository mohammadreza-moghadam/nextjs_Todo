import React from "react"
import {Box, Button, Grid, TextField} from "@material-ui/core";

const AuthBox = () => {
    return (
        <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{height: "80vh"}}
        >
            <Box style={{backgroundColor: "#2a343f", padding: "30px"}}>
                <h2 style={{marginBottom: "30px", textAlign: "center", color: "#fff"}}>ورود</h2>
                <Box>
                    <TextField
                        id="outlined-number"
                        label="ایمیل"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        style={{marginBottom: "10px"}}
                    />
                </Box>
                <Box>
                    <TextField
                        id="outlined-number"
                        label="رمز عبور"
                        type="password"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </Box>
                <Box>
                    <Button variant={"contained"} color={"primary"} style={{marginTop: "10px"}}>ورود</Button>
                </Box>
            </Box>
        </Grid>
    )
}

export default AuthBox