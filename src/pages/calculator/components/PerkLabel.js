import { Chip, Grid } from "@mui/material";

const PerkLabel = ({ perk }) => {
  return (
    <Grid container item>
      {perk.label.map((label, index) => {
        return (
          <Grid item key={index} style={{ marginLeft: "1em", marginBottom: "0.6em" }}>
            <Chip variant="outlined" label={label} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PerkLabel;
