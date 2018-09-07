


function created3Dworld () {
    for (var y = 0; y < Math.PI*2; y+=latStep) {   // [PI, -PI]
        for (var x = 0; x < Math.PI*2; x+=lonStep) {   // [HALF_PI, -HALF_PI]
            rMenor = rMayor * Math.cos(y);
            var miX = rMenor * Math.cos(x);
            var miY = rMayor * Math.sin(y);
            var miZ = rMenor * Math.sin(x);
            // siguiente punto al oeste
            var miX2 = rMenor * Math.cos(x+lonStep);
            var miY2 = rMayor * Math.sin(y);
            var miZ2 = rMenor * Math.sin(x+lonStep);
            // siguiente punto para abajo
            rMenor = rMayor * Math.cos(y+latStep);
            var miX3 = rMenor * Math.cos(x);
            var miY3 = rMayor * Math.sin(y+latStep);
            var miZ3 = rMenor * Math.sin(x);
            // para lineas horizontales
            var materialDeLinea = new THREE.LineBasicMaterial({color: 0x44ff00, opacity: 0.15});
            materialDeLinea.transparent = true;
            var axeGeometry = new THREE.Geometry();
            var point1 = new THREE.Vector3(miX, miY, miZ);
            axeGeometry.vertices.push(point1);
            var point2 = new THREE.Vector3(miX2, miY2, miZ2);
            axeGeometry.vertices.push(point2); // material.transparent = true;
            var axe = new THREE.Line(axeGeometry, materialDeLinea);
            scene.add(axe);
            // para lineas verticales
            axeGeometry = new THREE.Geometry();
            point1 = new THREE.Vector3(miX, miY, miZ);
            axeGeometry.vertices.push(point1);
            point2 = new THREE.Vector3(miX3, miY3, miZ3);
            axeGeometry.vertices.push(point2); // material.transparent = true;
            axe = new THREE.Line(axeGeometry, materialDeLinea);
            scene.add(axe);
        } // end x for
    } // end y for
}



function createdContinentes () {
    // aqui se crean los continentes que vienen de una matrix de coordenadas llamada "puntos"
    // esta matriz se creo en processing y se almacena en el archivo "31mapamundi.js"
    // hay varias resoluciones para probar
    for (var i = 0; i < puntos.length; i++) {
        created3Dpoint (puntos[i][0], puntos[i][1], 0.15, i);
    }
    // arreglo a mano de centroamerica (era muy delgada y no salia)
    var colorAhora = 0x00ff00;
    created3DpointConCoordenadas (-82.5, 8.3, Math.random() + 0.5, colorAhora, puntos.length);
    created3DpointConCoordenadas (-83.0, 8.9, Math.random() + 0.5, colorAhora, puntos.length+1);
    created3DpointConCoordenadas (-80.50, 8.0, Math.random() + 0.5, colorAhora, puntos.length+2);
    created3DpointConCoordenadas (-78.0, 7.7, Math.random() + 0.5, colorAhora, puntos.length+3);
    created3DpointConCoordenadas (-76.3, 7.0, Math.random() + 0.5, colorAhora, puntos.length+4);
    created3DpointConCoordenadas (-76.0, 8.0, Math.random() + 0.5, colorAhora, puntos.length+5);
}



// crea los cuadraditos en el mapa a partir de los angulos
function created3Dpoint (alfa, beta, opacidad, index) {
    var lado = Math.random()* 0.01 + 0.005;

    rMenor = rMayor * Math.cos(beta-lado);
    var punto0x = rMenor * Math.cos(alfa-lado);
    var punto0y = rMayor * Math.sin(beta-lado);
    var punto0z = rMenor * Math.sin(alfa-lado);
    rMenor = rMayor * Math.cos(beta+lado);
    var punto1x = rMenor * Math.cos(alfa-lado);
    var punto1y = rMayor * Math.sin(beta+lado);
    var punto1z = rMenor * Math.sin(alfa-lado);
    rMenor = rMayor * Math.cos(beta+lado);
    var punto2x = rMenor * Math.cos(alfa+lado);
    var punto2y = rMayor * Math.sin(beta+lado);
    var punto2z = rMenor * Math.sin(alfa+lado);
    rMenor = rMayor * Math.cos(beta-lado);
    var punto3x = rMenor * Math.cos(alfa+lado);
    var punto3y = rMayor * Math.sin(beta-lado);
    var punto3z = rMenor * Math.sin(alfa+lado);

    var pointMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: opacidad } );
    pointMaterial.side = THREE.DoubleSide;
    pointMaterial.transparent = true;

    var geom = new THREE.Geometry();
    var v1 = new THREE.Vector3(punto0x,punto0y,punto0z);
    var v2 = new THREE.Vector3(punto1x,punto1y,punto1z);
    var v3 = new THREE.Vector3(punto2x,punto2y,punto2z);
    var v4 = new THREE.Vector3(punto3x,punto3y,punto3z);
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.vertices.push(v4);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 2, 3, 0 ) );

    var object = new THREE.Mesh( geom, pointMaterial );
    cuadrados[index] = object;
    posicionDeCuadrados[index] = v1;


    object.matrixAutoUpdate = true;
    object.updateMatrixWorld();
    //
    scene.add(object);
}



// crea cuadraditos en el mapa a partir de latitud y longitud de un lugar
function created3DpointConCoordenadas (alfaDegrees, betaDegrees, opacidad, colorAhora, index) {
    var lado = 0.01;
    var alfaLocal = map(alfaDegrees, -180, 180, Math.PI, -Math.PI);
    var betaLocal = map(betaDegrees, -90, 90, -Math.PI/2, Math.PI/2);

    rMenor = rMayor * Math.cos(betaLocal-lado);
    var punto0x = rMenor * Math.cos(alfaLocal-lado);
    var punto0y = rMayor * Math.sin(betaLocal-lado);
    var punto0z = rMenor * Math.sin(alfaLocal-lado);
    rMenor = rMayor * Math.cos(betaLocal+lado);
    var punto1x = rMenor * Math.cos(alfaLocal-lado);
    var punto1y = rMayor * Math.sin(betaLocal+lado);
    var punto1z = rMenor * Math.sin(alfaLocal-lado);
    rMenor = rMayor * Math.cos(betaLocal+lado);
    var punto2x = rMenor * Math.cos(alfaLocal+lado);
    var punto2y = rMayor * Math.sin(betaLocal+lado);
    var punto2z = rMenor * Math.sin(alfaLocal+lado);
    rMenor = rMayor * Math.cos(betaLocal-lado);
    var punto3x = rMenor * Math.cos(alfaLocal+lado);
    var punto3y = rMayor * Math.sin(betaLocal-lado);
    var punto3z = rMenor * Math.sin(alfaLocal+lado);
    var pointMaterial = new THREE.MeshBasicMaterial( { color: colorAhora, opacity: opacidad } );
    pointMaterial.side = THREE.DoubleSide;
    pointMaterial.transparent = true;
    var geom = new THREE.Geometry();
    var v1 = new THREE.Vector3(punto0x,punto0y,punto0z);
    var v2 = new THREE.Vector3(punto1x,punto1y,punto1z);
    var v3 = new THREE.Vector3(punto2x,punto2y,punto2z);
    var v4 = new THREE.Vector3(punto3x,punto3y,punto3z);
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.vertices.push(v4);
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 2, 3, 0 ) );

    var object = new THREE.Mesh( geom, pointMaterial );

    cuadrados[index] = object;
    posicionDeCuadrados[index] = v1;


    object.matrixAutoUpdate = true;
    object.updateMatrixWorld();

    scene.add(object);
}


