import { ArrowBack } from "@mui/icons-material";
import { Button, Grid, IconButton, MenuItem, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { isMobile } from "react-device-detect";
import { useNavigate, useParams } from "react-router-dom";
import PerkCalculator from "../../utils/PerkCalculator";
import CalculatorResultDialog from "./components/CalculatorResultDialog";
import MostEfficientCharmDialog from "./components/MostEfficientCharmDialog";
import CharmDialog from "./components/CharmDialog";
import ItemBanner from "./components/ItemBanner";
import PerkContainerAll from "./components/PerkContainer/PerkContainerAll";
import PerkSelector from "./components/PerkSelector";
import PerkSlotSelectorDialog from "./components/PerkSlotSelectorDialog";
import modes from "./modes";

function Calculator() {

    let params = useParams();
    let perkCalculator = React.useRef(new PerkCalculator(params.itemClass), []);

    const [mode, setMode] = React.useState("normal")
    const [selectedPerks, setSelectedPerks] = React.useState([[], [], []])
    const [open, setOpen] = React.useState(false);
    const [charmIndex, setCharmIndex] = React.useState(undefined);

    const [perkSelectorOpen, setPerkSelectorOpen] = React.useState(false);
    const [selectorPerk, setSelectorPerk] = React.useState(undefined);

    const [openResult, setOpenResult] = React.useState(false);
    const [calculatorResult, setCalculatorResult] = React.useState(0);

    const [openCharmResult, setOpenCharmResult] = React.useState(false);
    const [charmResult, setCharmResult] = React.useState([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        const modeConfig = modes[mode];
        const newSelectedPerks = [...selectedPerks];
        newSelectedPerks.filter((bucket, index) => index >= modeConfig.charmPerks).forEach(bucket => {
            bucket.forEach(perk => perk.charm = false)
        })
    }, [mode])

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
            newSelectedPerks[charmIndex].push({ perk: item, charm: true });
            return newSelectedPerks;
        });
        setOpen(false);
    }

    const handleAddPerkWithCharm = (index) => {
        setCharmIndex(index)
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
                <MostEfficientCharmDialog handleClose={() => setOpenCharmResult(false)} open={openCharmResult} result={charmResult} />
                <CalculatorResultDialog handleClose={() => setOpenResult(false)} open={openResult} result={calculatorResult} />
                <PerkSlotSelectorDialog
                    handleClose={() => setPerkSelectorOpen(false)}
                    onSelect={(index, item) => {
                        handleDrop(index, item);
                        setPerkSelectorOpen(false);
                    }}
                    open={perkSelectorOpen} selectedPerks={selectedPerks} perk={selectorPerk}
                />
                <CharmDialog forContainerIndex={charmIndex} selectedPerks={selectedPerks} handleClose={() => setOpen(false)} open={open} handleSelect={handleSelect} itemClass={params.itemClass} />
                <Container maxWidth="lg">
                    <IconButton onClick={() => navigate(-1)} style={{ margin: '0.2em' }} >
                        <ArrowBack fontSize="large" />
                    </IconButton>
                    <Paper style={{ padding: '1em' }} elevation={4} >
                        <Grid spacing={6} direction="column" container >
                            <Grid item xs={12} >
                                <Paper style={{ padding: '1em' }} >
                                    <Grid container spacing={4} justifyContent={"space-between"} >
                                        <Grid item md={5} xs={12} >
                                            <ItemBanner itemClass={params.itemClass} />
                                        </Grid>
                                        <Grid item md={3} xs={12}>
                                            <TextField onChange={(e) => setMode(e.target.value)} select fullWidth color="secondary" label="Mode" value={mode} variant="outlined" >
                                                <MenuItem value="normal">Normal</MenuItem>
                                                <MenuItem value="runestone">Runestone Stopwatch</MenuItem>
                                                <MenuItem value="scarab">Golden Scarab</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item md={4} xs={12} spacing={2} container justifyContent="space-between" direction="column"  >
                                            <Grid item >
                                                <Button
                                                    onClick={() => openCalculateResult(perkCalculator.current.calculateTotal(selectedPerks, mode))}
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
                                                        selectedPerks.flat().filter(perk => perk.charm).length >= modes[mode].charmPerks}
                                                    color="secondary"
                                                    style={{ minHeight: '4em' }} fullWidth variant="outlined"
                                                    onClick={() => openCalculateMostEfficientCharm(perkCalculator.current.calculateMostEfficientCharm(selectedPerks, mode))}

                                                >
                                                    Calculate most efficient charm
                                                </Button>

                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} >
                                <PerkContainerAll handleAddPerkWithCharm={handleAddPerkWithCharm} onDelete={handleDelete} onDrop={handleDrop} selectedPerks={selectedPerks} test={1} charmPerkNumber={ modes[mode].charmPerks }  />
                            </Grid>
                            <Grid item xs={12} >
                                <Paper style={{ padding: '1em' }} >
                                    <PerkSelector onSelect={isMobile ? onSelect : undefined} draggable itemClass={params.itemClass} selectedPerks={selectedPerks} filterSelectedLabels />
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