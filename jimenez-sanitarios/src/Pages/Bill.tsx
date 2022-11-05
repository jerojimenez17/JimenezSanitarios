import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import CartItems from '../components/cart/CartItems'
import CartState from '../models/CartState'
import { db } from '../services/FireBase'

const Bill = () => {
  
  const [sales, setsales] = useState<CartState[]>([]);
  
  const getSales =async () => {
    const querySnapshot= await getDocs(collection(db, 'sales')) as unknown as CartState[];
    let temp = sales;
    querySnapshot.forEach((doc : CartState) => {
      temp.push(doc);
      setsales(temp);
      console.log(sales);
    })
    }
  
  useEffect(() => {
    getSales();
    console.log(sales)
  }, []);


  return(
    <Table>


<TableHead>
  <TableRow>
    <TableCell>

    <Button onClick={getSales}>
      click
    </Button>
    </TableCell>

  <TableCell>Descripcion</TableCell>
  </TableRow>
</TableHead>
<TableBody>

    {sales.map((sale)=>(
  <TableRow>
        
          <TableCell>
{         sale.date?.toDateString()

/* 
        {sale.products.map((product)=>(
          <TableRow>
            <TableCell>

            {product.description}
            </TableCell>
          </TableRow>
        ))} */}
        </ TableCell>
        </TableRow>
     
    ))}
    </TableBody>
    
  </Table>
  );
};

export default Bill;


