// clase botonRectangular

// este boton solo funciona en el dashsuperior debido a los márgenes para que se pueda usar en todos los browsers
function ClaseBotonRect (mX, mY, mAncho, mAlto, eR, nombre){
    var miX = mX;
    var miY = mY;
    var miAncho = mAncho;
    var miAlto = mAlto;
    var estadoReaspuesta = eR;

    this.encima = function (mousePos) {
        return (( mousePos.x-10>miX   &&   mousePos.x-10<miX+miAncho   &&   mousePos.y-5>miY   &&   mousePos.y-5<miY+miAlto ) );
    };  // -10 y -5 son los márgenes de este dash superior


    this.checkMe = function(mousePos) {
        if (this.encima(mousePos)) escena = estadoReaspuesta;
    };


    //drawing particle
    this.render = function (ctx, mousePos) {

        if(this.encima(mousePos)){
            ctx.lineWidth = 1.0;
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.strokeStyle = "rgba(80, 255, 80, 1.0)";
            ctx.beginPath();
            ctx.rect(miX, miY, miAncho, miAlto);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            ctx.lineWidth = 0.5;
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.strokeStyle = "rgba(80, 255, 80, 0.95)";
            // Draw an circle in location and size
            ctx.beginPath();
            ctx.rect(miX, miY, miAncho, miAlto);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.fillStyle = "#bbbbbb";
        ctx.font = "normal 13px Roboto-Medium";
        ctx.fillText(nombre, miX+5, miY+12);
    }; // end function render()


} // fin de la ClaseBotonRect




