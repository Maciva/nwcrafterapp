import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, IconButton, MenuItem, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { isMobile } from "react-device-detect";
import { useNavigate, useParams } from "react-router-dom";
import PerkCalculator from "../../utils/PerkCalculator";
import CalculatorResultDialog from "./components/CalculatorResultDialog";
import CharmDialog from "./components/CharmDialog";
import CustomDialog from "./components/CustomDialog";
import ItemBanner from "./components/ItemBanner";
import PerkContainerAll from "./components/PerkContainer/PerkContainerAll";
import PerkSelector from "./components/PerkSelector";
import PerkSlotSelectorDialog from "./components/PerkSlotSelectorDialog";

function Calculator() {

    let params = useParams();
    let perkCalculator = React.useRef(new PerkCalculator(params.itemClass), []);

    const [rarity, setRarity] = React.useState("legendary")
    const [selectedPerks, setSelectedPerks] = React.useState([[], [], []])
    const [open, setOpen] = React.useState(false);
    
    const [perkSelectorOpen, setPerkSelectorOpen] = React.useState(false);
    const [selectorPerk, setSelectorPerk] = React.useState(undefined);

    const [openResult, setOpenResult] = React.useState(false);
    const [calculatorResult, setCalculatorResult] = React.useState(0);

    const [openCharmResult, setOpenCharmResult] = React.useState(false);
    const [charmResult, setCharmResult] = React.useState([]);

    const navigate = useNavigate();

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

    const onSelect = (perk) => {
        setPerkSelectorOpen(true);
        setSelectorPerk(perk);
    }

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

    const openCalculateResult = (result) => {
        setOpenResult(true);
        setCalculatorResult(result);
    }

    const openCalculateMostEfficientCharm = (result) => {
        setOpenCharmResult(true);
        setCharmResult(result);
    }

    const renderContent = () => {
        return (
            <>
                <CharmDialog handleClose={() => setOpenCharmResult(false)} open={openCharmResult} result={charmResult} />
                <CalculatorResultDialog handleClose={() => setOpenResult(false)} open={openResult} result={calculatorResult} />
                <PerkSlotSelectorDialog handleClose={() => setPerkSelectorOpen(false)} open={perkSelectorOpen} selectedPerks={selectedPerks} perk={selectorPerk} />
                <CustomDialog handleClose={() => setOpen(false)} open={open} handleSelect={handleSelect} itemClass={params.itemClass} />
                <Container maxWidth="lg">
                    <IconButton onClick={() => navigate(-1) } style={{margin: '0.2em'}} >
                        <ArrowBack fontSize="large" />
                    </IconButton>
                    <Paper style={{ padding: '1em' }} elevation={4} >
                        <Grid spacing={6} direction="column" container >
                            <Grid item xs={12} >
                                <Paper style={{ padding: '1em' }} >
                                    <Grid container spacing={4} justifyContent={"space-between"} >
                                        <Grid item md={5} xs={12} >
                                            <ItemBanner itemClass={params.itemClass} rarity={rarity} />
                                        </Grid>
                                        <Grid item md={3} xs={12}>
                                            <TextField onChange={(e) => setRarity(e.target.value)} select fullWidth color="secondary" label="Rarity" value={rarity} variant="outlined" >
                                                <MenuItem value="legendary">Legendary</MenuItem>
                                                <MenuItem value="epic">Epic</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item md={4} xs={12} spacing={2} container justifyContent="space-between" direction="column"  >
                                            <Grid item >
                                                <Button
                                                    onClick={() => openCalculateResult(perkCalculator.current.calculate(selectedPerks))}
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
                                                    style={{ minHeight: '4em' }} fullWidth variant="outlined"
                                                    onClick={() => openCalculateMostEfficientCharm(perkCalculator.current.calculateMostEfficientCharm(selectedPerks))}
                                                        
                                                >
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
                                    <PerkSelector onSelect={isMobile ? onSelect : onSelect} draggable itemClass={params.itemClass} selectedPerks={selectedPerks} />
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