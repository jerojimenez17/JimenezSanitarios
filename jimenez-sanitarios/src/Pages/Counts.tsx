import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import {
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CartItems from "../components/cart/CartItems";
import CartState from "../models/CartState";
import Product from "../models/Product";
import { db, fetchSales } from "../services/FireBase";
import Row from "../components/Row";

const Counts = () => {
  const [sales, setsales] = useState<DocumentData[] | null>([]);

  useEffect(() => {
    fetchSales().then((data: DocumentData[] | null) => {
      console.log(data);
      setsales(data);
    });
    console.log(sales);
  }, []);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      console.log(panel);
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box mt={2}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="h6" color="primary.light">
                  Cliente
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" color="primary.light">
                  Fecha
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" color="primary.light">
                  Total
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales?.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Counts;
