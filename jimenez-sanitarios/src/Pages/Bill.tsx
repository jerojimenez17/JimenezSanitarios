import { Button } from '@mui/material'
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import CartItems from '../components/cart/CartItems'
import CartState from '../models/CartState'
import { db } from '../services/FireBase'

const Bill = () => {
  
  const [sales, setsales] = useState<DocumentData>();
  
  const getSales =async () => {
    const querySnapshot = await getDocs(collection(db,'sales'));
    if(querySnapshot){
      return querySnapshot.docs.products;
      
    }
    else{ 
      return null;
    }
  }
  
  useEffect(() => {
    getSales();
  
  }, [])


  return (
    <Button onClick={()=>{
      setsales(getSales())
      }}>
    click
  </Button>
  {sales.map((sale)=>(
    <Typography>{}</Typography>
  ))}
  )
}

export default Bill


