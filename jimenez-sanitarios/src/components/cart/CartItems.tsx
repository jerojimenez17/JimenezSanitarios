
import { AddBoxSharp, AddCircle, RemoveCircle, TableBar } from '@mui/icons-material';
import { Table, TableCell, TableHead, TableRow, Typography, IconButton, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from './context/CartContext';
import Product from '../../models/Product';
import DeleteIcon from '@mui/icons-material/Delete';

interface props{
    product: Product;
}


const CartItems = () => {

    const { cartState,addUnit,removeUnit,removeItem } = useContext(CartContext);
    const { products } = cartState;
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    
    useEffect(() => {
      console.log(cartState);
      
    }, [cartState]);
    

    const handleAddItem = (producto:Product) => {
        addUnit(producto);
    }
    const handleRemoveUnit = (producto:Product) => {
        removeUnit(producto);
    }
    const handleRemoveItem = (product:Product) => {
        removeItem(product);
    }

  return (
   
    <Table className="table">
  
    <TableHead>
      
      <TableCell>Descripcion</TableCell>
      <TableCell>Marca</TableCell>
      <TableCell>Cantidad</TableCell>
      <TableCell>Precio</TableCell>
     
    </TableHead>

    {
      cartState.products.map((producto: Product, id: number) => (
        <TableRow key={producto.id} className="fila">
          
          <TableCell className="description">
            {producto.description}
          </TableCell>
          <TableCell className="marca">{producto.brand}</TableCell>
          <TableCell className="cantidad"> {producto.amount}</TableCell>
          <TableCell>
            <TextField value={"$" + (Number(producto.price)).toFixed()}/>
            
          </TableCell>
        
              <IconButton aria-label="addItem" onClick={()=>handleAddItem(producto)}>
                <AddCircle/>
              </IconButton>
              <IconButton aria-label="removeUnit" onClick={()=>handleRemoveUnit(producto)}>
                <RemoveCircle />
              </IconButton>
              <IconButton aria-label='removeItem' onClick={()=>handleRemoveItem(producto)}>
                <DeleteIcon />
              </IconButton>

        </TableRow>

      ))}
  </Table>
  )
};

export default CartItems;




