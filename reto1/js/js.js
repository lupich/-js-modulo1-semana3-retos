
//inicio taller 1
let selectGeo=document.querySelector(`#form__options`);
const datos=document.querySelector(`.datos__calulo`);
const dato1=document.querySelector(`#dato1`);
const dato2=document.querySelector(`#dato2`);
const otroDato=document.querySelector(`.otro__dato`);
const formulario=document.querySelector(`.form`);
const botonCalcular=document.querySelector(`#calcular`)
const contendorResultado=document.querySelector(`.area`)



calcular.addEventListener(`click`,(e)=>{
    let resultado="";
   const numero1=Number(dato1.value);
  const numero2=Number(dato2.value);
  
   
   if( selectGeo.value===`Cuadrado`){
    resultado=Math.pow(numero1,2);
   } else if(selectGeo.value===`Triangulo`){
    resultado=(numero1*numero2)/2;
   }else if(selectGeo.value===`Circulo`){
    resultado=(Math.round(Math.pow(numero1,2)*Math.PI*100))/100;
   }
    
    contendorResultado.textContent=`EL área es : ${resultado}`

});
dato1.addEventListener(`focusout`, validarVacio);
dato1.addEventListener(`input`,elimnarResultado);
dato2.addEventListener(`focusout`,validarVacio);
dato2.addEventListener(`input`,elimnarResultado);

selectGeo.addEventListener(`change`,e=>{
    const valuesSelect=e.target.value;
    const figuraGeometrica=document.querySelector(`.geometric__figure`)
    switch (valuesSelect) {
        case `Cuadrado`:
            contendorResultado.textContent="";
            figuraGeometrica.classList.add(`square`);
            figuraGeometrica.classList.remove(`circle`,`triangle`);
           dato1.previousElementSibling.textContent=`Lado`;
           datos.classList.remove(`oculto`);
           otroDato.classList.add(`oculto`);
           botonCalcular.disabled=true;
           dato1.value="";  
            break;
        case `Triangulo`:
            contendorResultado.textContent="";
            figuraGeometrica.classList.add(`triangle`);
            figuraGeometrica.classList.remove(`square`,`circle`);
            dato1.previousElementSibling.textContent=`Base`;
            dato1.value="";  
            dato2.value="";            
            datos.classList.remove(`oculto`);
            otroDato.classList.remove(`oculto`);
            botonCalcular.disabled=true;

            break;
        case `Circulo`:
            contendorResultado.textContent="";
            figuraGeometrica.classList.add(`circle`);
            figuraGeometrica.classList.remove(`square`,`triangle`);
            dato1.previousElementSibling.textContent=`Radio`;
            dato1.value="";  
            datos.classList.remove(`oculto`);
            otroDato.classList.add(`oculto`);
            botonCalcular.disabled=true;
            break;
        default:
            contendorResultado.textContent="";
            figuraGeometrica.classList.remove(`circle`,`triangle`,`square`);
            formulario.reset();
            datos.classList.add(`oculto`);
            botonCalcular.disabled=true;
            break;
    }

});
function elimnarResultado(){
    contendorResultado.textContent=``;
    botonCalcular.disabled=true;
    /* if(dato1.value="-"){
        dato1.value=""
    }
    if(dato2.value="-"){
        dato2.value=""
    } */
};
function mensaje(texto){
    const msj=document.createElement(`p`);
    msj.classList.add(`mensaje__vacio`);
    msj.textContent=texto;
    if(document.querySelectorAll(`.mensaje__vacio`).length===0){
        datos.appendChild(msj);
    }
}
function validarVacio(e){
    if(e.target.value.length>0){
        const vacio=document.querySelector('p.mensaje__vacio');
        if(vacio){
            vacio.remove();  
        }
        if( selectGeo.value===`Cuadrado`||selectGeo.value===`Circulo`){
             
            if( dato1.value.length>0){
                
                botonCalcular.disabled=false;
            }
        }else if(selectGeo.value===`Triangulo`){
            if( dato2.value.length>0 &&  dato1.value.length>0){
                botonCalcular.disabled=false;
        
            }
        }
    } else{
          
        mensaje(`Debes escribir un número`) ;
        botonCalcular.disabled=true;
    }
}

//fin taller 1



//inicio reto 1
const ladoA=document.querySelector(`#la`);
const ladoB=document.querySelector(`#lb`);
const ladoC=document.querySelector(`#lc`);
const botonAltura=document.querySelector(`#botontriangulo`);
let valorLados=[];
const resultadoAltura=document.querySelector(`#resultado__altura`);

//eventos

ladoA.addEventListener(`focusout`,validarIsosceles);
ladoA.addEventListener(`input`,limpiarResultado);
ladoB.addEventListener(`focusout`,validarIsosceles);
ladoB.addEventListener(`input`,limpiarResultado);
ladoC.addEventListener(`focusout`,validarIsosceles);
ladoC.addEventListener(`input`,limpiarResultado);

botonAltura.addEventListener(`click`,()=>{
        const [ladoIgual,ladoDiferente]=valorLados;
      
        const altura= Math.sqrt(Math.pow(Number(ladoIgual),2) - (Math.pow(Number(ladoDiferente),2))/4);
        resultadoAltura.textContent=`La Altura del triagulo isosceles es: ${altura}`;


});
function limpiarMensaje(){
    const vacio=document.querySelector('p.mensaje__vacio');
        if(vacio){
            vacio.remove();  
        }
}
function limpiarResultado(e){
    resultadoAltura.textContent=``;
    botonAltura.disabled=true;
    limpiarMensaje();
}
function validarIsosceles(e){
    if(e.target.value.length>0){
        const vacio=document.querySelector('p.mensaje__vacio');
        if(vacio){
            vacio.remove();  
        }
       
        
        if( ladoA.value.length>0 &&  ladoB.value.length>0 &&  ladoC.value.length>0){
           
            if(lados().length!==0){
               
                mensajeMultiple(`Es un triangulo isosceles`,e) ;
                botonAltura.disabled=false;
            }else{
                mensajeMultiple(`No es un triangulo isosceles`,e) ;
                botonAltura.disabled=true;
            }
            
        }
    } else{
          
        mensajeMultiple(`Debes escribir un número`,e) ;
        /* botonAltura.disabled=true;  */
    }
}
function mensajeMultiple(texto,e){
    const msj=document.createElement(`p`);
    const contenedorMensaje=e.target.parentNode;
    msj.classList.add(`mensaje__vacio`);
    msj.textContent=texto;
    if(document.querySelectorAll(`.mensaje__vacio`).length===0){
       contenedorMensaje.appendChild(msj);
    }
}
function lados(){
   
        if(ladoA.value===ladoB.value){
            return valorLados=[ladoA.value,ladoC.value];
        }else if(ladoB.value===ladoC.value){
            return valorLados=[ladoB.value,ladoA.value];
       }else if(ladoA.value===ladoC.value ){
            return valorLados=[ladoA.value,ladoB.value];
        }else{
            return valorLados=[];
        }
    
    
}

