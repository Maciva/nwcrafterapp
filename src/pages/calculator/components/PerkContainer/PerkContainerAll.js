import { Grid } from "@mui/material";
import React from "react";
import PerkContainerSingle from "./PerkContainerSingle";

export default function PerkContainerAll(props) {

    const { selectedPerks, onDrop, onDelete, handleAddPerkWithCharm } = props;

    const canDrop = (perk, index) => {
        const others = !selectedPerks.filter((el, i) => i !== index).some(perkList => {
            return perkList.filter(innerPerk => innerPerk.perk.perkId !== perk.perkId).some(innerPerk => innerPerk.perk.label.some(label => perk.label.includes(label)))
        });
        if (!others) {
            return false;
        }
        const charm = !selectedPerks[index].some(innerPerk => innerPerk.charm);
        return charm;
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
                return <Grid item md={4} xs={12} key={generateKeyWithSuffix(index)} >
                    <PerkContainerSingle handleAddPerkWithCharm={handleAddPerkWithCharm} onDelete={onDelete} canDrop={(perk) => canDrop(perk, index)} onDrop={onDrop} perks={perkList} index={index} />
                </Grid>
            })}
        </Grid>

    )

}