import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import itemClasses from '../../res/itemClasses.json'
import ItemCard from "./components/ItemCard";

function Home() {

    const renderContent = () => {
        return (
            <Grid style={{ padding: '2em' }} container spacing={4} >
                {Object.keys(itemClasses).map((itemClass, index) => {
                    return (
                        <Grid key={index} item xs={3} >
                            <Link to={`/${itemClass}`} style={{ textDecoration: 'none' }} >
                                <ItemCard name={itemClass} icon={`../../res/${itemClasses[itemClass].icon}`} />
                            </Link>
                        </Grid>
                    )
                })}
            </Grid>
        )

    }

    return renderContent();

}

export default Home;