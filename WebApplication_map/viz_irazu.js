/**
 * Created by franklinhc on 9/12/15.
 */
window.onload = onReady; // first function call

// for frame rate
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;

// mouse position any time
var mouseX, mouseY;

var frameCounter;
var frameRate;

//las canvas;
var canvasDashIzquierdo;
var ctxDashIzquierdo;

var canvasDashDerecho;
var ctxDashDerecho;

var canvasDashInferior;
var ctxDashInferior;

var canvasDashISS3D;
var ctxDashISS3D;

var canvasDashSuperior;
var ctxDashSuperior;

var canvasDashComponentes;
var ctxDashComponentes;

var canvasDashDendrometro;
var ctxDashDendrometro;



// global variables
var renderer;
var scene;
var camera;
var cameraPos;
//var myWidth = window.innerWidth;
//var myHeight = window.innerHeight;

var myWidth = 350;
var myHeight = 350;

var cameraControl;

// pasos para crear el mundo los radios son del globo
var pasos = 15;
var lonStep = Math.PI *2 / pasos; // longitud corre [-180,180] -> []
var latStep = Math.PI / pasos / 2;  // latitud corre [-90,90] -> []
var rMayor = 25;
var rMenor = 0;

var cuadrados = [];
var posicionDeCuadrados = [];

// para etiquetas
var container;
var ctxContainer;
var textlabels=[];
var posicionDeEtiquetas = [];
var ejesDeEtiquetas = [];
var largoDeEjesDeEtiquetas = 1.3;

var earthMesh;
var posicionDeActualSatelite;
var posicionEnTierraDelSatelite;
var alturaDeOrbita = 33;
var posicionesDeSatelite = [];
var posicionesDeSateliteEnTierra = [];
var lonLatDeSateliteEnTierra = [];
var lonLatDeSateliteEnTierra2D = [];
var posicionEnOrbita = 52;
var skybox, centroDeHexagono, triangulos;
var pinHexagono1, pinHexagono2, pinHexagono3, pinHexagono4, pinHexagono5, pinHexagono6;
var eje0, eje1, eje2, eje3, eje4, eje5, eje6;
var etiquetaDelSat1, etiquetaDelSat2, etiquetaDelSat3;
var espacio = 3.4;

var cargaDeBateria = 65;

var datosDiametros;
var botonesDeDiametros = [];

var datosHumedades;
var botonesDeHumedades = [];

var datosSegnal;
var botonesDeSegnales = [];

var colorHumedades = "rgba(250, 80, 80, 0.8)";
var colorSegnales = "rgba(100, 100, 255, 1.0)";
var colorDiametros = "rgba(80, 250, 80, 0.5)";

var escena = 1;
var fondoEscena2;
var reloj;

var botonISS;
var botonOrbita;
var botonComponentes;
var botonDendrometro;

var video1, video2;


