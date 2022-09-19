import { Dialog, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

export default function CharmDialog(props) {

    let { open, handleClose, result } = props;

    const generateRows = () => {
        return result.sort((a,b) => {
            if(a.probability < b.probability) {
                return 1;
            } else if (a.probability > b.probability) {
                return -1;
            }
            return 0;
        }).map((element, key) => {
            return (
                <TableRow key={key} >
                    <TableCell>{element.perk.perk.name}</TableCell>
                    <TableCell>{element.perk.perk.charm.name}</TableCell>
                    <TableCell>{`${element.probability*100}%`}</TableCell>
                    <TableCell>{`${Math.round(1/element.probability)} tries`}</TableCell>
                </TableRow>
            )
        })
    } 

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
                    <TableHead>
                        <TableRow>
                            <TableCell>Perk</TableCell>
                            <TableCell>Charm</TableCell>
                            <TableCell>Probabilty</TableCell>
                            <TableCell>Avg. Tries</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {generateRows()}
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>
    )

}
