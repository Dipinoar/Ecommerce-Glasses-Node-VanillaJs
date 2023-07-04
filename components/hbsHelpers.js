var helper = {
    aplicarDescuento: (precio, descuento, options) => {
        var data = {
            descuentoAplicado:precio-descuento
          }
        
        return options.fn(data);
    },

    if_cond: (stock, sku, options) => {
        var out = "";
        var data = {
            stock: stock,
            sku:sku
            }
        out += options.fn(data);
        return (stock!= 0) ? out : options.inverse(this);            
    },
};

module.exports = helper;