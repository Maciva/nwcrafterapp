import { Dialog, DialogTitle, Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import PerkSelector from "./PerkSelector";
import CloseIcon from '@mui/icons-material/Close';

export default function CharmDialog(props) {

    const { open, handleSelect, itemClass, handleClose, selectedPerks, forContainerIndex } = props;

    return (
        <Dialog sx={{
            "& .MuiDialog-container": {
                alignItems: "flex-start"
            }
        }} PaperProps={{
            sx: {
                m: 0,
                top: '5em',
            }
        }} fullWidth maxWidth={'lg'} onClose={handleClose} open={open}  >
            <Paper elevation={4} style={{ padding: '1em' }} >
                <Grid style={{ paddingRight: '1em' }} container alignItems={"center"} justifyContent={"space-between"} >
                    <Grid item>
                        <DialogTitle>
                            Select a Perk
                        </DialogTitle>
                    </Grid>
                    <Grid >
                        <IconButton onClick={handleClose} >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
                <PerkSelector forContainerIndex={forContainerIndex} filterSelectedLabels charmPerks onSelect={handleSelect} itemClass={itemClass} selectedPerks={selectedPerks} />
            </Paper>
        </Dialog>
    )

}
