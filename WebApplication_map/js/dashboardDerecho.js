


function dibujeCiudadesEn2D () {
    for (var i = 0; i < ciudades.length; i++) {
        var punto1X = map (ciudades[i][0], -180,180,0,920);
        var punto1Y = map (ciudades[i][1], -90,90,750,0);

        ctxDashDerecho.fillStyle = "rgba(200, 200, 200, 1.0)";
        ctxDashDerecho.beginPath();
        ctxDashDerecho.arc(punto1X, punto1Y, 3, 0, Math.PI * 2, true);
        ctxDashDerecho.closePath();
        ctxDashDerecho.fill();

        ctxDashDerecho.font = "normal 10px Roboto-Medium";
        ctxDashDerecho.fillText(ciudades[i][2], punto1X, punto1Y-5);
    }
}




function dibujeContinentesEn2D () {
    // para el fondo de dashboard derecho
    ctxDashDerecho.fillStyle = "#000000"; // dark gray
    ctxDashDerecho.fillRect(0, 0, canvasDashDerecho.width, canvasDashDerecho.height);
    // aqui se crean los continentes que vienen de una matrix de coordenadas llamada "puntos"
    // esta matriz se creo en processing y se almacena en el archivo "31mapamundi.js"
    // hay varias resoluciones para probar  0x00ff00
    for (var i = 0; i < puntos.length; i++) {
        var opacidad = Math.random() +  0.5;
        var X2d = map(puntos[i][0],  -Math.PI, Math.PI, 920, 0);
        var Y2d = map(puntos[i][1],  -Math.PI/2, Math.PI/2, 750, 0);
        ctxDashDerecho.fillStyle = "rgba(0, 200, 0, "+opacidad+")";
        ctxDashDerecho.beginPath();
        ctxDashDerecho.arc(X2d, Y2d, 1, 0, Math.PI * 2, true);
        ctxDashDerecho.closePath();
        ctxDashDerecho.fill();

    }
    // dibujando latitudes
    ctxDashDerecho.strokeStyle = "rgba(50, 255, 50, 0.5)";
    var cantidadDeLineasHz = 750 / 20;
    ctxDashDerecho.lineWidth = 0.5;
    for (var i = 0; i < cantidadDeLineasHz; i++) {
        ctxDashDerecho.beginPath();
        ctxDashDerecho.moveTo(0, i*cantidadDeLineasHz);
        ctxDashDerecho.lineTo(920, i*cantidadDeLineasHz);
        ctxDashDerecho.stroke();
    }

    // dibujando longitudes
    cantidadDeLineasHz = 920 / 20;
    for (var i = 0; i < cantidadDeLineasHz; i++) {
        ctxDashDerecho.beginPath();
        ctxDashDerecho.moveTo(i*cantidadDeLineasHz, 0);
        ctxDashDerecho.lineTo(i*cantidadDeLineasHz, 750);
        ctxDashDerecho.stroke();
    }

}



function dibujeOrbita2D() {
    ctxDashDerecho.strokeStyle = "rgba(255, 255, 100, 0.9)";

    for (var i = 0; i < lonLatDeSateliteEnTierra.length-1; i++) {
        var punto1X = map (lonLatDeSateliteEnTierra2D[i].x, -180,180,0,920);
        var punto1Y = map (lonLatDeSateliteEnTierra2D[i].y, -90,90,0,750);
        var punto2X = map (lonLatDeSateliteEnTierra2D[i+1].x, -180,180,0,920);
        var punto2Y = map (lonLatDeSateliteEnTierra2D[i+1].y, -90,90,0,750);

        ctxDashDerecho.lineWidth = 0.5;
        ctxDashDerecho.beginPath();
        ctxDashDerecho.moveTo(punto1X, punto1Y);
        ctxDashDerecho.lineTo(punto2X, punto2Y);
        ctxDashDerecho.closePath();
        ctxDashDerecho.stroke();
    } // end x for

    var puntoX = map (lonLatDeSateliteEnTierra2D[posicionEnOrbita].x, -180,180,0,920);
    var puntoY = map (lonLatDeSateliteEnTierra2D[posicionEnOrbita].y, -90,90,0,750);

    // para los circulos rojos del satelite en 2D
    ctxDashDerecho.fillStyle = "rgba(255, 100, 100, 0.2)";
    ctxDashDerecho.beginPath();
    ctxDashDerecho.arc(puntoX, puntoY, 45, 0, Math.PI * 2, true);
    ctxDashDerecho.closePath();
    ctxDashDerecho.fill();

    ctxDashDerecho.fillStyle = "rgba(255, 100, 100, 1.0)";
    ctxDashDerecho.beginPath();
    ctxDashDerecho.arc(puntoX, puntoY, 3, 0, Math.PI * 2, true);
    ctxDashDerecho.closePath();
    ctxDashDerecho.fill();

    // para el texto del satelite en 2D
    ctxDashDerecho.lineWidth = 1;
    ctxDashDerecho.beginPath();
    ctxDashDerecho.moveTo(puntoX, puntoY);
    ctxDashDerecho.lineTo(puntoX+40, puntoY-30);
    ctxDashDerecho.lineTo(puntoX+80, puntoY-30);
    ctxDashDerecho.stroke();

    etiquetaDelSat2 = 'longitud =' + lonLatDeSateliteEnTierra[posicionEnOrbita].x.toFixed(4);
    etiquetaDelSat3 = 'latitud =' + (lonLatDeSateliteEnTierra[posicionEnOrbita].y.toFixed(4));
    ctxDashDerecho.fillStyle = "#ffff00";
    ctxDashDerecho.font = "normal 12px Roboto-Medium";
    ctxDashDerecho.fillText("cubSat irazú", puntoX+80, puntoY-30);
    ctxDashDerecho.fillText(etiquetaDelSat2, puntoX+80, puntoY-18);
    ctxDashDerecho.fillText(etiquetaDelSat3, puntoX+80, puntoY-6);

} // fin de dibujeOrbita2D()