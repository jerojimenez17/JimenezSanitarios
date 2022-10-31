import { useContext, useEffect, useRef, useState } from "react";
import Product from "../../models/Product";
import CartProvider from "./context/CartProvider";
import { CartContext } from "./context/CartContext";
import CartItem from "./CartItems";
import CartItems from "./CartItems";
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import {
  Box,
  Button,
  Divider,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { EditSharp } from "@mui/icons-material";
import { db } from "../../services/FireBase";
import { addDoc, collection } from "firebase/firestore";
// import JimenezLogo from "../../assets/logo";

function Cart() {
  const [amount, setAmount] = useState<number>(0);
  const [suma, setSuma] = useState(0);
  const [fecha, setFecha] = useState<Date>();
  const { cartState, removeAll,discount,total,clientName } = useContext(CartContext);
  const [discountState, setDiscountState] = useState(0);
  useEffect(() => {
    discount(discountState);
  }, []);
  
  useEffect(() => {
    total();
    discount(discountState);
  }, [cartState.products, discountState]);

  
  const handleDeleteAll = () => {
    removeAll();
  };
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  useEffect(() => {
    
    const hoy = Date.now();
    setFecha(new Date(hoy));
  },[handlePrint]);
  
  // useEffect(() => {
  //   setTimeout(() =>{
  //   clientName("");}
  //   ,500);
  // },[handlePrint]);
  

  const handleDiscount = (e: any) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
      setDiscountState(e.target.value);
      discount(discountState);
    }
  };
  const [focus,setFocus] = useState(true);
  const [edit, setEdit] = useState<boolean>(false);
  const handleClient = (e: any) => {
    if(e.key === "Enter"){
      clientName(e.target.value);
    }
  }
  const collectionRef = collection(db,'sales');
  const handleSaveSale = ()=> {
    addDoc(collectionRef, 
      cartState)
    
      removeAll();
  }

  return (
    <Box>
      <Paper className="itemCart">
        <Box ref={ref}>
          {/* <Typography variant="h3" className="title-card" color="primary" ml={1}>
          Jimenez Sanitarios
          </Typography>  */}
          <Box display="flex">
            <div className="logo">
              <img
                className="img-logo"
                
                alt="Jimenez Sanitarios"
              />
            </div>
            <div className="date-customer-container">
              <Typography variant="h6" className="date">
                Fecha: {fecha?.toLocaleDateString()}   { fecha?.toLocaleTimeString()}
              </Typography>
              {
                (cartState.client!=="") &&
              (<Typography className="customer" variant="h6">
                Cliente: {cartState.client}
              </Typography>)
              }
            </div>
          </Box>

          <Divider />

          <CartItems edit={edit} />
          <Divider />
          <Box display="flex" flexDirection='row' justifyContent="space-between" mt={2}>
          
            {edit? (
              <FormControl sx={{ m: 1, width: '10ch' }} variant="standard">
              <TextField variant='standard' label='Cliente' placeholder={cartState.client} aria-label='cliente' onKeyDown={handleClient}/>
          <FilledInput
            id="filled-adornment"
            onKeyDown={handleDiscount}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            aria-describedby="filled-weight-helper-text"
            inputProps={{
              'aria-label': 'descuento',
            }}
          />
          <FormHelperText id="filled-weight-helper-text">Descuento</FormHelperText>
          </FormControl>
            ):
            (<Box ml={2}>
            <Typography variant="h6" >Descuento: {discountState}%</Typography>
            </Box>
            )}
            <Box >
              <Typography
                variant="h5"
                className="title-card"
                color="primary"
                mr={1}
              >
                Total: ${cartState.total.toFixed()}
              </Typography>{( discountState!==0)&&
              <Typography
                variant="h5"
                className="title-card"
                color="primary"
                mr={1}
              >
                Total con Descuento: ${cartState.totalWithDiscount.toFixed()}
              </Typography>
              }
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Button color="success" variant="contained" onClick={handleSaveSale} >
            Vender
          </Button>
          <Button variant="outlined" color="secondary" disabled>
            A Cuenta
          </Button>
          <IconButton onClick={() => setEdit(!edit)}>
            <EditSharp />
          </IconButton>
          <IconButton onClick={handlePrint} onClickCapture={() => {edit && setEdit(!edit)}}>
            <PrintIcon />
          </IconButton>
          
        </Box>
      </Paper>
    </Box>
  );
}

export default Cart;
