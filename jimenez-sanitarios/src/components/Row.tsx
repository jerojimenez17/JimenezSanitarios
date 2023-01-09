import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Product from "../models/Product";

interface rowProps {
  row: DocumentData;
}

const Row = ({ row }: rowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand now"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography
            variant="h6"
            component="div"
            color={open ? "primary" : ""}
          >
            {row.client}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h6">
            {new Date(row.date.seconds * 1000).toLocaleDateString()}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="h6">
            $
            {row.products
              .reduce(
                (acc: number, cur: { price: number; amount: number }) =>
                  acc + cur.price * cur.amount,
                0
              )
              .toFixed()}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit component={Paper}>
            <Box sx={{ margin: 1, backgroundColor: "#f0f0f0", boxShadow: 2 }}>
              <Typography
                m={2}
                variant="h6"
                gutterBottom
                component="div"
                color="primary"
              >
                Productos de {row.client}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Codigo</TableCell>
                    <TableCell align="right">Descripcion</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right"> Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product: Product) => (
                    <TableRow>
                      <TableCell align="right">{product.cod}</TableCell>
                      <TableCell align="right">{product.description}</TableCell>
                      <TableCell align="right">{product.amount}</TableCell>
                      <TableCell align="right">
                        ${Number(product.price).toFixed()}
                      </TableCell>
                      <TableCell align="right">
                        ${(product.price * product.amount).toFixed()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
