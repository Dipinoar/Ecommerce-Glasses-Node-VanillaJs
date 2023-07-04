const compra =require("../models/compra.js");
const detalleCompra =require("../models/detalle_compra.js");
const productos =require("./products.js");
const productosModel =require("../models/products.js");


const compraYDetalle = async () => {
    try {
      const nuevaCompra = await compra.max('detallepago_id')
      .then((nuevaCompra)=>{
      let maxId=(nuevaCompra === null) ? 1 : parseInt(nuevaCompra)+1
      return maxId})      
      .then((maxId)=>{
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            const nuevoDetalle= compra.create({
                fecha: today,
                detallepago_id:maxId,
              });
            return nuevoDetalle
        }) 
    } catch (error) {
      console.log(error);
    }
  };

 


const detallesCompra = async (productoSku, cantidad) => {
    try {             
        const nuevaCompra = await compra.max('detallepago_id')
        .then(nuevaCompra=>{
        const nuevoDetalle = detalleCompra.create({
            producto_sku:productoSku,
            cantidad_compra:cantidad,
            compra_id:nuevaCompra
          })
        })
        .then(()=>{
            const productoEncontrado = productosModel.findByPk(productoSku);
            return productoEncontrado
            })
        .then((productoEncontrado)=>{
            productos.putProducto(productoSku,"stock",(productoEncontrado.stock-cantidad))
        })
    } catch (e) {
        console.log(e);
    } 
}; 



module.exports={detallesCompra,compraYDetalle}
