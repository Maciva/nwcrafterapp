import { Typography, Grid } from "@mui/material";

const PerkNameDesc = (props) => {
  let { perk, gs, itemClass } = props;
  const getItemClassBonusGs = () => {
    for (let element in perk.itemClassBonuses) {
      let itemClassBonus = perk.itemClassBonuses[element];
      if (itemClassBonus.itemClass === itemClass) {
        return itemClassBonus.gsBonus;
      }
    }
    return 0;
  };

  const generateDescription = () => {
    let description = perk.description;
    let gss = gs + getItemClassBonusGs() - 100;
    /* eslint-disable */
    let perkMultiplier = gss * perk.gsScaling + 1;
    return eval("`" + description + "`");
    /* eslint-enable */
  };

  return (
    <Grid
      container
      direction="column"
      style={{
        marginLeft: "1em",
        height: "8.2em",
        textOverflow: "ellipsis",
        overflow: "hidden",
      }}
      wrap="nowrap"
    >
      <Typography variant="h6">{perk.name}</Typography>
      <Typography variant="body2" align="left">
        {generateDescription()}
      </Typography>
    </Grid>
  );
};

export default PerkNameDesc;
