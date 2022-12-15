import React, { useContext, useEffect, useState } from "react";

import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Product from "../../models/Product";
import { CartContext } from "../cart/context/CartContext";
interface propsGrid {
  products: Product[];
}
const ProductGrid = ({ products }: propsGrid) => {
  const columns: GridColDef[] = [
    {
      field: "cod",
      headerName: "Codigo",
      headerClassName: "header-grid",
      width: 120,
    },
    {
      field: "description",
      headerName: "Descripcion",
      headerClassName: "header-grid",
      width: 450,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Marca",
      headerClassName: "header-grid",
      width: 180,
      editable: true,
    },
    {
      field: "price",
      headerName: "Precio",
      headerClassName: "header-grid",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  const { addItem } = useContext(CartContext);
  const [selectionModel, setSelectionModel] = useState<Product[]>([]);

  useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel, setSelectionModel]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 2,
        }}
        className="products-grid"
        rows={products}
        columns={columns}
        pageSize={20}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = products
            .filter((row) => selectedIDs.has(row.id.toString()))
            .map((row) => {
              addItem(row);
            });
        }}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default ProductGrid;
