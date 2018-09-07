
function hagaDatosOrbita() {
    // solo genera una matriz de datos que guarda en el array posicionesDeSatelite [] para probar
    var pasos = 200; // 60
    var lonStep = 360 /pasos; // 60 pasos de 6 grados
    var latActual = 0; // 30/2
    var latActual2D = 0; // 30/2
    var indice=0;
    var anguloActual = 0;
    var anguloStep = Math.PI * 2 / pasos;
    var radioTrigonometrico = 11; // 20

    for (var lonActual = -180; lonActual < 180; lonActual+= lonStep) {
        latActual = radioTrigonometrico * Math.sin(anguloActual);
        latActual2D = -radioTrigonometrico * Math.sin(anguloActual);

        posicionesDeSatelite [indice] = definaPosicionEnLaOrbitaDe(lonActual, latActual, alturaDeOrbita);
        posicionesDeSateliteEnTierra [indice] = definaPosicionEnTierraDe(lonActual, latActual);
        lonLatDeSateliteEnTierra [indice] = new THREE.Vector2(lonActual,latActual);
        lonLatDeSateliteEnTierra2D [indice] = new THREE.Vector2(lonActual,latActual2D);

        //console.log("lonLatDeSateliteEnTierra en array en " + indice + ": " +lonLatDeSateliteEnTierra[indice].x.toFixed(2) +" , "+ lonLatDeSateliteEnTierra[indice].y.toFixed(2) );

        //console.log("lonLatDeSateliteEnTierra en array en " + indice + ": " +lonLatDeSateliteEnTierra[indice].x.toFixed(2) +" , "+ lonLatDeSateliteEnTierra[indice].y.toFixed(2) );
        indice++;
        anguloActual += anguloStep;
    }
    // note que hay tres tipos de arraz las dos de posiciones que están en el sistema coordenado de ThreeJS
    // y la de lonLatDeSateliteEnTierra que sigue en longitud y latitud
    posicionDeActualSatelite = posicionesDeSatelite [posicionEnOrbita];
    posicionEnTierraDelSatelite = posicionesDeSateliteEnTierra[posicionEnOrbita];
}

//


function definaPosicionEnLaOrbitaDe (lon, lat, alturaDeOrbita) {
    var alfaLocal = map(lon, -180, 180, Math.PI, -Math.PI);
    var betaLocal = map(lat, -90, 90, -Math.PI / 2, Math.PI / 2);

    // el radio de la altura de la orbitaz
    var rMenorOrbita = alturaDeOrbita * Math.cos(betaLocal);
    var puntoAltoX = rMenorOrbita * Math.cos(alfaLocal);
    var puntoAltoY = alturaDeOrbita * Math.sin(betaLocal);
    var puntoAltoZ = rMenorOrbita * Math.sin(alfaLocal);
    return  (new THREE.Vector3(puntoAltoX,puntoAltoY,puntoAltoZ));
}

function definaPosicionEnTierraDe (lon, lat) {
    var alfaLocal = map(lon, -180, 180, Math.PI, -Math.PI);
    var betaLocal = map(lat, -90, 90, -Math.PI / 2, Math.PI / 2);

    // con los radios del globo
    rMenor = rMayor * Math.cos(betaLocal);
    var punto0x = rMenor * Math.cos(alfaLocal);
    var punto0y = rMayor * Math.sin(betaLocal);
    var punto0z = rMenor * Math.sin(alfaLocal);
    return  (new THREE.Vector3(punto0x,punto0y,punto0z));
}

function definaPosicionEnElAireDe (lon, lat) {
    var alfaLocal = map(lon, -180, 180, Math.PI, -Math.PI);
    var betaLocal = map(lat, -90, 90, -Math.PI / 2, Math.PI / 2);

    // con los radios del globo
    var rMayorAire = rMayor * 1.01;
    var rMenorAire = rMayorAire * Math.cos(betaLocal);
    var punto0x = rMenorAire * Math.cos(alfaLocal);
    var punto0y = rMayorAire * Math.sin(betaLocal);
    var punto0z = rMenorAire * Math.sin(alfaLocal);
    return  (new THREE.Vector3(punto0x,punto0y,punto0z));
}



