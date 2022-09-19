import { Dialog, DialogTitle, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React from "react";

export default function CalculatorResultDialog(props) {

    let { open, handleClose, result } = props;

    const resultPercentage = `${result * 100}%`
    const tries = Math.round(1 / result);

    const [calcTries, setCalcTries] = React.useState(tries);

    const calculateProbabilty = () => {
        if(!calcTries || isNaN(calcTries)) {
            return "0%"
        }
        return `${(1-Math.pow(1-result, calcTries)) * 100}%`;
    }

    const handleChange = (e) => {
        let val = e.target.valueAsNumber;
        if(isNaN(val)) {
            setCalcTries(0);
            return;
        }
        setCalcTries(val);
    }

    React.useEffect(() => {
        setCalcTries(tries);
    }, [tries]);

    return (
        <Dialog

            maxWidth={'md'}
            onClose={handleClose}
            open={open}
            fullWidth
        >
            <DialogTitle>Calculation Result</DialogTitle>
            <TableContainer sx={{ fontSize: '2' }} component={Paper}>
                <Table sx={{ fontSize: '200pt' }} >
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontSize: '0.08em' }} >Probabilty:</TableCell>
                            <TableCell sx={{ fontSize: '0.08em' }}>{resultPercentage}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontSize: '0.08em' }} >Avg. Tries:</TableCell>
                            <TableCell sx={{ fontSize: '0.08em' }}>{tries}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontSize: '0.08em' }} >
                                <>
                                    {"Probabilty of hitting after: "}
                                    <TextField
                                        value={calcTries.toString()}
                                        onChange={handleChange}
                                        color="secondary"
                                        style={{ width: '5em', marginLeft: '0.5em' }}
                                        type="number"
                                        size="small"
                                        variant="standard"
                                        InputProps={{
                                            inputProps: {min: 0},
                                            endAdornment: <InputAdornment position="end">tries</InputAdornment>,
                                        }} />
                                </>
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.08em' }}>{calculateProbabilty()}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    )

}
