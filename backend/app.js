const express = require("express");
const bodyParser = require("body-parser"); 
const readExcelFile = require("./utils/readExcelFile");
var cors = require('cors')

const app = express();
app.use(cors())

// body parser to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// API ROUTES 

// app.post("/postFile",(req,res)=>{
//     const data=req.body;
// });

// ["code", "description", "brand", "iva", "price"]

app.get("/api/productos/taladro",(req,res)=>{ 
    const products = readExcelFile(4, [0, 1, -1, 5, 7], "./excel-files/Taladro.xlsx");
    res.send(products); 
});

app.get("/api/productos/trebol",(req,res)=>{ 
    const products = readExcelFile(3, [0, 1, -1, 3, 2], "./excel-files/trebol.xlsx");
    // set iva price
    res.send(products.map(product => 
        product.iva == "B" ? 
            {
                ...product,
                price:  product.price * 1.1 * 1.5
            } :
            {
                ...product,
                price: product.price * 1.21 * 1.5
            } ));
});
 
app.get("/api/productos/cerrajeria",(req,res)=>{ 
    const products = readExcelFile(7, [0, 2, -1, -1, 3], "./excel-files/ListaCerrajeria.xlsx");
    res.send(products.map(product =>  
        ({...product, price: product.price *1.21 * 1.5}))); 
});
app.get("/api/productos/nexo",(req,res)=>{ 
    const products = readExcelFile(23, [0, 2, -1, -1, 9], "./excel-files/nexo.xlsx");
    res.send(products.map(product =>  
        ({...product, price: product.price *1.21 * 1.5}))); 
});

app.get("/api/productos/jm",(req,res)=>{ 
    const products = readExcelFile(1, [0, 1, 2, -1, 4], "./excel-files/jm.xlsx");
    res.send(products.map(product =>
        ({...product, price: product.price * 1.5})));
        
});

// start server
app.listen(3002,()=>{
    console.log("Listening in port 3001");
});
