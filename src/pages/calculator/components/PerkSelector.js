import { Autocomplete, Chip, Grid, InputAdornment, TextField } from "@mui/material";
import React from "react";
import PerkBanner from "../components/PerkBanner";
import perkBuckets from '../../../res/perkBuckets.json'
import perkMap from '../../../res/perkMapFiltered.json'
import SearchIcon from '@mui/icons-material/Search';
import utils from "../../../utils/utils";

function PerkSelector(props) {
    
    const { selectedPerks, forContainerIndex, itemClass, draggable, onSelect, charmPerks, filterSelectedLabels } = props;
    const [filter, setFilter] = React.useState('');
    const [filterLabels, setFilterLabels] = React.useState([]);
    const [excludedFilterLabels, setExcludedFilterLabels] = React.useState([]);
    const [filteredPerks, setFilteredPerks] = React.useState([]);


    const generatePerks = () => {
        let perksToFilter = perkBuckets[itemClass].inPool;
        perksToFilter = perksToFilter.concat(perkBuckets[itemClass].onlyWithCharm);
        return perksToFilter.map(perkId => {
            const result = perkMap[perkId]
            return result;
        })
        .sort((a, b) => {
            if(!charmPerks) {
                if(a.weight && !b.weight) {
                    return -1;
                } else if (!a.weight && b.weight) {
                    return 1;
                }
            }
            if (a.label[0] < b.label[0]) {
                return -1
            } else if (a.label[0] > b.label[0]) {
                return 1;
            } else {
                if (a.name < b.name) {
                    return -1
                } else if (a.name > b.name) {
                    return 1;
                } else {
                    return 0
                }
            }
        })
    }

    const perks = React.useRef(generatePerks());

    const generateOptions = React.useCallback(() => {
        const labels = new Set();
        perks.current.forEach(perk => {
            perk.label.filter(label => {
                return !excludedFilterLabels.includes(label) && !filterLabels.includes(label)
            }).forEach(label => {
                labels.add(label);
            })
        })
        return Array.from(labels).sort();
    }, [excludedFilterLabels, filterLabels])

    React.useEffect(() => {
        const newFilteredPerks = perks.current.filter(perk => {
            const bySelectedLabels = filterSelectedLabels && Number.isInteger(forContainerIndex) ? utils.canPutPerk(perk, forContainerIndex, selectedPerks) : true;
            const bySelectedPerks = !selectedPerks.flat().some(innerPerk => innerPerk.perk.perkId === perk.perkId)
            const byName = filter === ""
                || perk.name.toLowerCase().includes(filter.toLowerCase())
                || perk.description.toLowerCase().includes(filter.toLowerCase());
            const byLabel = filterLabels.length === 0 || perk.label.filter(label => filterLabels.includes(label)).length !== 0;
            const byExcludedLabel = perk.label.filter(label => excludedFilterLabels.includes(label)).length === 0;
            return byName && byLabel && byExcludedLabel && bySelectedPerks && bySelectedLabels;
        });
        setFilteredPerks(newFilteredPerks);
    }, [filter, excludedFilterLabels, filterLabels, selectedPerks]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }


    // rendering functions
    const renderFilters = () => {
        return <Grid item container spacing={4}>
            <Grid item md={4} xs={12} >
                <TextField
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    color="secondary"
                    label="Search"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </Grid>
            <Grid item md={4} xs={12} >
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={generateOptions()}
                    freeSolo
                    autoHighlight
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    onChange={(e, v) => setFilterLabels(v)}
                    renderInput={(params) => (
                        <TextField
                            color="secondary"
                            {...params}
                            label="Filter by Label"
                            placeholder="Label"
                        />
                    )}
                />
            </Grid>
            <Grid item md={4} xs={12} >
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={generateOptions()}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    onChange={(e, v) => setExcludedFilterLabels(v)}
                    renderInput={(params) => (
                        <TextField
                            color="secondary"
                            {...params}
                            label="Exclude Perks by Label"
                            placeholder="Label"
                        />
                    )}
                />
            </Grid>
        </Grid>
    }

    const renderContent = () => {
        return (
            <Grid spacing={4} direction="column" container >
                {renderFilters()}
                <Grid item container spacing={2} >
                    {filteredPerks.map((perk, index) => {
                        return (
                            <Grid key={perk.perkId} md={4} xs={12} item >
                                <PerkBanner disabled={!charmPerks && !perk.weight} onSelect={onSelect} draggable={draggable} perk={perk} gs={625} />
                            </Grid>
                        )
                    }
                    )}
                </Grid>
            </Grid>
        )

    }
    return renderContent();
}

export default PerkSelector;