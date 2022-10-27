import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const CharmIcon = ({ charmSrc, perk, isDragging }) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  return (
    <Tooltip
      open={tooltipOpen && !isDragging}
      arrow
      placement="top"
      title={perk.charm.name}
    >
      <IconButton
        onClick={() => {
          setTooltipOpen(true);
          setTimeout(() => setTooltipOpen(false), 3000);
        }}
      >
        <img style={{ width: "1.5em" }} alt="charm icon" src={charmSrc} />
      </IconButton>
    </Tooltip>
  );
};

export default CharmIcon;
