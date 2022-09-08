import { AppBar, Grid, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import itemClasses from '../../res/itemClasses.json'
import ItemCard from "./components/ItemCard";

function Home() {

    const renderContent = () => {
        return (
            <Paper elevation={6} >
                <Grid style={{ padding: '2em' }} container spacing={4} >
                    {Object.keys(itemClasses).map(itemClass => {
                        return (
                            <Grid item xs={3} >
                                <ItemCard name={itemClass} icon={`../../res/${itemClasses[itemClass].icon}`} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>
        )

    }

    return renderContent();

}

export default Home;