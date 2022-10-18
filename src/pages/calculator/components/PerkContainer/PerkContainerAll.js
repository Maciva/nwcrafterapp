import { Grid } from "@mui/material";
import React from "react";
import utils from "../../../../utils/utils";
import PerkContainerSingle from "./PerkContainerSingle";

export default function PerkContainerAll(props) {
    const { selectedPerks, onDrop, onDelete, handleAddPerkWithCharm, selector, selectorPerk, charmPerkNumber } = props;

    const canDrop = (perk, index) => {
        return utils.canPutPerk(perk, index, selectedPerks);
    }

    const generateKeyWithSuffix = (index) => {
        return `${index}:${generateKey()}`
    }

    const generateKey = () => {
        return selectedPerks.map((list, index) => `${index}:${list.join(",")}`);
    }

    const handleClick = (index) => {
        const item = {
            charm: false,
            fromContainerId: undefined,
            perk: selectorPerk
        }
        onDrop(index, item)
    }
    return (

        <Grid container spacing={4} >
            {selectedPerks.map((perkList, index) => {
                const charm = index < charmPerkNumber;
                return <Grid item md={4} xs={12} key={generateKeyWithSuffix(index)} >
                    <PerkContainerSingle
                        onClick={() => handleClick(index)}
                        selector={selector}
                        selectorPerk={selectorPerk}
                        handleAddPerkWithCharm={handleAddPerkWithCharm}
                        onDelete={onDelete}
                        canDrop={(perk) => canDrop(perk, index)}
                        onDrop={onDrop}
                        perks={perkList}
                        index={index}
                        charm={charm}
                    />
                </Grid>
            })}
        </Grid>

    )

}