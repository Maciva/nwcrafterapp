import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../utils/ItemTypes";
import CancelIcon from '@mui/icons-material/Cancel';

function ReducedPerkBanner(props) {

    const { perk, containerId, onDelete } = props;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PERK,
        item: { perk: perk.perk, fromContainerId: containerId },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }))

    const renderContent = () => {
        const imgSrc = `${process.env.PUBLIC_URL}/res/${perk.perk.icon}`;
        const charmSrc = `${process.env.PUBLIC_URL}/res/${perk.perk.charm.icon}`;
        return (
            <div ref={perk.charm ? undefined : drag} style={{
                backgroundColor: '#151714',
                opacity: isDragging ? 0.5 : 1,
                cursor: perk.charm ? 'auto' : 'grab',
                padding: '0.5em',
                paddingRight: '1.5em',
            }}>

                <Grid
                    container
                    spacing={2}
                    alignItems={"center"}
                    style={{ height: '5.5em' }}
                >
                    <Grid xs={2} item>
                        <img src={imgSrc} alt="" style={{ width: '2.5em' }} />
                    </Grid>
                    <Grid
                        item xs={7}
                    >
                        <Typography variant="h6" >
                            {perk.perk.name}
                        </Typography>
                    </Grid>
                    <Grid
                        item xs={1}
                    >
                        {perk.charm && (
                            <img src={charmSrc} alt="" style={{ width: '2em', marginTop: '0.3em' }} />
                        )}

                    </Grid>

                    <Grid
                        item xs={1}
                    >
                        <IconButton onClick={() => onDelete(perk)} >
                            <CancelIcon />
                        </IconButton>
                    </Grid>
                </Grid>

            </div >
        )

    }

    return renderContent();

}

export default ReducedPerkBanner;