import { Grid } from "@mui/material";
import React from "react";
import utils from "../../../../utils/utils";
import PerkContainerSingle from "./PerkContainerSingle";

export default function PerkContainerAll(props) {
    const { selectedPerks, onDrop, onDelete, charmPerkNumber, onAdd } = props;

    const canDrop = (perk, index) => {
        return utils.canPutPerk(perk, index, selectedPerks);
    }

    const generateKeyWithSuffix = (index) => {
        return `${index}:${generateKey()}`
    }

    const generateKey = () => {
        return selectedPerks.map((list, index) => `${index}:${list.join(",")}`);
    }

    return (

        <Grid container spacing={4} >
            {selectedPerks.map((perkList, index) => {
                const charm = index < charmPerkNumber;
                return <Grid item md={4} xs={12} key={generateKeyWithSuffix(index)} >
                    <PerkContainerSingle
                        charm={charm}
                        onDelete={onDelete}
                        canDrop={(perk) => canDrop(perk, index)}
                        onDrop={onDrop}
                        perks={perkList}
                        index={index}
                        onAdd={onAdd}
                    />
                </Grid>
            })}
        </Grid>

    )

}