// crea cuadraditos en el mapa a partir de latitud y longitud de un lugar
function created3DAreaDeCobertura () {

    // creando una pequeña esfera debajo del satelite
    var sphereGeometry = new THREE.SphereGeometry(0.1, 10, 10);
    var sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
    centroDeHexagono = new THREE.Mesh(sphereGeometry, sphereMaterial);

    centroDeHexagono.position.x = posicionEnTierraDelSatelite.x;
    centroDeHexagono.position.y = posicionEnTierraDelSatelite.y;
    centroDeHexagono.position.z = posicionEnTierraDelSatelite.z;
    centroDeHexagono.matrixAutoUpdate = true;
    centroDeHexagono.updateMatrixWorld();
    scene.add(centroDeHexagono);


    // creando los puntos del exagono de area de cobertura
    var radioDeArea = 15;  // 0.5 y 0.866 sin y cos de 30
    var puntoExagono1 = definaPosicionEnElAireDe (lonLatDeSateliteEnTierra[posicionEnOrbita].x+radioDeArea, lonLatDeSateliteEnTierra[posicionEnOrbita].y);
    var puntoExagono2 = definaPosicionEnElAireDe (lonLatDeSateliteEnTierra[posicionEnOrbita].x+radioDeArea*0.5, lonLatDeSateliteEnTierra[posicionEnOrbita].y+radioDeArea*0.866);
    var puntoExagono3 = definaPosicionEnElAireDe (lonLatDeSateliteEnTierra[posicionEnOrbita].x-radioDeArea*0.5, lonLatDeSateliteEnTierra[posicionEnOrbita].y+radioDeArea*0.866);
    var puntoExagono4 = definaPosicionEnElAireDe (lonLatDeSateliteEnTierra[posicionEnOrbita].x-radioDeArea, lonLatDeSateliteEnTierra[posicionEnOrbita].y);
    var puntoExagono5 = definaPosicionEnElAireDe (lonLatDeSateliteEnTierra[posicionEnOrbita].x-radioDeArea*0.5, lonLatDeSateliteEnTierra[posicionEnOrbita].y-radioDeArea*0.866);
    var puntoExagono6 = definaPosicionEnElAireDe (lonLatDeSateliteEnTierra[posicionEnOrbita].x+radioDeArea*0.5, lonLatDeSateliteEnTierra[posicionEnOrbita].y-radioDeArea*0.866);

    sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
    pinHexagono1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pinHexagono1.position.x = puntoExagono1.x;
    pinHexagono1.position.y = puntoExagono1.y;
    pinHexagono1.position.z = puntoExagono1.z;
    pinHexagono1.matrixAutoUpdate = true;
    pinHexagono1.updateMatrixWorld();
    scene.add(pinHexagono1);


    pinHexagono2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pinHexagono2.position.x = puntoExagono2.x;
    pinHexagono2.position.y = puntoExagono2.y;
    pinHexagono2.position.z = puntoExagono2.z;
    pinHexagono2.matrixAutoUpdate = true;
    pinHexagono2.updateMatrixWorld();
    scene.add(pinHexagono2);

    pinHexagono3 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pinHexagono3.position.x = puntoExagono3.x;
    pinHexagono3.position.y = puntoExagono3.y;
    pinHexagono3.position.z = puntoExagono3.z;
    pinHexagono3.matrixAutoUpdate = true;
    pinHexagono3.updateMatrixWorld();
    scene.add(pinHexagono3);

    pinHexagono4 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pinHexagono4.position.x = puntoExagono4.x;
    pinHexagono4.position.y = puntoExagono4.y;
    pinHexagono4.position.z = puntoExagono4.z;
    pinHexagono4.matrixAutoUpdate = true;
    pinHexagono4.updateMatrixWorld();
    scene.add(pinHexagono4);

    pinHexagono5 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pinHexagono5.position.x = puntoExagono5.x;
    pinHexagono5.position.y = puntoExagono5.y;
    pinHexagono5.position.z = puntoExagono5.z;
    pinHexagono5.matrixAutoUpdate = true;
    pinHexagono5.updateMatrixWorld();
    scene.add(pinHexagono5);

    pinHexagono6 = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pinHexagono6.position.x = puntoExagono6.x;
    pinHexagono6.position.y = puntoExagono6.y;
    pinHexagono6.position.z = puntoExagono6.z;
    pinHexagono6.matrixAutoUpdate = true;
    pinHexagono6.updateMatrixWorld();
    scene.add(pinHexagono6);

    // para los triangulos del area de cobertura
    var geom = new THREE.Geometry();
    var materialDelTriangulo = new THREE.MeshBasicMaterial( {color: 0xff0000, opacity: 0.3} );
    materialDelTriangulo.side = THREE.DoubleSide;
    materialDelTriangulo.transparent = true;

    var centroEnAire = definaPosicionEnElAireDe (lonLatDeSateliteEnTierra[posicionEnOrbita].x, lonLatDeSateliteEnTierra[posicionEnOrbita].y);

    //geom.vertices.push(posicionEnTierraDelSatelite);
    geom.vertices.push(centroEnAire);
    geom.vertices.push(puntoExagono1);
    geom.vertices.push(puntoExagono2);
    geom.vertices.push(puntoExagono3);
    geom.vertices.push(puntoExagono4);
    geom.vertices.push(puntoExagono5);
    geom.vertices.push(puntoExagono6);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 0, 2, 3 ) );
    geom.faces.push( new THREE.Face3( 0, 3, 4 ) );
    geom.faces.push( new THREE.Face3( 0, 4, 5 ) );
    geom.faces.push( new THREE.Face3( 0, 5, 6 ) );
    geom.faces.push( new THREE.Face3( 0, 6, 1 ) );
    triangulos = new THREE.Mesh( geom, materialDelTriangulo );
    triangulos.matrixAutoUpdate = true;
    triangulos.updateMatrixWorld();
    scene.add(triangulos);

    // para las lineas de proyeccion
    var ejeGeometry = new THREE.Geometry();
    var transparenciaDeRayos = 0.5;

    ejeGeometry = new THREE.Geometry();
    ejeGeometry.vertices.push(posicionDeActualSatelite);
    ejeGeometry.vertices.push(posicionEnTierraDelSatelite);
    eje0 = new THREE.Line(ejeGeometry, new THREE.LineBasicMaterial({color: 0xff0000, opacity: transparenciaDeRayos, transparent: true}));
    eje0.matrixAutoUpdate = true;
    eje0.updateMatrixWorld();
    scene.add(eje0);

    ejeGeometry.vertices.push(posicionDeActualSatelite);
    ejeGeometry.vertices.push(puntoExagono1);
    eje1 = new THREE.Line(ejeGeometry, new THREE.LineBasicMaterial({color: 0xff0000, opacity: transparenciaDeRayos, transparent: true}));
    eje1.matrixAutoUpdate = true;
    eje1.updateMatrixWorld();
    scene.add(eje1);

    ejeGeometry = new THREE.Geometry();
    ejeGeometry.vertices.push(posicionDeActualSatelite);
    ejeGeometry.vertices.push(puntoExagono2);
    eje2 = new THREE.Line(ejeGeometry, new THREE.LineBasicMaterial({color: 0xff0000, opacity: transparenciaDeRayos, transparent: true}));
    eje2.matrixAutoUpdate = true;
    eje2.updateMatrixWorld();
    scene.add(eje2);

    ejeGeometry = new THREE.Geometry();
    ejeGeometry.vertices.push(posicionDeActualSatelite);
    ejeGeometry.vertices.push(puntoExagono3);
    eje3 = new THREE.Line(ejeGeometry, new THREE.LineBasicMaterial({color: 0xff0000, opacity: transparenciaDeRayos, transparent: true}));
    eje3.matrixAutoUpdate = true;
    eje3.updateMatrixWorld();
    scene.add(eje3);

    ejeGeometry = new THREE.Geometry();
    ejeGeometry.vertices.push(posicionDeActualSatelite);
    ejeGeometry.vertices.push(puntoExagono4);
    eje4 = new THREE.Line(ejeGeometry, new THREE.LineBasicMaterial({color: 0xff0000, opacity: transparenciaDeRayos, transparent: true}));
    eje4.matrixAutoUpdate = true;
    eje4.updateMatrixWorld();
    scene.add(eje4);

    ejeGeometry = new THREE.Geometry();
    ejeGeometry.vertices.push(posicionDeActualSatelite);
    ejeGeometry.vertices.push(puntoExagono5);
    eje5 = new THREE.Line(ejeGeometry, new THREE.LineBasicMaterial({color: 0xff0000, opacity: transparenciaDeRayos, transparent: true}));
    eje5.matrixAutoUpdate = true;
    eje5.updateMatrixWorld();
    scene.add(eje5);

    ejeGeometry = new THREE.Geometry();
    ejeGeometry.vertices.push(posicionDeActualSatelite);
    ejeGeometry.vertices.push(puntoExagono6);
    eje6 = new THREE.Line(ejeGeometry, new THREE.LineBasicMaterial({color: 0xff0000, opacity: transparenciaDeRayos, transparent: true}));
    eje6.matrixAutoUpdate = true;
    eje6.updateMatrixWorld();
    scene.add(eje6);

}



