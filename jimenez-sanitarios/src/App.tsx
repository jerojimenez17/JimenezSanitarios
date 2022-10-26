import "./App.css";
import SearchAppBar from "./components/AppBar/SearchAppBar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Button,
  Drawer,
  List,
  ListItemAvatar,
  ListItemButton,
  IconButton,
  Menu,
} from "@mui/material";
import { useState, useContext } from "react";
import LeftDrawer from "./components/LeftDrawer";
import { Router } from "express";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import CartProvider from "./components/cart/context/CartProvider";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [searchText, setSearchText] = useState("");
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div className="App">
      <CartProvider>
        <SearchAppBar
          openDrawer={handleOpenDrawer}
          handleSearchText={setSearchText}
          searchText={searchText}
        />
        <LeftDrawer open={openDrawer} onClose={handleOpenDrawer} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/products"
              element={<Products />}
            />
            <Route path="*" element={<Navigate to='/products' />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
