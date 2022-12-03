import { Grid, Tooltip } from "@mui/material";
import React from "react";
import PerkIcon from "./PerkIcon";
import PerkNameDesc from "./PerkNameDesc";
import PerkLabel from "./PerkLabel";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

function PerkBanner(props) {
  const { perk, disabled, itemClass, gs, onSelect } = props;

  const rippleRef = React.useRef(null);

  const renderContent = () => {
    const imgSrc = `${process.env.PUBLIC_URL}/res/${perk.icon}`;
    const charmSrc = `${process.env.PUBLIC_URL}/res/${perk.charm.icon}`;
    return (
      <div
        type="button"
        style={{
          position: "relative",
          backgroundColor: "#151714",
          cursor: "pointer",
        }}
        onClick={() => onSelect(perk)}
        onMouseDown={(e) => rippleRef.current.start(e)}
        onMouseUp={(e) => rippleRef.current.stop(e)}
      >
        <Grid
          container
          style={{
            padding: "1em 2em 1em 0.5em",
            height: "12em",
          }}
          justifyContent="space-between"
        >
          <Grid container item xs={2} justifyContent="space-between" direction="column">
            <Grid item>
              <PerkIcon imgSrc={imgSrc} />
            </Grid>
            <Grid item>
              <Tooltip title={perk.charm.name} >
                <img style={{ width: "2.5em" }} alt="charm icon" src={charmSrc} />
              </Tooltip>

            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={10}
            wrap="nowrap"
            justifyContent="space-between"
            direction="column"
          >
            <Grid item xs={10} >
              <PerkNameDesc perk={perk} gs={gs} itemClass={itemClass} />
            </Grid>
            <Grid container justifyContent="space-between" item xs={2} >
              <Grid item>
                <PerkLabel perk={perk} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TouchRipple ref={rippleRef} center={false} />
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
