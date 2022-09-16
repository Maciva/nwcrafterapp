import { Chip, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../utils/ItemTypes";
import AddIcon from '@mui/icons-material/Add';

function PerkBanner(props) {

    const [tooltipOpen, setTooltipOpen] = React.useState(false);

    const { perk, draggable, onSelect } = props;

    const getItemClassBonusGs = () => {
        for (let element in perk.itemClassBonuses) {
            let itemClassBonus = perk.itemClassBonuses[element];
            if (itemClassBonus.itemClass === props.itemClass) {
                return itemClassBonus.gsBonus;
            }
        }
        return 0;
    }

    const generateDescription = () => {
        let description = perk.description;
        let gs = props.gs + getItemClassBonusGs() - 100;
        /* eslint-disable */
        let perkMultiplier = gs * perk.gsScaling + 1;
        return eval('`' + description + '`');
        /* eslint-enable */
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PERK,
        item: { perk: perk },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }))

    const renderContent = () => {
        const imgSrc = `../../../res/${perk.icon}`;
        const charmSrc = `../../../res/${perk.charm.icon}`;
        return (
            <div
                ref={draggable ? drag : undefined}
                style={{
                    backgroundColor: '#151714',
                    opacity: isDragging ? 0.5 : 1,
                    cursor: draggable ? 'grab' : 'auto'
                }}
            >
                <Grid
                    container
                    style={{
                        padding: '1em 1em 1em 0.5em',
                        height: '12em'
                    }}
                    direction="column"
                    justifyContent="space-between"
                >
                    <Grid
                        spacing={4}
                        container
                        item
                    >
                        <Grid xs={2} item justifyContent="space-between" container direction="column" >
                            <Grid item style={{ paddingLeft: '0.3em' }} >
                                <img src={imgSrc} alt="" style={{ width: '2.5em' }} />
                            </Grid>
                            <Grid item>
                                <Tooltip open={tooltipOpen && !isDragging} arrow placement="top" title={perk.charm.name} >
                                    <IconButton
                                        onClick={() => {
                                            setTooltipOpen(true);
                                            setTimeout(() => setTooltipOpen(false), 3000)
                                        }}
                                    >
                                        <img style={{
                                            width: '1.5em',
                                        }} alt="" src={charmSrc} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item xs={10}
                            spacing={1}
                            justifyContent="space-between"
                            direction="column"
                        >
                            <Grid item container direction="column"
                                style={{ height: '8.5em', textOverflow: 'ellipsis', overflow: "hidden" }}
                                wrap="nowrap"
                            >
                                <Grid item >
                                    <Typography variant="h6" >
                                        {perk.name}
                                    </Typography>
                                </Grid>

                                <Grid zeroMinWidth item >
                                    <Typography variant="body2" align="left" >
                                        {generateDescription()}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid spacing={2} container item >
                                <Grid container wrap="nowrap" justifyContent={"space-between"} spacing={2} item xs={12} >
                                    <Grid item container spacing={1} xs={10} >
                                        {
                                            perk.label.map((label, index) => {
                                                return (

                                                    <Grid item key={index} >
                                                        <Chip variant="outlined" label={label} />
                                                    </Grid>
                                                )
                                            })
                                        }

                                    </Grid>
                                    <Grid item xs={2} >
                                        {
                                            (onSelect &&
                                                <IconButton onClick={() => onSelect(perk)} style={{ padding: 0 }} >
                                                    <AddIcon fontSize="large" />
                                                </IconButton>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        )

    }

    return renderContent();

}

export default PerkBanner;