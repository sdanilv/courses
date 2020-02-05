import TableContainer from "@material-ui/core/TableContainer";
import style from "../Students/Students.module.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {withStyles} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";



export default props => <TableContainer className={style.tableContainer} component={Paper}>
    <Table className={style.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                {props.columnsNames.map((columnName, index)=><StyledTableCell key={index}>{columnName}</StyledTableCell> )}
            </TableRow>
        </TableHead>
        <TableBody>
            {props.body}
        </TableBody>
    </Table>
</TableContainer>;

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.text.secondary,
        color: theme.palette.common.white,
    },
    body: {
    },
}))(TableCell);