function onReady() {
    // your inicialization code here  ----------------------------------------------
    frameCounter = 0;
    //document.onkeydown=function(){keyInput()};


    // escene
    scene = new THREE.Scene();
    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(myWidth, myHeight);
    renderer.shadowMapEnabled = true;

    // add the output of the renderer to the html element
    /*
    document.body.appendChild(renderer.domElement);

    container = document.getElementById('container');
    //ctxContainer = container.getContext('2d');
    container.appendChild(this.renderer.domElement);

    
     canvasDashIzquierdo = document.getElementById('dashIzquierdo');
    ctxDashIzquierdo = canvasDashIzquierdo.getContext('2d');
     */


    // camera
    /* -----------
    camera = new THREE.PerspectiveCamera(70, myWidth/myHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 70;
    camera.lookAt(centroEscena);


    // lights
    // directional light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set( 100,100,-20 );
    directionalLight.target.position.set( 0, 0, 0 );

    //directionalLight.position = new THREE.Vector3(100,10,-50);
    directionalLight.name = 'directional';
    scene.add(directionalLight);


    // add controls
    cameraControl = new THREE.OrbitControls(camera);
------------- */ 
    // creando los objetos en 3D
    //created3Dworld ();
    //createdContinentes ();
    creeOrbita();

    /*
    // para las etiquetas
    for (var i = 0; i < ciudades.length; i++) {
        creeEjeEnLugar (ciudades[i][0], ciudades[i][1], ciudades[i][2],i);
        hagaEtiqueta (ciudades[i][0], ciudades[i][1], ciudades[i][2]);
        posicionDeEtiquetas[i] = definaPosicionEnTierraDe (ciudades[i][0], ciudades[i][1]);
    } // fin del ciclo for
    */
    //etiquetaDelSat1 = "cubeSat Irazú";


    // inicio 2D setup ----------------------------------------------------------
    /* 
    canvasDashIzquierdo = document.getElementById('dashIzquierdo');
    ctxDashIzquierdo = canvasDashIzquierdo.getContext('2d');
    canvasDashIzquierdo.height = 350;
    canvasDashIzquierdo.width = 150;

    */

    canvasDashDerecho = document.getElementById('dashDerecho');
    ctxDashDerecho = canvasDashDerecho.getContext('2d');
    canvasDashDerecho.height = 610; //Deberia estar en 750 pero mejor lo cambiamos 
    canvasDashDerecho.width = 920;


    /* dash de las gráficas */
    /*
    canvasDashInferior = document.getElementById('dashInferior');
    ctxDashInferior = canvasDashInferior.getContext('2d');
    canvasDashInferior.height = 100;
    canvasDashInferior.width = 1010;
    canvasDashInferior.addEventListener('mousemove', pick);
    canvasDashInferior.addEventListener('mouseup', click);
    */


    /*
    canvasDashSuperior = document.getElementById('dashSuperior');
    ctxDashSuperior = canvasDashSuperior.getContext('2d');
    canvasDashSuperior.height = 20;
    canvasDashSuperior.width = 1010;
    canvasDashSuperior.addEventListener('mouseup', click);
    */

    /*
    canvasDashDendrometro = document.getElementById('dashDendrometro');
    ctxDashDendrometro = canvasDashDendrometro.getContext('2d');
    canvasDashDendrometro.height = 350;
    canvasDashDendrometro.width = 855;

    canvasDashComponentes = document.getElementById('dashComponentes');
    ctxDashComponentes = canvasDashComponentes.getContext('2d');
    canvasDashComponentes.height = 350;
    canvasDashComponentes.width = 855;
    */


/* esto es lo que le da forma a las gráficas -------- vida de animación
    // dashInferior
    var stringAhora = "";
    var xAhora = 0;
    var yAhora = 0;
    var posAhora = new THREE.Vector3(xAhora,yAhora,0);


    datosDiametros = analiceDatos (diametros);
    var margenIzq = 5;
    var margenSup = 80; //
    var pazoHz = (canvasDashInferior.width+50)/diametros.length;
    for(var i=0; i<diametros.length; i++) {
        xAhora = i*pazoHz+margenIzq;
        yAhora = -1*map(diametros[i], datosDiametros.x, datosDiametros.y, 0, 50) + margenSup;
        posAhora = new THREE.Vector3(xAhora,yAhora,0);
        stringAhora = ("crecimiento: " + diametros[i]+ "  cm.");
        botonesDeDiametros.push (new DatoBoton (posAhora, stringAhora, colorDiametros));
        //console.log("botonesDeDiametros: "+ i + "   , posAhora.x: "+ posAhora.x + "   posAhora.y: "+ posAhora.y);
    }

    datosHumedades = analiceDatos (humedades);
    pazoHz = (canvasDashInferior.width-3)/humedades.length;
    for(var i=0; i<humedades.length; i++) {
        xAhora = i * pazoHz +margenIzq;
        yAhora = -1*map(humedades[i], datosHumedades.x, datosHumedades.y, 0, 50) + margenSup;
        posAhora = new THREE.Vector3(xAhora,yAhora,0);
        stringAhora = ("humedad: " + humedades[i]+ " pr.");
        botonesDeHumedades.push (new DatoBoton (posAhora,stringAhora,colorHumedades));
        //console.log("botonesDeDiametros: "+ i + "   , posAhora.x: "+ posAhora.x + "   posAhora.y: "+ posAhora.y);
    }

    datosSegnal = analiceDatos (segnales);
    pazoHz = (canvasDashInferior.width -3)/segnales.length;
    for(var i=0; i<segnales.length; i++) {
        xAhora = i * pazoHz +margenIzq;
        yAhora = -1*map(segnales[i], datosSegnal.x, datosSegnal.y, 0, 50) + margenSup;
        posAhora = new THREE.Vector3(xAhora,yAhora,0);
        stringAhora = ("señal: " + segnales[i]+ " sr.");
        botonesDeSegnales.push (new DatoBoton (posAhora,stringAhora, colorSegnales));
        //console.log("botonesDeDiametros: "+ i + "   , posAhora.x: "+ posAhora.x + "   posAhora.y: "+ posAhora.y);
    }



*/



    // segundo escenario ------------------------------------------------------------
    /*
    canvasDashISS3D = document.getElementById('dashISS3D');
    ctxDashISS3D = canvasDashISS3D.getContext('2d');
    canvasDashISS3D.width = 1010;
    canvasDashISS3D.height = 350;
    canvasDashISS3D.addEventListener('mouseup', click);
    */
    // loading pictures
    /*
    fondoEscena2 = new Image();
    fondoEscena2.src = "assets/fondo-posicion-ISS.png";
    reloj = new Image();
    reloj.src = "assets/reloj.png";



    video1 = document.createElement('video');
    video1.src =  "assets/partesDelSatelite.mp4" ;
    video1.load();
    video1.play();

    video2 = document.createElement('video');
    video2.src =  "assets/partesDendrometro.mov" ;
    video2.load();
    video2.play();
*/



    // botones del menu superior ------------------------------------------------------------
    /*
    botonOrbita = new ClaseBotonRect(500,2,100,15,1,"órbita");
    botonISS = new ClaseBotonRect(650,2,100,15,2,"ISS");
    botonComponentes = new ClaseBotonRect(780,2,100,15,3,"partes");
    botonDendrometro = new ClaseBotonRect(909,2,100,15,4,"dendrómetro");  // 500 - 650 - 780 - 909
    */


    draw();
    console.log("ready to gooo!");
} // end onReady()





