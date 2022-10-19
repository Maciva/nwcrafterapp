import { Grid, Tooltip } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../utils/ItemTypes";
import PerkIcon from "./PerkIcon";
import PerkNameDesc from "./PerkNameDesc";
import PerkLabel from "./PerkLabel";
import CharmIcon from "./CharmIcon";

function PerkBanner(props) {
  const { perk, draggable, disabled, itemClass, gs } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PERK,
    item: { perk: perk },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const renderContent = () => {
    const imgSrc = `${process.env.PUBLIC_URL}/res/${perk.icon}`;
    const charmSrc = `${process.env.PUBLIC_URL}/res/${perk.charm.icon}`;
    return (
      <div
        ref={draggable && !disabled ? drag : undefined}
        style={{
          backgroundColor: "#151714",
          opacity: isDragging || disabled ? 0.5 : 1,
          cursor: draggable && !disabled ? "grab" : "auto",
        }}
      >
        <Grid
          container
          style={{
            padding: "1em 2em 1em 0.5em",
            height: "12em",
          }}
          direction="column"
          justifyContent="space-between"
        >
          <Grid container item>
            <Grid container item xs={2} justifyContent="space-between" direction="column">
              <PerkIcon imgSrc={imgSrc} />
              <CharmIcon charmSrc={charmSrc} perk={perk} isDragging={isDragging} />
            </Grid>
            <Grid
              container
              item
              xs={10}
              spacing={1}
              justifyContent="space-between"
              direction="column"
            >
              <PerkNameDesc perk={perk} gs={gs} itemClass={itemClass} />
              <PerkLabel perk={perk} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <>
      {!disabled ? (
        renderContent()
      ) : (
        <Tooltip
          title={
            <h3>
              This perk can not be rolled and therefor not be selected. If you want to craft an item
              with this perk chose "Add Perk With Charm" instead.
            </h3>
          }
        >
          {renderContent()}
        </Tooltip>
      )}
    </>
  );
}

export default PerkBanner;
