
function dibujeOrbitaEnISSDash () {
    var punto1, punto2;
    for (var i = 0; i < lonLatDeSateliteEnTierra2D.length-1; i++) {
        ctxDashISS3D.strokeStyle = "rgba(255, 255, 100, 0.5)";
        ctxDashISS3D.lineWidth = 0.5;
        punto1 =  deLonLat_a_pixeles (new THREE.Vector3(lonLatDeSateliteEnTierra2D[i].x, -1*lonLatDeSateliteEnTierra2D[i].y, 0));
        punto2 =  deLonLat_a_pixeles (new THREE.Vector3(lonLatDeSateliteEnTierra2D[i+1].x, -1*lonLatDeSateliteEnTierra2D[i+1].y, 0));

        ctxDashISS3D.beginPath();
        ctxDashISS3D.moveTo(punto1.x, punto1.y);
        ctxDashISS3D.lineTo(punto2.x, punto2.y);
        ctxDashISS3D.closePath();
        ctxDashISS3D.stroke();
    } // end x for

    punto1 =  deLonLat_a_pixeles (new THREE.Vector3(lonLatDeSateliteEnTierra2D[posicionEnOrbita].x, -1*lonLatDeSateliteEnTierra2D[posicionEnOrbita].y, 0));
    ctxDashISS3D.fillStyle = "rgba(250, 0, 0, 1)";
    // Draw an circle in location and size
    ctxDashISS3D.beginPath();
    ctxDashISS3D.rect(punto1.x-5, punto1.y-5, 10, 10);
    ctxDashISS3D.closePath();
    ctxDashISS3D.fill();
    /*
        // para los circulos del satelite en 2D
        ctxDashISS3D.strokeStyle = "rgba(255, 255, 100, 0.5)";
        ctxDashISS3D.fillStyle = "rgba(255, 255, 100, 0.05)";
        ctxDashISS3D.beginPath();
        // ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
        ctxDashISS3D.ellipse(punto1.x, punto1.y, 150, 75, 0, 0, Math.PI * 2, true);
        //ctxDashISS3D.arc(punto1.x, punto1.y, 45, 0, Math.PI * 2, true);
        ctxDashISS3D.closePath();
        ctxDashISS3D.stroke();
        ctxDashISS3D.fill();
    */
    // para el círculo del user
    // [-84.093092, 9.940680, "San Jose"]
    var posicionUser = new THREE.Vector2(-83.11, 9.91);
    punto2 =  deLonLat_a_pixeles (posicionUser);
    ctxDashISS3D.fillStyle = "rgba(200, 200, 200, 1.0)";
    // Draw an circle in location and size
    ctxDashISS3D.beginPath();
    ctxDashISS3D.arc(punto2.x-2.5, punto2.y-2.5, 5, 0, Math.PI * 2, true);
    ctxDashISS3D.closePath();
    ctxDashISS3D.fill();

    // para los circulos del user
    ctxDashISS3D.strokeStyle = "rgba(255, 255, 100, 0.5)";
    ctxDashISS3D.fillStyle = "rgba(255, 255, 100, 0.1)";// --------------------------------------------
    ctxDashISS3D.beginPath();
    // ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    ctxDashISS3D.ellipse(punto2.x, punto2.y, 150, 75, 0, 0, Math.PI * 2, true);
    ctxDashISS3D.closePath();
    ctxDashISS3D.stroke();
    ctxDashISS3D.fill();

    ctxDashISS3D.strokeStyle = "rgba(255, 255, 100, 0.25)";
    ctxDashISS3D.beginPath();
    ctxDashISS3D.ellipse(punto2.x, punto2.y, 50, 25, 0, 0, Math.PI * 2, true);
    ctxDashISS3D.closePath();
    ctxDashISS3D.stroke();

    ctxDashISS3D.strokeStyle = "rgba(255, 255, 100, 0.5)";
    ctxDashISS3D.beginPath();
    ctxDashISS3D.ellipse(punto2.x, punto2.y, 30, 15, 0, 0, Math.PI * 2, true);
    ctxDashISS3D.closePath();
    ctxDashISS3D.stroke();

    ctxDashISS3D.strokeStyle = "rgba(255, 255, 100, 0.75)";
    ctxDashISS3D.beginPath();
    ctxDashISS3D.ellipse(punto2.x, punto2.y, 15, 7.5, 0, 0, Math.PI * 2, true);
    ctxDashISS3D.closePath();
    ctxDashISS3D.stroke();

    ctxDashISS3D.strokeStyle = "rgba(255, 255, 100, 1)";
    ctxDashISS3D.beginPath();
    ctxDashISS3D.moveTo(276, 90);
    ctxDashISS3D.lineTo(518, 93);
    ctxDashISS3D.closePath();
    ctxDashISS3D.stroke();

    ctxDashISS3D.fillStyle = "#bbbbbb";
    ctxDashISS3D.font = "normal 14px Roboto-Medium";
    ctxDashISS3D.fillText("USTED", punto2.x-30, punto2.y+15);

    ctxDashISS3D.drawImage(reloj, 255, 64);
    ctxDashISS3D.drawImage(reloj, 495, 68);

    ctxDashISS3D.fillStyle = "#bbbbbb";
    ctxDashISS3D.font = "normal 14px Roboto-Medium";
    ctxDashISS3D.fillText("12:45:23", 240, 120);

    ctxDashISS3D.fillStyle = "#bbbbbb";
    ctxDashISS3D.font = "normal 14px Roboto-Medium";
    ctxDashISS3D.fillText("16:22:12", 490, 125);


}

function deLonLat_a_pixeles (punto) {
    var puntoX = map(punto.x, -87.8, -75.7, 0, 1010);
    var puntoY = map(punto.y, 5.1,13, 350, 0);
    return (new THREE.Vector3(puntoX,puntoY,0));
}
