import { Dialog, DialogTitle } from "@mui/material";
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
            <div style={{ margin: '1em' }} >
                <PerkContainerAll selector selectedPerks={selectedPerks} />
            </div>
        </Dialog>
    )

}

export default PerkSlotSelectorDialog;