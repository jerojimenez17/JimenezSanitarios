



import { useContext, useEffect, useRef, useState } from "react";
import Product from "../../models/Product";
import CartProvider from "./context/CartProvider";
import { CartContext } from "./context/CartContext";
import CartItem from "./CartItems";
import CartItems from "./CartItems";
import { Box, Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintIcon from '@mui/icons-material/Print';
import { EditSharp } from "@mui/icons-material";
import JimenezLogo from '../../assets/JimenezLogo.jpeg';


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
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })

  const [edit, setEdit ] = useState<boolean>(false);
  return (
    <Box>

      <Paper className="itemCart">
        <Box ref={ref}>

        {/* <Typography variant="h3" className="title-card" color="primary" ml={1}>
          Jimenez Sanitarios
          </Typography>  */}
        <img src={JimenezLogo} alt="Jimenez Sanitarios"/>     
        <Divider />
    
        {
          
          <CartItems edit={edit}/>
          
          
          
        }
        <Divider />
        <Box display="flex" justifyContent="flex-end">
          <Typography variant="h4" className="title-card" color="primary" mr={1}>
            Total: {cartState.products.reduce((acc, cur) => acc + cur.price *cur.amount, 0).toFixed()}
            </Typography>
        </Box>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button color="success"  variant="contained" onClick={handleDeleteAll}>
            Vender
          </Button>
          <IconButton onClick={()=>setEdit(!edit)}>
            <EditSharp/>
          </IconButton>
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
