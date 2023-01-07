import {
  AddBoxSharp,
  AddCircle,
  RemoveCircle,
  TableBar,
} from "@mui/icons-material";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TextField,
  Box,
  TableContainer,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/CartContext";
import Product from "../../models/Product";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
  edit: boolean;
}

const CartItems = ({ edit }: props) => {
  const {
    cartState,
    addUnit,
    removeUnit,
    removeItem,
    changePrice,
    changeAmount,
    total,
    discount,
  } = useContext(CartContext);
  const { products } = cartState;
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [newPrice, setNewPrice] = useState<Number>();
  const [newAmount, setNewAmount] = useState<Number>();

  const handleAddItem = (producto: Product) => {
    addUnit(producto);
  };
  const handleRemoveUnit = (producto: Product) => {
    removeUnit(producto);
  };
  const handleRemoveItem = (product: Product) => {
    removeItem(product);
  };

  const handleEditPrice = (e: any, product: Product) => {
    if (e.key === "Enter") {
      product.price = e.target.value;

      changePrice(product);
    }
  };
  const handleEditAmount = (e: any, product: Product) => {
    if (e.key === "Enter") {
      product.amount = e.target.value;
      changeAmount(product);
    }
  };

  return (
    <TableContainer className="cart-container">
      <Table className="table" size="medium" stickyHeader>
        <TableHead>
          <TableCell>Descripcion</TableCell>
          <TableCell>Marca</TableCell>
          <TableCell>Cantidad</TableCell>
          <TableCell>Precio</TableCell>
          <TableCell>Subtotal</TableCell>
          <TableCell></TableCell>
        </TableHead>

        {cartState.products.map((producto: Product, id: number) => (
          <TableRow key={producto.id} className="cart-row">
            <TableCell className="description">
              {producto.description}
            </TableCell>
            <TableCell className="marca">{producto.brand}</TableCell>
            {edit ? (
              <TableCell>
                <TextField
                  size="small"
                  className="input-edit-amount"
                  placeholder={producto.amount.toString()}
                  onKeyPress={(e: any) => {
                    handleEditAmount(e, producto);
                  }}
                  onChange={(e: any) => {
                    setNewAmount(e.target.value);
                  }}
                />
              </TableCell>
            ) : (
              <TableCell className="cantidad"> {producto.amount}</TableCell>
            )}
            {edit ? (
              <TableCell>
                <TextField
                  size="small"
                  className="input-edit-price"
                  onKeyPress={(e: any) => {
                    handleEditPrice(e, producto);
                  }}
                  onChange={(e: any) => {
                    setNewPrice(e.target.value);
                  }}
                  placeholder={"$" + Number(producto.price).toFixed()}
                />
              </TableCell>
            ) : (
              <TableCell>{"$" + Number(producto.price).toFixed()}</TableCell>
            )}
            <TableCell className="SubTotal">
              {" "}
              ${(producto.amount * producto.price).toFixed()}
            </TableCell>
            <TableCell>
              {edit && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                >
                  <IconButton
                    size="small"
                    color="success"
                    aria-label="addItem"
                    onClick={() => handleAddItem(producto)}
                  >
                    <AddCircle />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    aria-label="removeUnit"
                    onClick={() => handleRemoveUnit(producto)}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    aria-label="removeItem"
                    onClick={() => handleRemoveItem(producto)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default CartItems;
