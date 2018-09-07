

function creeEjeEnLugar (alfaDegrees, betaDegrees, nombre, index) {
    var puntoAbajo = definaPosicionEnTierraDe (alfaDegrees, betaDegrees);
    var puntoAlto =  definaPosicionEnLaOrbitaDe (alfaDegrees, betaDegrees, alturaDeOrbita);

    // creando una pequeña esfera al final del eje
    var sphereGeometry = new THREE.SphereGeometry(0.3, 10, 10);
    //var sphereMaterial = new THREE.MeshNormalMaterial();
    var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x888888});
    var cabezaDePin = new THREE.Mesh(sphereGeometry, sphereMaterial);
    cabezaDePin.position.x = puntoAlto.x;
    cabezaDePin.position.y = puntoAlto.y;
    cabezaDePin.position.z = puntoAlto.z;
    cabezaDePin.matrixAutoUpdate = true;
    cabezaDePin.updateMatrixWorld();
    scene.add(cabezaDePin);

    var axeGeometry = new THREE.Geometry();
    axeGeometry.vertices.push(puntoAbajo);
    axeGeometry.vertices.push(puntoAlto);

    var pointMaterial = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 1 } );
    pointMaterial.transparent = true;

    var axe = new THREE.Line(axeGeometry, new THREE.LineBasicMaterial({color: 0xAAAAAA, opacity: 1, transparent: true}));
    ejesDeEtiquetas[index] = axe;
    axe.matrixAutoUpdate = true;
    axe.updateMatrixWorld();
    scene.add(axe);
}


function hagaEtiqueta (lon, lat, nombre) {
    var div = document.getElementById(nombre);
    if (!div) {
        var geometry = new THREE.CylinderGeometry(0, 0, 0, 0, 0); // (0, 10, 30, 4, 1);
        var material = new THREE.MeshBasicMaterial({color: 0xffffff});

        var alfaLocal = map(lon, -180, 180, Math.PI, -Math.PI);
        var betaLocal = map(lat, -90, 90, -Math.PI / 2, Math.PI / 2);

        rMenor = rMayor * Math.cos(betaLocal);
        var punto0x = rMenor * Math.cos(alfaLocal);
        var punto0y = rMayor * Math.sin(betaLocal);
        var punto0z = rMenor * Math.sin(alfaLocal);


        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = punto0x * largoDeEjesDeEtiquetas;
        mesh.position.y = punto0y * largoDeEjesDeEtiquetas;
        mesh.position.z = punto0z * largoDeEjesDeEtiquetas;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        //scene.add(mesh);

        var text = createTextLabel(nombre);
        text.setHTML(nombre); // el nombre
        text.setParent(mesh);
        textlabels.push(text);
        container.appendChild(text.element);
    }
}

function hagaEtiquetaSatelite (lon, lat, nombre, ID) {
    var div = document.getElementById(ID);
    if (!div) {
        var geometry = new THREE.CylinderGeometry(0, 0, 0, 0, 0); // (0, 10, 30, 4, 1);
        var material = new THREE.MeshBasicMaterial({color: 0xffff00});

        var alfaLocal = map(lon, -180, 180, Math.PI, -Math.PI);
        var betaLocal = map(lat, -90, 90, -Math.PI / 2, Math.PI / 2);

        rMenor = rMayor * Math.cos(betaLocal);
        var punto0x = rMenor * Math.cos(alfaLocal);
        var punto0y = rMayor * Math.sin(betaLocal);
        var punto0z = rMenor * Math.sin(alfaLocal);


        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = punto0x * largoDeEjesDeEtiquetas;
        mesh.position.y = punto0y * largoDeEjesDeEtiquetas;
        mesh.position.z = punto0z * largoDeEjesDeEtiquetas;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        //scene.add(mesh);

        var text = createTextLabelParaSatelite(nombre, ID);
        text.setHTML(nombre); // el nombre
        text.setParent(mesh);
        textlabels.push(text);
        container.appendChild(text.element);
    }
}


function destruyaEtiqueta (id){
    var div = document.getElementById(id);
    if (div) {
        div.parentNode.removeChild(div);
    }
}

/*

function get2DCoords (position, camera) {
    var vector = position.project(camera);
    vector.x = (vector.x + 1)/2 * window.innerWidth;
    vector.y = -(vector.y - 1)/2 * window.innerHeight;
    return vector;
}
*/


function  createTextLabel(nombre) {
    var div = document.createElement('div');
    div.setAttribute('id', nombre);
    div.className = 'text-label';
    div.style.position = 'absolute';
    div.style.width = 100; // 100
    div.style.height = 100;
    div.innerHTML = nombre;
    div.style.top = -10000;
    div.style.left = -10000;
    div.opacity= 0.1;
    //div.style.size = 200;

    var _this = this;

    return {
        element: div,
        parent: false,
        position: new THREE.Vector3(0,0,0),
        setHTML: function(html) {
            this.element.innerHTML = html;
        },
        setParent: function(threejsobj) {
            this.parent = threejsobj;
        },
        updatePosition: function() {
            if(parent) {
                this.position.copy(this.parent.position);
            }

            var coords2d = this.get2DCoords(this.position, _this.camera);
            this.element.style.left = coords2d.x + 'px';
            this.element.style.top = coords2d.y + 'px';
        },
        get2DCoords: function(position, camera) {
            var vector = position.project(camera);
            vector.x = (vector.x + 1)/2 * myWidth;
            vector.y = -(vector.y - 1)/2 * myHeight;
            return vector;
        }
    };
}

function  createTextLabelParaSatelite(nombre, ID) {
    var div = document.createElement('div');
    div.setAttribute('id', ID);
    div.className = 'text-labelSat';
    div.style.position = 'absolute';  // font-family: 'Roboto-Medium';  src: url("Roboto-Medium.ttf");
    div.style.width = 100; // 100
    div.style.height = 100;
    div.innerHTML = nombre;
    div.style.top = -10000;
    div.style.left = -10000;
    div.style.fontFamily = 'Roboto-Medium';
    div.opacity= 0.1;
    //div.style.size = 200;

    var _this = this;

    return {
        element: div,
        parent: false,
        position: new THREE.Vector3(0,0,0),
        setHTML: function(html) {
            this.element.innerHTML = html;
        },
        setParent: function(threejsobj) {
            this.parent = threejsobj;
        },
        updatePosition: function() {
            if(parent) {
                this.position.copy(this.parent.position);
            }

            var coords2d = this.get2DCoords(this.position, _this.camera);
            this.element.style.left = coords2d.x + 'px';
            this.element.style.top = coords2d.y + 'px';
        },
        get2DCoords: function(position, camera) {
            var vector = position.project(camera);
            vector.x = (vector.x + 1)/2 * myWidth;
            vector.y = -(vector.y - 1)/2 * myHeight;
            return vector;
        }
    };
}

