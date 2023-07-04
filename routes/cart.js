var express = require('express');
var router = express.Router();
const compraEcommerce=require("../controllers/compras.js");
const authController = require('../controllers/authController.js')

/* GET users listing. */
router.get('/', authController.isAuthenticated, function(req, res, next) {
  res.redirect('/login/dashboard')
});



router.post('/compraYDetalle', async(req,res)=>{
  let nuevaCompra=req.body;
  try{
      await compraEcommerce.compraYDetalle()
      .then(()=>{
        nuevaCompra.forEach(producto => {
          compraEcommerce.detallesCompra(producto.sku, producto.cantidad)     
        })
      res.send("Compra ha sido exitosa");})
    }catch(error){
      res.render('error',{ title: "👤 Don't success"})
    }  
});



module.exports = router;




