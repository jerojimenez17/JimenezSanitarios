



import { useContext, useEffect, useRef, useState } from "react";
import Product from "../../models/Product";
import CartProvider from "./context/CartProvider";
import { CartContext } from "./context/CartContext";
import CartItem from "./CartItems";
import CartItems from "./CartItems";
import { Box, Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import ReactToPrint from "react-to-print";
import PrintIcon from '@mui/icons-material/Print';


function Cart() {
  const [amount, setAmount] = useState<number>(0);
  const [suma, setSuma] = useState(0);

  const { cartState,removeAll} = useContext(CartContext);
  useEffect(() => {
    console.log(cartState) 
  }, []);

  const handleDeleteAll = () => {
    removeAll();
  }
  const handlePrint = () => {
    window.print();
  }
  return (
    <Box>

      <Paper className="itemCart">
        <Typography variant="h3" className="title-card" color="primary">
          Venta
          </Typography> 
      
        <Divider />
    
        {
          
        <CartItems />
        
        
        
        }
        <Divider />
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="h4" className="title-card" color="primary">
            Total: {cartState.products.reduce((acc, cur) => acc + cur.price *cur.amount, 0).toFixed(2)}
            </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button color="success"  variant="contained" onClick={handleDeleteAll}>
            Vender
          </Button>
          <Button variant="outlined" color="secondary">
            A Cuenta
          </Button>
          <IconButton onClick={handlePrint}>
            <PrintIcon />
          </IconButton>
        </Box>
      </Paper>
        </Box>
  
  );
}

export default Cart;
