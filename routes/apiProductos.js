var express = require('express');
var router = express.Router();
const productos2=require("../controllers/products.js");




router.get('/', async(req,res)=>{
    try{
        const products=await productos2.getProducts();
        res.send(JSON.stringify(products));  
      }catch(error){
        res.render('error',{ title: "👤 Don't success"})
      }  
});

router.put('/', async(req,res)=>{
    let productoModificar=req.body;
    try{
        await productos2.putProducto(productoModificar.sku,productoModificar.columna, productoModificar.valor)
        const products=await productos2.getProductsStock();
        res.send(JSON.stringify(products)); 
      }catch(error){
        res.render('error',{ title: "👤 Don't success"})
      }  
});



module.exports = router;
