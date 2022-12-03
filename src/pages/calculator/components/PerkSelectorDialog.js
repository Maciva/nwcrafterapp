import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogTitle, Divider, Grid, IconButton, Paper } from "@mui/material";
import React from "react";
import PerkSelector from "./PerkSelector";
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from "@mui/system";
import MinimalPerkBanner from "./PerkBanner/MinimalPerkBanner";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function PerkSelectorDialog(props) {

    const { open, handleSelect, itemClass, handleClose, selectedPerks, forContainerIndex } = props;

    const [stagedPerks, setStagedPerks] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);

    const handleAdd = (perk) => {
        setStagedPerks(prev => {
            const newPerks = [...prev];
            newPerks.push(perk);
            return newPerks;
        });
    }

    const generateStagedPerkLabels = React.useCallback(() => {
        const summaryList = stagedPerks.slice(0, 4);
        const extendedList = stagedPerks.slice(4);
        return (
            <Stack
                direction="row"
                alignItems="flex-start"
                spacing={1}
            >
                <Accordion
                    expanded={expanded}
                    disableGutters
                    sx={{
                        '&:before': {
                            display: 'none',
                        },
                        width: '100%',
                    }}
                >
                    <AccordionSummary
                        sx={{
                            minHeight: '5em'
                        }}
                    >
                        <Grid container spacing={1} >
                            {
                                summaryList.map(perk => {
                                    return (
                                        <Grid item xs={12} md={3} key={perk.perk.perkId} >
                                            {<MinimalPerkBanner perk={perk} />}
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={1} >
                            {
                                extendedList.map(perk => {
                                    return (
                                        <Grid item xs={12} md={3} key={perk.perk.perkId} >
                                            {<MinimalPerkBanner perk={perk} />}
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <IconButton onClick={() => setExpanded(prev => !prev)}>
                    {expanded ? <ExpandLessIcon fontSize="large" /> : <ExpandMoreIcon fontSize="large" /> }
                </IconButton>
            </Stack>
        )
    }, [stagedPerks, expanded])

    return (
        <Dialog sx={{
            "& .MuiDialog-container": {
                alignItems: "flex-start"
            }
        }} PaperProps={{
            sx: {
                m: 0,
                top: '5em',
                height: '90%'
            }
        }} fullWidth maxWidth={'lg'} onClose={handleClose} open={open}  >
            <Paper elevation={4} style={{ padding: '1em' }} >
                <Stack style={{ marginBottom: '1em' }} spacing={2} >
                    <Grid container alignItems={"center"} justifyContent={"space-between"} >
                        <Grid item>
                            <DialogTitle sx={{ padding: '0 0 0 0.5em' }} >
                                Select Perks
                            </DialogTitle>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose} >
                                <CloseIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {generateStagedPerkLabels()}
                    <Button style={{ maxWidth: "10em" }} variant="outlined" color="secondary" >Apply</Button>
                    <Divider />
                </Stack>
                <PerkSelector forContainerIndex={forContainerIndex} filterSelectedLabels charmPerks onSelect={handleAdd} itemClass={itemClass} selectedPerks={selectedPerks} />
            </Paper>
        </Dialog>
    )

}
