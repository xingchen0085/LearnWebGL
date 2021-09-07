function Render(docId){
    this.wObjectArray = [];
    var canvas = document.getElementById(docId);
    gl = canvas.getContext("webgl");
    if(!gl){
        console.error("not supported webgl.");
        return false;
    }

    canvas.addEventListener('mousemove', function (ev){
        var x = ev.clientX;//鼠标点击处x
        var y = ev.clientY;//鼠标点击出y
        var rect = ev.target.getBoundingClientRect();

        x = ((x - rect.left) - canvas.height / 2 ) / (canvas.height / 2);
        y = ((canvas.width / 2) - (y - rect.top)) / (canvas.width / 2);
        x = 400 * x + 400;
        y = 400 - 400 * y;
        console.log('you mouse.(' + x + ',' + y + ')');

    });

    this.render = function () {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        this.wObjectArray.forEach(function (wObject) {
            wObject.render();
        });
        return true;
    }

    this.addObject = function (wObject) {
        this.wObjectArray.push(wObject);
    }
}