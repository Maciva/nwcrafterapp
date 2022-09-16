import { Dialog, DialogTitle, Paper } from "@mui/material";
import React from "react";
import PerkSelector from "./PerkSelector";

export default function CustomDialog(props) {

    const {open, handleSelect, itemClass, handleClose} = props;
    
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
                <DialogTitle> Select a Perk </DialogTitle>
                <PerkSelector onSelect={handleSelect} itemClass={itemClass} selectedPerks={[[], [], []]} />
            </Paper>
        </Dialog>
    )

}
