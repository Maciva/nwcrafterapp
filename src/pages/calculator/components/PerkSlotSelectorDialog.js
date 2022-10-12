import { Dialog, DialogTitle, Paper } from "@mui/material";
import PerkContainerAll from "./PerkContainer/PerkContainerAll";

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
            <DialogTitle>
                Select a Perk Slot
            </DialogTitle>
            <Paper style={{ margin: '1em', padding: '1em' }} elevation={4} >
                <PerkContainerAll onSelect={onSelect} selector selectorPerk={perk} selectedPerks={selectedPerks} />
            </Paper>
        </Dialog>
    )

}

export default PerkSlotSelectorDialog;