// your drawing code here ---------------------------------------------------
function draw () {
    var thisFrameTime = (thisLoop=new Date) - lastLoop;

    switch (escena) {

        case 1: // caso uno con el mundo 3D ------------------------------------------------------------------------------------------------
        
        /*
            ctxDashISS3D.clearRect(0, 0, canvasDashISS3D.width, canvasDashISS3D.height);
            ctxDashComponentes.clearRect(0, 0, canvasDashComponentes.width, canvasDashComponentes.height);
            ctxDashDendrometro.clearRect(0, 0, canvasDashDendrometro.width, canvasDashDendrometro.height);

            //renderer.setClearColor(0x000000, 0.5);

            alfaCamera -= 0.025;
            actualizePosCamara();

            cameraPos = camera.position.clone();
            scene.updateMatrixWorld(true);
            //console.log("cameraPos X:"+ cameraPos.x.toFixed(2) + "   cameraPos Y:"+ cameraPos.y.toFixed(2) + "   cameraPos Z:"+ cameraPos.z.toFixed(2));
            // update the camera
            cameraControl.update();
            camera.updateMatrixWorld();

            // and render the scene
            renderer.render(scene, camera);

            for (var i = 0; i < textlabels.length; i++) {
                textlabels[i].updatePosition();
            }

            // para definir la opacidad de los cuadros segun su distancia de la camara
            var maximaDistancia = 0;
            var minimaDistancia = 1000;

            for (var i = 0; i < cuadrados.length; i++) {
                var position = posicionDeCuadrados[i];
                var distance = cameraPos.distanceTo(position);
                //if(maximaDistancia<distance) maximaDistancia=distance;
                //if(minimaDistancia>distance) minimaDistancia=distance;
                cuadrados[i].material.opacity = map(distance, 50, 100, 0.6, 0); // 0.3  esto funciona
            }
            //console.log("maximaDistancia: "+ maximaDistancia+ "   mínimaDistancia: "+ minimaDistancia); // [50-100]

            // para etiqueta de satelite
            var positionEtiquetaActual = posicionesDeSatelite [posicionEnOrbita];
            var distanceDeEtiquetaActual = cameraPos.distanceTo(positionEtiquetaActual);
            //console.log("distanceDeEtiquetaActual: "+ distanceDeEtiquetaActual);
            etiquetaDelSat2 = 'longitud =' + (lonLatDeSateliteEnTierra[posicionEnOrbita].x.toFixed(4));
            etiquetaDelSat3 = 'latitud =' + (lonLatDeSateliteEnTierra[posicionEnOrbita].y.toFixed(4));  //

            var promedioDistancia = 55;
            if (distanceDeEtiquetaActual < promedioDistancia) {
                hagaEtiquetaSatelite(lonLatDeSateliteEnTierra[posicionEnOrbita].x, lonLatDeSateliteEnTierra[posicionEnOrbita].y, etiquetaDelSat1, "etiquetaDelSat1");
                hagaEtiquetaSatelite(lonLatDeSateliteEnTierra[posicionEnOrbita].x, lonLatDeSateliteEnTierra[posicionEnOrbita].y - espacio, etiquetaDelSat2, "etiquetaDelSat2");
                hagaEtiquetaSatelite(lonLatDeSateliteEnTierra[posicionEnOrbita].x, lonLatDeSateliteEnTierra[posicionEnOrbita].y - espacio * 2, etiquetaDelSat3, "etiquetaDelSat3");
            }
            if (distanceDeEtiquetaActual > promedioDistancia) {
                destruyaEtiqueta("etiquetaDelSat1");
                destruyaEtiqueta("etiquetaDelSat2");
                destruyaEtiqueta("etiquetaDelSat3");
            }

            promedioDistancia = 75;

            for (var i = 0; i < ciudades.length; i++) {
                positionEtiquetaActual = posicionDeEtiquetas[i];
                distanceDeEtiquetaActual = cameraPos.distanceTo(positionEtiquetaActual);

                //var promedioDistancia = (maximaDistancia+minimaDistancia)/2;

                if (distanceDeEtiquetaActual < promedioDistancia) hagaEtiqueta(ciudades[i][0], ciudades[i][1], ciudades[i][2]);
                if (distanceDeEtiquetaActual > promedioDistancia) destruyaEtiqueta(ciudades[i][2]);

                //var miOpacidad =  map(distance, 50,100,1.0,0);
                ejesDeEtiquetas[i].material.opacity = map(distanceDeEtiquetaActual, 40, 80, 1.0, 0);
                //if(maximaDistancia<distanceDeEtiquetaActual) maximaDistancia=distanceDeEtiquetaActual;
                //if(minimaDistancia>distanceDeEtiquetaActual) minimaDistancia=distanceDeEtiquetaActual;

                //console.log("maximaDistancia: "+ maximaDistancia + "   mínimaDistancia: "+ minimaDistancia + "   distanceDeEtiquetaActual: "+ distanceDeEtiquetaActual);
                //ejesDeEtiquetas[i].material.opacity = 1;
            }

            //created3DAreaDeCobertura();


            refresqueDashIzquierdoConGraficos ();*/
            dibujeContinentesEn2D();
            dibujeCiudadesEn2D ();
            dibujeOrbita2D();
            break;




        case 2:  // caso 2 con la ISS  ------------------------------------------------------------------------------------------------
            /*
            ctxDashISS3D.drawImage(fondoEscena2, 0, 0);
            ctxDashComponentes.clearRect(0, 0, canvasDashComponentes.width, canvasDashComponentes.height);
            ctxDashDendrometro.clearRect(0, 0, canvasDashDendrometro.width, canvasDashDendrometro.height);
            ctxDashDerecho.clearRect(0, 0, canvasDashDerecho.width, canvasDashDerecho.height);

            dibujeOrbitaEnISSDash ();
            destruyaEtiquetas3D ();
            */
            break;






        case 3:  // caso 3 componentes  ------------------------------------------------------------------------------------------------
         
        /*
        ctxDashISS3D.clearRect(0, 0, canvasDashISS3D.width, canvasDashISS3D.height);
            ctxDashDendrometro.clearRect(0, 0, canvasDashDendrometro.width, canvasDashDendrometro.height); //
            ctxDashDerecho.clearRect(0, 0, canvasDashDerecho.width, canvasDashDerecho.height); // 350, 500
            // para el fondo negro del dashComponentes
            ctxDashComponentes.fillStyle = "rgba(0, 0, 0, 1)";
            ctxDashComponentes.beginPath();
            ctxDashComponentes.rect(0, 0, 855, 350);
            ctxDashComponentes.closePath();
            ctxDashComponentes.fill();
            // para el video
            ctxDashComponentes.drawImage(video1, 0, 0);
            video1.play();
            //dibujeCirculoRojoEn (ctxDashComponentes, 100, 100);

            refresqueDashIzquierdoConGraficos ();
            destruyaEtiquetas3D ();
*/
            break;

            //







        case 4:  // caso 4 dendrómetro  ------------------------------------------------------------------------------------------------
        /*   
        ctxDashISS3D.clearRect(0, 0, canvasDashISS3D.width, canvasDashISS3D.height);
            ctxDashDerecho.clearRect(0, 0, canvasDashDerecho.width, canvasDashDerecho.height);
            ctxDashComponentes.clearRect(0, 0, canvasDashComponentes.width, canvasDashComponentes.height);
            // para el fondo negro del dashDendrometro
            ctxDashDendrometro.fillStyle = "rgba(0, 0, 0, 1)";
            ctxDashDendrometro.beginPath();
            ctxDashDendrometro.rect(0, 0, 855, 350);
            ctxDashDendrometro.closePath();
            ctxDashDendrometro.fill();
            // para el video
            ctxDashDendrometro.drawImage(video2, 0, 0);
            video2.play();
            //dibujeCirculoRojoEn (ctxDashDendrometro, 200, 200);

            refresqueDashIzquierdoConGraficos ();
            destruyaEtiquetas3D();
*/
            break;
    }




    // for dash superior -- compartido por las dos escenas ------------------------------------------
    // para el fondo negro del dash superior
    /*
    ctxDashSuperior.fillStyle = "rgba(0, 0, 0, 1)";
    ctxDashSuperior.beginPath();
    ctxDashSuperior.rect(350, 0, 660, 20);
    ctxDashSuperior.closePath();
    ctxDashSuperior.fill();

    botonISS.render(ctxDashSuperior,(new THREE.Vector2(mouseX,mouseY)));
    botonOrbita.render(ctxDashSuperior,(new THREE.Vector2(mouseX,mouseY)));
    botonComponentes.render(ctxDashSuperior,(new THREE.Vector2(mouseX,mouseY)));
    botonDendrometro.render(ctxDashSuperior,(new THREE.Vector2(mouseX,mouseY)));
    */

    //refresqueDashInferiorConDatosForestales ();



    // frameRate calculating
    /*
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
    var fpsOut = document.getElementById('frameRate');
    frameRate = (1000/frameTime).toFixed(6);
    fpsOut.innerHTML = "current frame = " +frameCounter+ "   currente frame rate = "+(1000/frameTime).toFixed(2) + " fps";
    frameCounter += 1;
    */



    requestAnimFrame(draw);
} // end draw ------------------------------------------------------------------------------------------------------------



function destruyaEtiquetas3D () {
    for (var i = 0; i < ciudades.length; i++) {
        destruyaEtiqueta(ciudades[i][2]);
    }
    destruyaEtiqueta("etiquetaDelSat1");
    destruyaEtiqueta("etiquetaDelSat2");
    destruyaEtiqueta("etiquetaDelSat3");
}











// for events  ---------------------------------------------------
function pick(event) {
    //mouseX = event.layerX;
    //mouseY = event.layerY;
    mouseX = event.pageX;
    mouseY = event.pageY;
    //console.log("mouse x = " + mouseX + "   mouse y = " + mouseY);

}

function click(event) {
    event = event || window.event;
    mouseX = event.pageX;
    mouseY = event.pageY;
    console.log("mouse x = " + mouseX + "   mouse y = " + mouseY);

    // para los botones
    botonISS.checkMe(new THREE.Vector2(mouseX,mouseY));
    botonOrbita.checkMe(new THREE.Vector2(mouseX,mouseY));
    botonComponentes.checkMe(new THREE.Vector2(mouseX,mouseY));
    botonDendrometro.checkMe(new THREE.Vector2(mouseX,mouseY));
}



// for animation request  ---------------------------------------------------
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();