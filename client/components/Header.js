import React from "react"
import {Box, Button, Paper, Grid} from "@material-ui/core";
import Link from "next/link";

const Header = () => {
    return (
        <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            style={{
                width: "80%",
                margin: "0 auto"
            }}
        >
            <Box>
                <Link href={"/"}>
                    <a><h1>ToDo List</h1></a>
                </Link>
            </Box>
            <Box>
                <Button variant={"contained"} color={"primary"}>Logout</Button>
            </Box>
        </Grid>
    )
}

export default Header