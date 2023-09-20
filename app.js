var carritoVisible = false;
var ordenarMayorBtn = document.getElementById('ordenarMayor');
var ordenarMenorBtn = document.getElementById('ordenarMenor');


document.addEventListener("DOMContentLoaded", function (){
    const contenedor = document.querySelector(".contenedor");

    const productos = [
    {
      nombre: "Fernet Branca 750cc",
      imagen: "img/fernet.jpg",
      precio: "$3499",
    },
    {
      nombre: "Arroz Gallo Oro",
      imagen: "img/arroz.jpg",
      precio: "$459",
    },
    {
      nombre: "Galletitas Diversion",
      imagen: "img/galletitas.jpg",
      precio: "$379",
    },
    {
      nombre: "Cerveza Patagonia 24.7 410cc",
      imagen: "img/cerveza.jpg",
      precio: "$319",
    },
    {
      nombre: "Desodorante Musk Axe 150ml",
      imagen: "img/desodorante.jpg",
      precio: "$349",
    },
    {
      nombre: "Leche Veronica 1L",
      imagen: "img/leche.jpg",
      precio: "$429",
    },
    {
      nombre: "Yerba Mate Playadito",
      imagen: "img/yerba.jpg",
      precio: "$1799",
    },
    {
      nombre: "Aceite Lira 900ml",
      imagen: "img/aceite.jpg",
      precio: "$1399",
    },
    {
      nombre: "Asado de novillito xKg",
      imagen: "img/asado.jpg",
      precio: "$2499",
    },
    {
      nombre: "Gaseosa Coca-Cola 1500ml",
      imagen: "img/cocacola.jpg",
      precio: "$569",
    },
    {
      nombre: "Papel Higienico Campanita XL",
      imagen: "img/papelhigienico.jpg",
      precio: "$479",
    },
    {
      nombre: "Whisky Red Label Johnnie Walker 750Cc",
      imagen: "img/whisky.jpg",
      precio: "$9599",
    },
  ];

  productos.forEach((producto) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.dataset.nombre = producto.nombre;
  
    const tituloItem = document.createElement("span");
    tituloItem.classList.add("titulo-item");
    tituloItem.textContent = producto.nombre;
  
    const imgItem = document.createElement("img");
    imgItem.classList.add("img-item");
    imgItem.src = producto.imagen;
    imgItem.alt = "";
  
    const precioItem = document.createElement("span");
    precioItem.classList.add("precio-item");
    precioItem.textContent = producto.precio;
  
    const botonItem = document.createElement("button");
    botonItem.classList.add("boton-item");
    botonItem.textContent = "Agregar al Carrito";
  
    item.appendChild(tituloItem);
    item.appendChild(imgItem);
    item.appendChild(precioItem);
    item.appendChild(botonItem);
  
    contenedor.appendChild(item);
    
    
  });
  function ready(){
    
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
    }
    function hacerVisibleCarrito() {
        if (!carritoVisible) {
            carritoVisible = true;
            var carrito = document.getElementsByClassName('carrito')[0];
            carrito.style.marginRight = '0';
            carrito.style.opacity = '1';
    
            var items = document.getElementsByClassName('contenedor-items')[0];
            items.style.width = '60%';
        }
    }

    // Función para controlar el botón "Agregar al Carrito" clickeado
    function agregarAlCarritoClicked(event) {

            carritoVisible = true;
            hacerVisibleCarrito();
        var button = event.target;
        var item = button.parentElement;
        var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
        var precio = item.getElementsByClassName('precio-item')[0].innerText;
        var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    
        agregarItemAlCarrito(titulo, precio, imagenSrc);
        guardarCarritoEnLocalStorage();
        
    }
    // Función para agregar un item al carrito
    function agregarItemAlCarrito(titulo, precio, imagenSrc) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        var item = document.createElement('div');
        item.classList.add('item');
        var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    
        var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
        for (var i = 0; i < nombresItemsCarrito.length; i++) {
            if (nombresItemsCarrito[i].innerText == titulo) {
                Swal.fire({
                    title: 'El producto ya se encuentra en el carrito',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
        }
    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);


    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    actualizarTotalCarrito();
    }
    //Aumentar en uno la cantidad del elemento elegido
    function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    }
    //Restar en uno la cantidad del elemento elegido
    function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
        }
    }

    //Eliminar el item seleccionado del carrito
    function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    guardarCarritoEnLocalStorage();

    actualizarTotalCarrito();

    
    ocultarCarrito();
    }   
    function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
    }
    //Actualizar el total del carrito
    function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

    }
    

    // Función para ordenar los productos por precio
    function ordenarProductosPorPrecio(deMayorAMenor) {
    const items = Array.from(contenedorItems.querySelectorAll('.item'));
    const contenedorItems = document.querySelector('.contenedor-items');
    const ordenarMayorBtn = document.getElementById('ordenarMayor');
    const ordenarMenorBtn = document.getElementById('ordenarMenor');

    ordenarMayorBtn.addEventListener('click', () => {
    ordenarProductosPorPrecio(true);
    });

    ordenarMenorBtn.addEventListener('click', () => {
    ordenarProductosPorPrecio(false);
    });

    items.sort((a, b) => {
        const precioA = parseFloat(a.querySelector('.precio-item').textContent.replace('$', ''));
        const precioB = parseFloat(b.querySelector('.precio-item').textContent.replace('$', ''));

        if (deMayorAMenor) {
            return precioB - precioA;
        } else {
            return precioA - precioB;
        }
    });

    contenedorItems.innerHTML = '';

    items.forEach(item => {
        contenedorItems.appendChild(item);
    });
    }
    function obtenerCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito;
    }
    function vaciarCarrito() {
    localStorage.removeItem('carrito');
    }
    function pagarClicked(){
        Swal.fire({
            icon: 'success',
            title: 'Compra realizada',
            text: 'Tu compra se ha completado con éxito, ¡muchas gracias!.',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
          })
        var carritoItems = document.getElementsByClassName('carrito-items')[0];
        while (carritoItems.hasChildNodes()){
            carritoItems.removeChild(carritoItems.firstChild)
        }
        actualizarTotalCarrito();
        ocultarCarrito();
        }
    const filtroNombreInput = document.getElementById('filtroNombre');
    const btnFiltrar = document.getElementById('btnFiltrar');
    const items = document.querySelectorAll('.item');

    btnFiltrar.addEventListener('click', filtrarItems);

    function filtrarItems() {
    const filtro = filtroNombreInput.value.toLowerCase();

    items.forEach(item => {
        const nombre = item.querySelector('.titulo-item').textContent.toLowerCase();
        const tieneNombre = nombre.includes(filtro);

        if (tieneNombre) {
            item.style.display = 'block'; 
        } else {
            item.style.display = 'none'; 
        }
    });
    }
    
    function guardarCarritoEnLocalStorage() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    localStorage.setItem('carrito', JSON.stringify(carrito));
    }
ready();
});
    
    
    