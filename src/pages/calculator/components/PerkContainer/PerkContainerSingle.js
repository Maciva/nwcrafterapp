import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import ReducedPerkBanner from "../PerkBanner/ReducedPerkBanner";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../../utils/ItemTypes";
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

export default function PerkContainerSingle(props) {

    const { index, perks, onDrop, canDrop, onDelete, onAdd } = props;

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [firstRender, setFirstRender] = useState(true);

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

    React.useEffect(() => {
        setFirstRender(false);
    }, [])

    const shouldRenderDisable = () => {
        if (firstRender) {
            return false;
        }
        else {
            return !canDropField && isOver;
        }
    }

    useLayoutEffect(() => {
        if (!canDropField && isOver) {
            return;
        }
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
    });


    const getCause = () => {
        if (perks.some(perk => perk.charm)) {
            return "Can't add Perks to a Perk Slot with a charm"
        } else {
            return "This perk is exclusive with perks in other Perk Slots";
        }
    }

    let content;
    if (shouldRenderDisable()) {
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
            <div style={{ paddingTop: '1em', minHeight: '8em' }}>
                <Typography style={{ margin: '0em 0em 0.5em 0.5em', paddingBottom: '0.5em' }} variant="h6" >
                    {`Perk Slot ${index + 1}`}
                </Typography>
                {perks.map((perk, ind) => {
                    return <ReducedPerkBanner onDelete={(perk) => onDelete(index, perk)} key={perk.perk.perkId} containerId={index} perk={perk} />
                })}
                <Stack style={{ height: '3.5em', display: 'flex', alignItems: 'center' }} direction='row' justifyContent={"center"} >
                    <IconButton onClick={() => onAdd(index)} >
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Stack>
            </div>
        )
    }

    return (
        <>
            <Paper ref={ref} >
                <div style={shouldRenderDisable() ? { width: width, height: height } : {}} ref={drop} >
                    {content}
                </div>
            </Paper>

        </>

    )

}