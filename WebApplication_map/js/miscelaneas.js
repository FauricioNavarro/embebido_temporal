
function keyInput(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 37: // flecha de la izquierda
            //alfaCamera -= incrementoGiro;
            break;
        case 38: // flecha de arriba
            //if (betaCamera < 0.250) betaCamera -= incrementoGiro; // 1.5
            break;
        case 39: // flecha de la derecha
            //alfaCamera += incrementoGiro;
            break;
        case 40: // flecha de abajo
            //if (betaCamera > -0.250) betaCamera += incrementoGiro;
            break;
        case 65: // "a"
            //radioMayorCamera += incrementoZoom;
            if (posicionEnOrbita < posicionesDeSatelite.length) posicionEnOrbita += 1;
            else posicionEnOrbita = 0;
            reMuevaSatelite ();
            break;
        case 90: // "z"
            if (posicionEnOrbita > 0) posicionEnOrbita -= 1;
            else posicionEnOrbita = posicionesDeSatelite.length-1;
            reMuevaSatelite ();
            break;

        case 49: // "1"
            escena = 1;
            //if (radioMayorCamera>10) radioMayorCamera -= incrementoZoom;
            break;

        case 50: // "1"
            escena = 2;
            //if (radioMayorCamera>10) radioMayorCamera -= incrementoZoom;
            break;
    }

    //actualizePosCamara();
    //console.log("dentro de keyInput con keyCode = " + e.keyCode);
    //console.log("posicionEnOrbita = " + posicionEnOrbita);
}







// other functions  ---------------------------------------------------


function dibujeCirculoRojoEn (ctx, puntoX, puntoY) {
    ctx.fillStyle = "rgba(250, 0, 0, 1)";
    ctx.beginPath();
    ctx.arc(puntoX, puntoY, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}






function map(valor, minFuente, maxFuente, minTarget, maxTarget){
    if (valor < minFuente) return minTarget;
    if (valor > maxFuente) return maxTarget;

    var tmp = (maxTarget-minTarget)/(maxFuente-minFuente);
    tmp = (tmp * (valor-minFuente))+minTarget;
    return tmp;
}




function createEjes() {
    var largoDeEjes = 100;
    // eje X
    var lineGeometry = new THREE.Geometry();

    var vertex = new THREE.Vector3(0, 0, 0 );
    lineGeometry.vertices.push( vertex );

    var vertex2 = new THREE.Vector3(largoDeEjes, 0, 0 );
    lineGeometry.vertices.push( vertex2 );

    var line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1 } ) );
    scene.add( line );

    lineGeometry = new THREE.Geometry();

    vertex = new THREE.Vector3(0, 0, 0 );
    lineGeometry.vertices.push( vertex );

    vertex2 = new THREE.Vector3(-largoDeEjes, 0, 0 );
    lineGeometry.vertices.push( vertex2 );

    line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: 0x660000, opacity: 1 } ) );
    scene.add( line );


    // eje Y
    lineGeometry = new THREE.Geometry();

    vertex = new THREE.Vector3(0, 0, 0 );
    lineGeometry.vertices.push( vertex );

    vertex2 = new THREE.Vector3(0, largoDeEjes, 0 );
    lineGeometry.vertices.push( vertex2 );

    line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: 0x00ff00, opacity: 1 } ) );
    scene.add( line );

    lineGeometry = new THREE.Geometry();

    vertex = new THREE.Vector3(0, 0, 0 );
    lineGeometry.vertices.push( vertex );

    vertex2 = new THREE.Vector3(0, -largoDeEjes, 0 );
    lineGeometry.vertices.push( vertex2 );

    line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: 0x006600, opacity: 1 } ) );
    scene.add( line );


    // eje Z
    lineGeometry = new THREE.Geometry();

    vertex = new THREE.Vector3(0, 0, 0 );
    lineGeometry.vertices.push( vertex );

    vertex2 = new THREE.Vector3(0, 0, largoDeEjes );
    lineGeometry.vertices.push( vertex2 );

    line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: 0x0000ff, opacity: 1 } ) );
    scene.add( line );

    lineGeometry = new THREE.Geometry();

    vertex = new THREE.Vector3(0, 0, 0 );
    lineGeometry.vertices.push( vertex );

    vertex2 = new THREE.Vector3(0, 0, -largoDeEjes );
    lineGeometry.vertices.push( vertex2 );

    line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: 0x000099, opacity: 1 } ) );
    scene.add( line );
}
