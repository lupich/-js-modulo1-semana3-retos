//variables
const listaNumeros=[];
let recuperarlistaNumeros=[];
const seleccionarPromedio=document.querySelector(`#selecionarPromedio`);
const respuesta=document.querySelector(`.respuesta`);
//eventos
document.addEventListener(`DOMContentLoaded`,()=>{
    recuperarlistaNumeros=generarLista(10);
    
});
seleccionarPromedio.addEventListener(`change`,(e)=>{

const seleccion=seleccionarPromedio.value;
switch (seleccion) {
    case `mediana`:
        mostrarRespuesta(`La mediana es`,mediana(recuperarlistaNumeros));
        break;
    case `moda`:
        mostrarRespuesta(`La moda es`,moda(recuperarlistaNumeros));
        break;
    case `aritmetico`:
        mostrarRespuesta(`El promedio aritmetico es`,promedioAritmetico(recuperarlistaNumeros));
        break;
    case `geometrico`:
        mostrarRespuesta(`El promedio geometrico es`,promedioGeometrico(recuperarlistaNumeros));
        break;
    case `armonico`:
        mostrarRespuesta(`El promedio armonico es`, promedioArmonico(recuperarlistaNumeros));
        break;
    default:
        respuesta.textContent=``;
        break;
}

});
promedioGeometrico(recuperarlistaNumeros);
//funciones
function generarLista(cantidad){
    const tablaCuerpo=document.querySelector(`#tabla tbody`)
    for(let i=0; i<cantidad;i++){
        const fila=document.createElement(`tr`);
        const nombres=document.createElement(`td`);
        const ventas=document.createElement(`td`);
        const numero=Math.floor(Math.random()*(50-10)) +10;
        listaNumeros[i]=[`vendedor ${i+1}` , numero];
        //console.table(listaNumeros[i]);
        nombres.textContent=`${listaNumeros[i][0]}`;
        ventas.textContent=`${listaNumeros[i][1]}`;
        fila.appendChild(nombres);
        fila.appendChild(ventas);
        tablaCuerpo.appendChild(fila);
    }
    return listaNumeros;
}
function promedioAritmetico(arrayValores){
    
    return (arrayValores.reduce((inicial,numero)=>inicial + numero[1],0))/(arrayValores.length);

}
function promedioGeometrico(arrayValores){
    let exponente=(1/arrayValores.length);
    let producto=1;
    arrayValores.forEach(numero => {
        producto=numero[1]*producto;
    });
    return Math.pow(producto,exponente);
}
function promedioArmonico(arrayValores){
    let arrayInverso=[];
    let SumaInversas=0;
    for (let i = 0; i< arrayValores.length; i++) {
        arrayInverso[i]=Math.pow(arrayValores[i][1],-1);
    }
    SumaInversas=arrayInverso.reduce((acumulador,inverso)=> acumulador+inverso,0);
    return arrayValores.length/SumaInversas;
}
function mediana(arrayValores){
    let arrayNumeros=[];
    const cantidasElementos=arrayValores.length;
    let menorMayor=[];
    for (let i = 0; i< cantidasElementos; i++) {
        arrayNumeros[i]=arrayValores[i][1];
    }
    menorMayor=arrayNumeros.sort(function(a, b){return a - b});
    if( cantidasElementos%2===0){ 
        return (menorMayor[(cantidasElementos/2)-1]+menorMayor[(cantidasElementos/2)])/2
    }else{
        return (menorMayor[((cantidasElementos+1)/2) - 1])
    }
}
 function moda(arrayValores){
    let arraySoloNumeros=[];
    let arrayNumerosOrdenado=[];
    let numerosRepitentes=[];
    let numeros=[];
    let arrayNumerosMaximo=[];
    let maximo=[1];
    let repeticiones=1;
    for (let i = 0; i < arrayValores.length; i++) {
        arraySoloNumeros[i]=arrayValores[i][1];
    }
    arrayNumerosOrdenado=arraySoloNumeros.sort(function(a, b) {
        return a - b;
    });
    for (let i = 0; i < arrayNumerosOrdenado.length; i++) {
        if (arrayNumerosOrdenado[i+1]===arrayNumerosOrdenado[i]) {
            repeticiones++;
        }else{
            numeros.push(arrayNumerosOrdenado[i]);
            numerosRepitentes.push(repeticiones);
            repeticiones=1;
        }
    }
    
    for (let i = 0; i < numerosRepitentes.length; i++){
        if (maximo<=numerosRepitentes[i]) {
            maximo=numerosRepitentes[i];
           arrayNumerosMaximo=[numeros[i],numerosRepitentes[i]]
            
        }
    
    }  
   
  return arrayNumerosMaximo[0];
}   
function mostrarRespuesta(mensaje,funcionPromedio){
    respuesta.textContent=`${mensaje} : ${funcionPromedio}`
}



