import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../../utils/ItemTypes";
import CancelIcon from '@mui/icons-material/Cancel';

function MinimalPerkBanner(props) {

    const { perk, onDelete } = props;

    const renderContent = () => {
        const imgSrc = `${process.env.PUBLIC_URL}/res/${perk.perk.icon}`;
        return (

            <Stack
                alignItems={"center"}
                direction="row"
                justifyContent="space-between"
                style={{
                    height: '3.5em',
                    borderRadius: '0.5em',
                    backgroundColor: '#151714',
                    padding: '0.5em',
                }}
            >
                <Stack
                    spacing={1}
                    direction="row"
                    alignItems={"center"}
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                    <img src={imgSrc} alt="" style={{ width: '1.75em' }} />
                    <Typography variant="p" noWrap >
                        {perk.perk.name}
                    </Typography>

                </Stack>


                <IconButton onClick={() => onDelete(perk)} >
                    <CancelIcon />
                </IconButton>

            </Stack>
        )

    }

    return renderContent();

}

export default MinimalPerkBanner;