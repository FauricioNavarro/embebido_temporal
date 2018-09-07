


function refresqueDashIzquierdoConGraficos () {
    // inicio del 2D -----------------------------------------------------------------
    // for ctxDashIzquierdo
    ctxDashIzquierdo.fillStyle = "#000000"; // dark gray
    ctxDashIzquierdo.fillRect(0, 0, canvasDashIzquierdo.width, canvasDashIzquierdo.height);

    // para los dashboards del lado izquierdo  <--------------------------------------
    var alturaDeOrbitaSimulada = (alturaDeOrbita + Math.random() - 0.5).toFixed(6);

    dibujeLineaHorizontalEn(3, 150, 2);
    dibujeLineaHorizontalEn(18, 150, 2);
    dibujeLineaHorizontalEn(20, 150, 0.5);
    dibujeLineaHorizontalEn(25, 150, 0.5);
    ctxDashIzquierdo.fillStyle = "#bbbbbb";
    ctxDashIzquierdo.font = "normal 12px Roboto-Medium";
    ctxDashIzquierdo.fillText("eficiencia", 5, 15);
    dibujeDashboardLineal(5, 45, "eficiencia: ", frameRate, 5, 15, 150);
    dibujeDashboardLineal(5, 85, "batería: ", cargaDeBateria, 0, 100, 150);


    dibujeLineaHorizontalEn(135, 150, 2);
    dibujeLineaHorizontalEn(155, 150, 2);
    dibujeLineaHorizontalEn(157, 150, 0.5);
    dibujeLineaHorizontalEn(163, 150, 0.5);
    ctxDashIzquierdo.fillStyle = "#bbbbbb";
    ctxDashIzquierdo.font = "normal 12px Roboto-Medium";
    ctxDashIzquierdo.fillText("navegación", 5, 150);


    dibujeDashboardLineal(5, 190, "longitud: ", lonLatDeSateliteEnTierra[posicionEnOrbita].x, -180, 180, 150);
    dibujeDashboardLineal(5, 240, "latitud: ", lonLatDeSateliteEnTierra[posicionEnOrbita].y, -90, 90, 150);
    dibujeDashboardLineal(5, 295, "altura: ", alturaDeOrbitaSimulada, 28, 36, 150);
}




// esto son los pequeños gráficos de la izquierda
function dibujeDashboardLineal ( miX, miY, titulo, laVariable, rangoInferior, rangoSuperior, miAncho) {
    ctxDashIzquierdo.lineWidth=3;
    ctxDashIzquierdo.fillStyle = "#bbbbbb";
    ctxDashIzquierdo.font = "normal 12px Roboto-Medium";
    ctxDashIzquierdo.fillText(titulo+ laVariable, miX, miY);

    ctxDashIzquierdo.fillStyle = "#888888";
    var rangoMedio = (rangoSuperior+rangoInferior)/2;
    ctxDashIzquierdo.font = "normal 10px Roboto-Medium";
    ctxDashIzquierdo.fillText(rangoInferior, miX, miY+25);
    ctxDashIzquierdo.fillText(rangoMedio, miX + miAncho/2.5, miY+25);
    ctxDashIzquierdo.fillText(rangoSuperior, miX + miAncho-25, miY+25);

    // linea gris de fondo
    ctxDashIzquierdo.strokeStyle = "rgba(80, 80, 80, 1.0)";
    ctxDashIzquierdo.beginPath();
    ctxDashIzquierdo.moveTo(miX, miY+10);
    ctxDashIzquierdo.lineTo(miAncho-5, miY+10);
    ctxDashIzquierdo.closePath();
    ctxDashIzquierdo.stroke();

    // linea azul de frente
    ctxDashIzquierdo.strokeStyle = "rgba(51, 255, 50, 0.7)";
    ctxDashIzquierdo.fillStyle = "rgba(51, 255, 50, 0.3)";

    //linea que se mueve segun el frameRate
    var puntoDerechoX = map(laVariable, rangoInferior, rangoSuperior, 10, miAncho-5);
    ctxDashIzquierdo.beginPath();
    ctxDashIzquierdo.moveTo(miX, miY+10);
    ctxDashIzquierdo.lineTo(puntoDerechoX, miY+10);
    ctxDashIzquierdo.closePath();
    ctxDashIzquierdo.stroke();
}



function  dibujeLineaHorizontalEn (miY, miAncho, grosor) {
    ctxDashIzquierdo.lineWidth=grosor;
    ctxDashIzquierdo.beginPath();
    ctxDashIzquierdo.moveTo(2, miY);
    ctxDashIzquierdo.lineTo(miAncho-2, miY);
    ctxDashIzquierdo.closePath();
    ctxDashIzquierdo.stroke();

}

