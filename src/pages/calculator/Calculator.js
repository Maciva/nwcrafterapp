import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import PerkCalculator from "../../utils/PerkCalculator";
import CustomDialog from "./components/CustomDialog";
import ItemBanner from "./components/ItemBanner";
import PerkContainerAll from "./components/PerkContainer/PerkContainerAll";
import PerkSelector from "./components/PerkSelector";

function Calculator() {

    let params = useParams();
    let perkCalculator = React.useRef(new PerkCalculator(params.itemClass), []);
    
    const [rarity, setRarity] = React.useState("legendary")
    const [selectedPerks, setSelectedPerks] = React.useState([[], [], []])
    const [open, setOpen] = React.useState(false);


    React.useEffect(() => {
        if (rarity === "legendary" && selectedPerks.length !== 3) {
            setSelectedPerks(prev => {
                const newPerks = [...prev];
                newPerks.push([]);
                return newPerks;
            })
        }
        if (rarity === "epic" && selectedPerks.length !== 2) {
            setSelectedPerks(prev => {
                let newPerks = [...prev];
                return newPerks.slice(0, 2);
            })
        }
    }, [rarity])



    const handleDrop = (index, item) => {
        if (item.fromContainerId === index) {
            return
        }
        item.charm = false;
        setSelectedPerks(prev => {
            const newSelectedPerks = [...prev];
            if (item.fromContainerId !== undefined) {
                newSelectedPerks[item.fromContainerId] = newSelectedPerks[item.fromContainerId].filter(perkInContainer => perkInContainer.perk.perkId !== item.perk.perkId)
            }
            newSelectedPerks[index].push(item);
            return newSelectedPerks;
        });
    }

    const handleDelete = (index, item) => {
        setSelectedPerks(prev => {
            const newSelectedPerks = [...prev];
            newSelectedPerks[index] = newSelectedPerks[index].filter(perk => perk.perk.perkId !== item.perk.perkId);
            return newSelectedPerks;
        });
    }

    const handleSelect = (item) => {
        setSelectedPerks(prev => {
            const newSelectedPerks = [...prev];
            newSelectedPerks[0].push({ perk: item, charm: true });
            return newSelectedPerks;
        });
        setOpen(false);
    }

    const handleAddPerkWithCharm = () => {
        setOpen(true);
    }

    const renderContent = () => {
        return (
            <>
                <CustomDialog handleClose={() => setOpen(false)} open={open} handleSelect={handleSelect} itemClass={params.itemClass} />
                <Container maxWidth="lg">
                    <Paper style={{ padding: '2em' }} elevation={4} >
                        <Grid spacing={6} direction="column" container >
                            <Grid item xs={12} >
                                <Paper style={{ padding: '1em' }} >
                                    <Grid container spacing={4} justifyContent={"space-between"} >
                                        <Grid item xs={5} >
                                            <ItemBanner itemClass={params.itemClass} rarity={rarity} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField onChange={(e) => setRarity(e.target.value)} select fullWidth color="secondary" label="Rarity" value={rarity} variant="outlined" >
                                                <MenuItem value="legendary">Legendary</MenuItem>
                                                <MenuItem value="epic">Epic</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4} container justifyContent="space-between" direction="column"  >
                                            <Grid item >
                                                <Button
                                                    onClick={() => perkCalculator.current.calculate(selectedPerks)}
                                                    disabled={!selectedPerks.flat().length}
                                                    color="secondary"
                                                    style={{ minHeight: '4em' }}
                                                    fullWidth
                                                    variant="outlined"
                                                >
                                                    Calculate
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    disabled={!selectedPerks.flat().length ||
                                                        selectedPerks.flat().some(perk => perk.charm)}
                                                    color="secondary"
                                                    style={{ minHeight: '4em' }} fullWidth variant="outlined" >
                                                    Calculate most efficient charm
                                                </Button>

                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} >
                                <PerkContainerAll handleAddPerkWithCharm={handleAddPerkWithCharm} onDelete={handleDelete} onDrop={handleDrop} selectedPerks={selectedPerks} />
                            </Grid>
                            <Grid item xs={12} >
                                <Paper style={{ padding: '1em' }} >
                                    <PerkSelector draggable itemClass={params.itemClass} selectedPerks={selectedPerks} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container >
            </>

        )
    }
    return renderContent();
}

export default Calculator;