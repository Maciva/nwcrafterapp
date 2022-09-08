import { Button, Card, CardActionArea, CardHeader, CardMedia } from "@mui/material";
import React from "react";

function ItemCard(props) {
    return (
        <Card
            sx={{ boxShadow: 12 }}
        >
            <CardActionArea>
                <CardHeader
                    title={props.name}
                    style={{
                        textAlign: 'center',
                        color: '#AAAAAA'
                    }}
                />
                <CardMedia
                    component="img"
                    sx={{
                        width: 80,
                        margin: 'auto',
                        marginBottom: 2,
                        backgroundColor: 'primary.lighter',
                        borderRadius: 5,
                        boxShadow: 0
                    }}
                    image={props.icon}
                />

            </CardActionArea>
        </Card>

    )
}

export default ItemCard;