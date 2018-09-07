

function refresqueDashInferiorConDatosForestales () {
    // for background inferior -- compartido por todas las escenas ------------------------------------------
    ctxDashInferior.fillStyle = "#000000";
    ctxDashInferior.fillRect(0, 0, canvasDashInferior.width, canvasDashInferior.height);


    dibujeEjes();

    dibujeLineaDiametros();
    for (var i = 0; i < botonesDeDiametros.length; i++) {
        botonesDeDiametros[i].render(ctxDashInferior);
    }

    dibujeLineaHumedades();
    for (var i = 0; i < botonesDeHumedades.length; i++) {
        botonesDeHumedades[i].render(ctxDashInferior);
    }

    dibujeLineaSegnales();
    for (var i = 0; i < botonesDeSegnales.length; i++) {
        botonesDeSegnales[i].render(ctxDashInferior);
    }


    var mouseAhora = new THREE.Vector3(mouseX, mouseY, 0);
    for (var i = 0; i < botonesDeDiametros.length; i++) {
        botonesDeDiametros[i].encima(mouseAhora);
    }

    for (var i = 0; i < botonesDeHumedades.length; i++) {
        botonesDeHumedades[i].encima(mouseAhora);
    }

    for (var i = 0; i < botonesDeSegnales.length; i++) {
        botonesDeSegnales[i].encima(mouseAhora);
    }

}






