function valor(x) {
    console.log("")
    console.log(x)
	document.getElementById('Resultado').innerHTML += x; 
}

function limpiarDisplay() {
	document.getElementById('Resultado').innerHTML = "";
}

function calculos() {
	var resultado = eval(document.getElementById('Resultado').innerHTML);
	document.getElementById('Resultado').innerHTML = resultado;
}

/*DATOS NUMERICOS*/
var cero = document.getElementById('cero');
var uno = document.getElementById('uno');
var dos = document.getElementById('dos');
var tres = document.getElementById('tres');
var cuatro = document.getElementById('cuatro');
var cinco = document.getElementById('cinco');
var sies = document.getElementById('seis');
var siete = document.getElementById('siete');
var ocho = document.getElementById('ocho');
var nueve = document.getElementById('nueve');
var punto = document.getElementById('punto');
/*OPERADORES*/
var suma = document.getElementById('suma');
var resta = document.getElementById('resta');
var multiplicacion = document.getElementById('multiplicacion');
var division = document.getElementById('division');
var igual = document.getElementById('igual');
var limpiar = document.getElementById('limpiar');

cero.addEventListener("click", function(){
    valor(0);
    }
)
uno.addEventListener("click", function(){
    valor(1);
    }
)
dos.addEventListener("click", function(){
    valor(2);
    }
)
tres.addEventListener("click", function(){
    valor(3);
    }
)
cuatro.addEventListener("click", function(){
    valor(4);
    }
)
cinco.addEventListener("click", function(){
    valor(5);
    }
)
sies.addEventListener("click", function(){
    valor(6);
    }
)
siete.addEventListener("click", function(){
    valor(7);
    }
)
ocho.addEventListener("click", function(){
    valor(8);
    }
)
nueve.addEventListener("click", function(){
    valor(9);
    }
)
punto.addEventListener("click", function(){
    valor(".");
    }
)
suma.addEventListener("click", function(){
    valor("+");
    }
)
resta.addEventListener("click", function(){
    valor("-");
    }
)
division.addEventListener("click", function(){
    valor("/");
    }
)
multiplicacion.addEventListener("click", function(){
    valor("*");
    }
)
/*REALIZACION DE CALCULOS*/
igual.addEventListener("click", function(){
    calculos();
    }
)
/*LIMPIEZA DE PANTALLA*/
limpiar.addEventListener("click", function(){
    limpiarDisplay();
    }
)      
