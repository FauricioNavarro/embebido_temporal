/**
 * Created by franklinhc on 8/19/15.
 */

/*
    camera.position.x = 25;
    camera.position.y = 10;
    camera.position.z = 70;
    camera.lookAt(scene.position);

 */

// setup camera
var deltaX = 0;
var deltaY = 0;
var deltaZ = 0;

var xCamara; //-973; //250
var yCamara; //2537;  //-250
var zCamara;
var arribaZ;
var centroEscena = new THREE.Vector3( deltaX, deltaY, deltaZ);

var radioMayorCamera = 70;  //2000
var radioMenorCamera = 70;  //2000

var alfaCamera = 1.58;                         //1.93; tres cuartos      // PI/2        1.58 vertical
var betaCamera = 0.0;      //-1.31           //-0.47; tres cuartos     //0           -1.56 vertical

//incrementos
var incrementoGiro;  //360/6
var incrementoZoom = 30;
var incrementoPaneo = 15;


function actualizePosCamara() {
    alfaCamera = alfaCamera % (2*Math.PI); // modulacion de los angulos a 2 pi
    betaCamera = betaCamera % (2*Math.PI);

    //println( "alfa = " + alfa + "   beta = " + beta);
    radioMenorCamera = radioMayorCamera * Math.cos (betaCamera);
    xCamara = radioMenorCamera * Math.cos (alfaCamera);
    yCamara = radioMayorCamera * Math.sin (Math.PI - betaCamera);
    zCamara = radioMenorCamera * Math.sin (alfaCamera);

    if (((betaCamera>Math.PI/2) && (betaCamera<2*Math.PI*3/4)) || ((betaCamera < -Math.PI/2) && betaCamera >( -2*Math.PI*3/4))) {
        //define si la camara esta en un cuadrante donde esta boca abajo
        arribaZ=-1.0;                       // y define el UP de la camara
    } else {
        arribaZ=1.0;
    }

    var densidadDeGiro = 4;

    incrementoGiro = Math.PI/(360/densidadDeGiro);  //360/6
    incrementoZoom = 10;

    camera.position.x = xCamara+deltaX;
    camera.position.y = yCamara+deltaY;
    camera.position.z = zCamara+deltaZ;

    centroEscena = new THREE.Vector3( deltaX, deltaY, deltaZ);

    camera.lookAt(centroEscena); // scene.position
}