// clase dato boton -------------------------------
function DatoBoton ( posicion, dato, miC){
    this.myLocation = posicion;
    var mostrar = false;
    var miRadio = 3;
    var miNombre = dato;
    var miColor = miC;
    //console.log("this.myLocation.x: "+ this.myLocation.x + "   this.myLocation.y: "+ this.myLocation.y);



    //drawing particle
    this.render = function (ctx) {
        if(mostrar){
            ctx.fillStyle = "rgba(200, 250, 100, 255)";
            // Draw an circle in location and size
            ctx.beginPath();
            ctx.arc(this.myLocation.x, this.myLocation.y, miRadio, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.strokeStyle = miColor;
            // Draw an circle in location and size
            ctx.beginPath();
            ctx.arc(this.myLocation.x, this.myLocation.y, miRadio, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        if(mostrar){
            ctx.fillStyle = "#bbbbbb";
            ctx.font = "normal 14px Roboto-Medium";
            ctx.fillText(miNombre, this.myLocation.x, this.myLocation.y-5);
        }

    }; // end function render()



    this.encima = function (mousePos) {
        //console.log("mouse x = " + mousePos.x + "   mouse y = " + mousePos.y);
        var Xahora = mousePos.x - 10; // +2 // los márgenes del dash inferior
        var Yahora = mousePos.y - 385; // +97
        //console.log("Xahora = " + Xahora + "   Yahora = " + Yahora);
        //console.log("");
        var a = Xahora -  this.myLocation.x ;
        var b = Yahora -  this.myLocation.y;
        var distance = Math.sqrt( a*a + b*b );
        mostrar = (distance < miRadio+5);
        //console.log("Xahora: "+ Xahora + "    Yahora: "+ Yahora);
    };

}




function analiceDatos (datos) {
    var datoMinimo = 1000;
    var datoMaximo = 0;
    for(var i=0; i<datos.length; i++) {
        if (datos[i] < datoMinimo) datoMinimo = datos[i];
        if (datos[i] > datoMaximo) datoMaximo = datos[i];
    }
    //console.log("datoMinimo:"+ datoMinimo + "   datoMaximo:"+ datoMaximo + "   cantidad de datos:"+ datos.length);
    return (new THREE.Vector3(datoMinimo,datoMaximo,datos.length));
}




function dibujeEjes (){ // en el dashboard inferior con los datos forestales
    //canvasDashInferior.width = 1010;   //canvasDashInferior.height = 100;
    ctxDashInferior.lineWidth = 0.5;
    ctxDashInferior.strokeStyle = "rgba(80, 80, 80, 0.8)";
    // lineas horizontales
    ctxDashInferior.beginPath();
    for(var i=0; i<canvasDashInferior.height; i+= 10) {
        ctxDashInferior.moveTo(0, i);
        ctxDashInferior.lineTo(canvasDashInferior.width, i);
    }
    ctxDashInferior.closePath();
    ctxDashInferior.stroke();
    // lineas verticales
    ctxDashInferior.beginPath();
    for(var i=0; i<canvasDashInferior.width; i+= 10) {
        ctxDashInferior.moveTo(i, 0);
        ctxDashInferior.lineTo(i, canvasDashInferior.height);
    }
    ctxDashInferior.closePath();
    ctxDashInferior.stroke();



    ctxDashInferior.lineWidth=1;
    ctxDashInferior.strokeStyle = "rgba(80, 250, 80, 0.5)";
    ctxDashInferior.fillStyle = "rgba(80, 250, 80, 0.2)";

    // para eje x
    ctxDashInferior.beginPath();
    ctxDashInferior.moveTo(5, 150);
    ctxDashInferior.lineTo(1000, 150);
    ctxDashInferior.closePath();
    ctxDashInferior.fill();
    ctxDashInferior.stroke();

    // para eje y
    ctxDashInferior.beginPath();
    ctxDashInferior.moveTo(5, 50);
    ctxDashInferior.lineTo(5, 150);
    ctxDashInferior.closePath();
    ctxDashInferior.fill();
    ctxDashInferior.stroke();


    ctxDashInferior.fillStyle = colorDiametros;
    ctxDashInferior.beginPath();
    ctxDashInferior.rect(8, 7, 7, 7);
    ctxDashInferior.closePath();
    ctxDashInferior.fill();

    ctxDashInferior.fillStyle = colorHumedades;
    ctxDashInferior.beginPath();
    ctxDashInferior.rect(100, 7, 7, 7);
    ctxDashInferior.closePath();
    ctxDashInferior.fill();

    ctxDashInferior.fillStyle = colorSegnales;
    ctxDashInferior.beginPath();
    ctxDashInferior.rect(190, 7, 7, 7);
    ctxDashInferior.closePath();
    ctxDashInferior.fill();


    ctxDashInferior.fillStyle = "rgba(200, 200, 200, 0.8)";
    ctxDashInferior.font = "normal 12px Roboto-Medium";
    ctxDashInferior.fillText("diámetros", 20, 15);
    ctxDashInferior.fillText("humedad", 112, 15);
    ctxDashInferior.fillText("señal", 202, 15);
}

function dibujeLineaDiametros (){ // gráfico con los datos de los diámetros
    ctxDashInferior.lineWidth=1;
    ctxDashInferior.strokeStyle = colorDiametros;
    ctxDashInferior.fillStyle = "rgba(80, 250, 80, 0.2)";

    ctxDashInferior.beginPath();
    ctxDashInferior.moveTo(5, 150);
    var ultimaX =0;
    for(var i=0; i<botonesDeDiametros.length; i++) {
        ctxDashInferior.lineTo(botonesDeDiametros[i].myLocation.x, botonesDeDiametros[i].myLocation.y);
        ultimaX = botonesDeDiametros[i].myLocation.x;
    }
    ctxDashInferior.lineTo(ultimaX, 150);
    ctxDashInferior.closePath();
    ctxDashInferior.fill();
    ctxDashInferior.stroke();
}


function dibujeLineaHumedades () {// gráfico con los datos de las humedades
    ctxDashInferior.lineWidth=1;
    ctxDashInferior.strokeStyle = colorHumedades;
    ctxDashInferior.fillStyle = "rgba(80, 250, 80, 0.2)";

    ctxDashInferior.beginPath();
    ctxDashInferior.moveTo(5, 150);
    var ultimaX =0;
    for(var i=0; i<botonesDeHumedades.length; i++) {
        ctxDashInferior.lineTo(botonesDeHumedades[i].myLocation.x, botonesDeHumedades[i].myLocation.y);
        ultimaX = botonesDeHumedades[i].myLocation.x;
    }
    ctxDashInferior.lineTo(ultimaX, 150);
    ctxDashInferior.closePath();
    ctxDashInferior.fill();
    ctxDashInferior.stroke();
}

function dibujeLineaSegnales () { // gráfico con los datos de los señales
    ctxDashInferior.lineWidth=1;
    ctxDashInferior.strokeStyle = colorSegnales;
    ctxDashInferior.fillStyle = "rgba(80, 250, 80, 0.2)";

    ctxDashInferior.beginPath();
    ctxDashInferior.moveTo(5, 150);
    var ultimaX =0;
    for(var i=0; i<botonesDeSegnales.length; i++) {
        ctxDashInferior.lineTo(botonesDeSegnales[i].myLocation.x, botonesDeSegnales[i].myLocation.y);
        ultimaX = botonesDeSegnales[i].myLocation.x;
    }
    ctxDashInferior.lineTo(ultimaX, 150);
    ctxDashInferior.closePath();
    ctxDashInferior.fill();
    ctxDashInferior.stroke();
}
