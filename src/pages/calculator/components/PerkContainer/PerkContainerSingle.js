import { Button, Paper, Stack, Tooltip, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import ReducedPerkBanner from "../ReducedPerkBanner";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../utils/ItemTypes";
import ClearIcon from '@mui/icons-material/Clear';

export default function PerkContainerSingle(props) {

    const { index, perks, onDrop, canDrop, onDelete, handleAddPerkWithCharm, selector } = props;

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const ref = React.useRef(null);

    const [{ canDropField, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.PERK,
        drop: (item, monitor) => onDrop(index, item),
        canDrop: (item, monitor) => canDrop(item.perk),
        collect: (monitor) => ({
            canDropField: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    }))

    useLayoutEffect(() => {
        if (!canDropField && isOver) {
            return;
        }
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
    });

    const getCause = () => {
        if(perks.some(perk => perk.charm)) {
            return "Can't add Perks to a Perk Slot with a charm"
        } else {
            return "This perk is exclusive with perks in other Perk Slots";
        }
    } 

    let content;
    if (!canDropField && isOver) {
        content = (
            <div style={{
                position: "absolute",
                height: height,
                width: width,
                border: 'solid',
                borderColor: '#FFAAAA',
                backgroundColor: '#552222',
                display: "flex",
                alignItems: "center",
            }} >
                <div style={{
                    marginLeft: 'auto', marginRight: 'auto', width: '100%',
                }}>
                    <ClearIcon sx={{ color: '#FFAAAA', marginLeft: 'auto', marginRight: 'auto', width: '100%', }} />
                    <Typography textAlign="center" sx={{ color: '#FFAAAA' }} >
                        {getCause()}
                    </Typography>

                </div>
            </div>
        )
    } else {
        content = (
            <div style={{ paddingTop: '1em' }}>
                <Typography style={{ margin: '0em 0em 0.5em 0.5em' }} variant="h6" >
                    {`Perk Slot ${index + 1}`}
                </Typography>
                {perks.map((perk, ind) => {
                    return <ReducedPerkBanner onDelete={(perk) => onDelete(index, perk)} key={perk.perk.perkId} containerId={index} perk={perk} />
                })}
                {
                    !perks.some(perk => perk.charm) && (
                        <Stack style={{ height: '5em', display: 'flex', alignItems: 'center', opacity: 0.5 }} direction='row' justifyContent={"center"} >
                            <Typography textAlign={"center"} >
                                Drag in Perks to add them to this pool
                            </Typography>
                        </Stack>

                    )
                }
                {
                    (index === 0) && (
                        <Stack style={{ height: '5em', display: 'flex', alignItems: 'center', opacity: 0.5 }} direction='row' justifyContent={"center"} >
                            <Tooltip title="Charms can only be added onto empty Perk Slots" open={tooltipOpen && (perks.length !== 0)} >
                                <div onMouseEnter={() => setTooltipOpen(true) } onMouseLeave={() => setTooltipOpen(false) } >
                                    <Button disabled={perks.length !== 0} onClick={handleAddPerkWithCharm} color="secondary" variant="outlined" >
                                        Add Perk with Charm
                                    </Button>
                                </div>
                            </Tooltip>
                        </Stack>
                    )
                }


            </div>
        )
    }

    return (
        <>
            <Paper ref={ref} >
                <div style={(!canDropField && isOver) ? { width: width, height: height } : {}} ref={drop} >
                    {content}
                </div>
            </Paper>

        </>

    )

}