function creeOrbita() {
    hagaDatosOrbita(); // se hacen porque aun no estan listos

    var materialDeLinea = new THREE.LineBasicMaterial({color: 0x888800, opacity: 0.25});
    materialDeLinea.transparent = true;
    var axeGeometry = new THREE.Geometry();

    for (var i = 0; i < posicionesDeSatelite.length-1; i++) {
        axeGeometry.vertices.push(posicionesDeSatelite[i]);
        axeGeometry.vertices.push(posicionesDeSatelite[i+1]); // material.transparent = true;
        var axe = new THREE.Line(axeGeometry, materialDeLinea);
        axe.matrixAutoUpdate = true;
        axe.updateMatrixWorld();
        scene.add(axe);
    } // end x for

    creeSatelite3D ();
    created3DAreaDeCobertura ();
}


function creeSatelite3D () {
    var skyboxGeometry = new THREE.CubeGeometry(0.5, 0.5, 0.5);
    var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xff3333, side: THREE.BackSide });
    skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    skybox.position.x = posicionDeActualSatelite.x;
    skybox.position.y = posicionDeActualSatelite.y;
    skybox.position.z = posicionDeActualSatelite.z;
    scene.add(skybox);
}



function reMuevaSatelite (){
    scene.remove(skybox);
    scene.remove(centroDeHexagono);
    scene.remove(pinHexagono1);
    scene.remove(pinHexagono2);
    scene.remove(pinHexagono3);
    scene.remove(pinHexagono4);
    scene.remove(pinHexagono5);
    scene.remove(pinHexagono6);
    scene.remove(triangulos);
    scene.remove(eje0);
    scene.remove(eje1);
    scene.remove(eje2);
    scene.remove(eje3);
    scene.remove(eje4);
    scene.remove(eje5);
    scene.remove(eje6);

    destruyaEtiqueta ("etiquetaDelSat1");
    destruyaEtiqueta ("etiquetaDelSat2");
    destruyaEtiqueta ("etiquetaDelSat3");

    //posicionEnOrbita += 1;
    posicionDeActualSatelite = posicionesDeSatelite [posicionEnOrbita];
    posicionEnTierraDelSatelite = posicionesDeSateliteEnTierra[posicionEnOrbita];

    creeSatelite3D ();
    created3DAreaDeCobertura ();
}

