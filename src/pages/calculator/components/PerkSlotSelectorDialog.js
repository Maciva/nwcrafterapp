import { Dialog, DialogTitle, Grid, IconButton, Paper } from "@mui/material";
import PerkContainerAll from "./PerkContainer/PerkContainerAll";
import CloseIcon from '@mui/icons-material/Close';

function PerkSlotSelectorDialog(props) {
    
    const {open, onSelect, perk, handleClose, selectedPerks} = props;

    return (
        <Dialog 
            sx={{
            "& .MuiDialog-container": {
                alignItems: "flex-start"
            }
        }} PaperProps={{
            sx: {
                m: 0,
                top: '5em',
            }
        }} fullWidth maxWidth={'lg'} onClose={handleClose} open={open}  >
            <Grid style={{paddingRight: '1em'}} container alignItems={"center"} justifyContent={"space-between"} >
                <Grid item>
                    <DialogTitle>
                        Select a Perk Slot
                    </DialogTitle>
                </Grid>
                <Grid >
                    <IconButton onClick={handleClose} >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
            <Paper style={{ margin: '1em', padding: '1em' }} elevation={4} >
                <PerkContainerAll onDrop={onSelect} selector selectorPerk={perk} selectedPerks={selectedPerks} />
            </Paper>
        </Dialog>
    )

}

export default PerkSlotSelectorDialog;