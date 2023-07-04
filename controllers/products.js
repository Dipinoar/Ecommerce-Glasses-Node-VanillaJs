const productos =require("../models/products.js");


const getProducts = async () => {
    try {
        const products = await productos.findAll();
        return products
    } catch (e) {
        console.log(e);
    } 
};





const putProducto = async (sku,columna,valor) => {
    try {        
        const producto = await productos.findByPk(sku);
         producto[columna] = valor
         await producto.save()
    } catch (e) {
        console.log(e);
    } 
};



module.exports={getProducts, putProducto}
