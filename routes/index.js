var express = require('express');
var router = express.Router();
//const {productos}=require("../assets/js/productos.js");
const productos2=require("../controllers/products.js");




/* GET home page. */
/*
router.get('/', function(req, res, next) { 
  res.render('index', { title: 'Gafas de Sol', productos});
});
*/


router.get('/', async(req,res)=>{
  try{
    const products=await productos2.getProducts();
    res.render('index', { title: 'Gafas de Sol', products})   
  }catch(error){
    res.render('error',{ title: "👤 Don't success"})
  }
  
});



module.exports = router;
