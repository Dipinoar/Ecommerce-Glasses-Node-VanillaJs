let productosCarro = [];

function main() {
  try {
    productosCarro = JSON.parse(localStorage.getItem("productos")) || [];
    actualizarCarro(productosCarro);
    //cargarProductos(productos);
  } catch (error) {
    localStorage.setItem("productos", JSON.stringify([]));
    productosCarro = JSON.parse(localStorage.getItem("productos"));
    actualizarCarro(productosCarro);
    //cargarProductos(productos);
  }
}

main();

//FUNCION ENCARGADA DE CARGAR PRODUCTOS
/*
function cargarProductos(listadoProductos){

    let acumulador = "";
    listadoProductos.forEach((producto) => {

        let template = `
        
            <div class="col-12 col-md-6 col-lg-4 my-2">
                <div class="card m-auto my-3" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">Precio: $ ${producto.precio}</p>
                    <p class="card-text text-success">Descuento: - $ ${producto.descuento}</p>
                    <p class="card-text text-warning">Precio final: $ ${producto.precio - producto.descuento}</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <a href="" class="btn btn-outline-primary" target="_blank">Ver más</a>
                    <a href="" class="btn btn-outline-success" data sku="${producto.sku}" onclick="addToCart('${producto.sku}')">Comprar</a>
                  </div>
              </div>
            </div>
         </div>
           
        `
        acumulador += template; 

    });
    document.querySelector("#productos .row").innerHTML = acumulador; 

}
*/

function addToCart(sku) {
  let objProducto = {
    sku,
    cantidad: 1,
  };

  let productoEncontrado = productosCarro.find(
    (producto) => producto.sku == sku
  );

  if (productoEncontrado) {
    productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
  } else {
    productosCarro.push(objProducto);
  }
  
  actualizarCarro(productosCarro);

}

function actualizarCarro(listadoProductos) {
  localStorage.setItem("productos", JSON.stringify(listadoProductos));

  const valorInicial = 0;
  const sumaProductos = listadoProductos.reduce(
    (acumulador, producto) => acumulador + producto.cantidad,
    valorInicial
  );
  document.querySelector("#cantidad-productos").innerText = sumaProductos;
  disabledBoton(listadoProductos)
}

function disabledBoton(productosCarro){
  productosCarro.forEach( producto=> {
    let boton=document.querySelector(`[data-sku="${producto.sku}"]`)
    boton.className = "btn disabled"
    boton.innerHTML="¡Agregado al carrito!"})}

