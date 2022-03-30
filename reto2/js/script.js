const cuerpoTabla=document.querySelector(`#tabla tbody`)
const contenedorPagos=document.querySelector(`.pago`)
const ListaCuponesContenedor=document.querySelector(`.cupones`)
let inputDato=document.querySelector(`#dato`);
const botonCupon=document.querySelector(`#boton`)
const cupones=[];
let subTotalproductos;
let descuentoTotalCompra;
let totalPagoCompra;
let ListadoCuponDescuento=[];
const productos=[
    {nombre:`Latop HP`,precio:2200},
    {nombre:`Celular`,precio:900},
    {nombre:`Teclado`,precio:100},
    {nombre:`Monitor lcd`,precio:650},
    {nombre:`Cooler`,precio:60},
    {nombre:`Tarjeta de video`,precio:1800},
    {nombre:`latop asus`,precio:1800},
    {nombre:`Disco externo 1TB`,precio:200},
];
//eventos
document.addEventListener(`DOMContentLoaded`,()=>{
    llenarTablaProductos();
    subTotalproductos= subTotal();
    ListadoCuponDescuento=generarCupon(4);
    llenarCupones();
    

})
botonCupon.addEventListener(`click`, ()=>{
    descuetoCupon(ListadoCuponDescuento);
    let decuentoDelTotal=contenedorPagos.firstElementChild.nextElementSibling.nextElementSibling;
    totalfinal=subTotalproductos-descuentoTotalCompra;
    decuentoDelTotal.textContent=`Total a pagar: ${totalfinal} `;

   
});

//funciones
function llenarTablaProductos(){
    productos.forEach(producto=>{
        const fila=document.createElement(`tr`)
        const  nombre=document.createElement(`td`);
        const  precio=document.createElement(`td`);
        nombre.textContent=`${producto.nombre}`;
        precio.textContent=`${producto.precio}`;
        fila.appendChild(nombre);
        fila.appendChild(precio);
        cuerpoTabla.appendChild(fila);
    });
}
function llenarCupones(){
    cupones.forEach(cupon=>{
        const item=document.createElement(`li`);
        item.textContent=cupon[0];
        ListaCuponesContenedor.appendChild(item);
    });
}
function subTotal(){
    const sumaTotal=contenedorPagos.firstElementChild;
    const totalPrecio=productos.reduce((acumulador,producto)=> acumulador + producto.precio ,0);
    sumaTotal.textContent=`sub total : ${totalPrecio}`;
    return totalPrecio;
}
function descuetoCupon(listaCupones){
    let decuentoDelTotal=contenedorPagos.firstElementChild.nextElementSibling;
    
    for(let i=0;i<listaCupones.length;i++){
        if(listaCupones[i][0]==inputDato.value){
            descuentoTotalCompra= (listaCupones[i][1]/100)*subTotalproductos;
            decuentoDelTotal.textContent=`${listaCupones[i][1]}% Descuento : ${descuentoTotalCompra}`;
            return 
        }else{
            descuentoTotalCompra=0;
            decuentoDelTotal.textContent=`Descuento  total: ${descuentoTotalCompra}`;
            console.log(listaCupones[i]);
        } 
    }
      
}
function generarCupon(cantidad){
    const cuponLiteral="VERANO";
    let porcentaje;
    let cuponGenerado;
    for (let i = 0; i <cantidad; i++) {
            porcentaje=Math.floor(Math.random()*(30 - 5)) + 5
            cuponGenerado= generarRandomString(3) + cuponLiteral+generarRandomString(2);
            
            cupones[i]=[cuponGenerado,porcentaje];
    }
   return cupones
}
function generarRandomString(cantidadLetras){
    const baseString ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString= '';
    for ( let i = 0; i < cantidadLetras; i++ ) {
        randomString += baseString.charAt(Math.floor(Math.random() * baseString.length));
    }
    return randomString;
}
