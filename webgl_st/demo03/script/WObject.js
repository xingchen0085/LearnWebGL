/**
 * {
       position: positions,
       normal: normals,
       texcoord: texCoords,
       indices: indices,
    }
 * @param gl
 * @param shader
 * @param attriArrays
 * @constructor
 */
var WObject = function(gl, shader, attriArrays) {
    this.id = Date.now();
    this.gl = gl;
    this.program = shader.getProgram(gl);
    this.bufferInfo = webglUtils.createBufferInfoFromArrays(gl, attriArrays);
    this.attributeSetters = webglUtils.createAttributeSetters(gl, this.program);
    this.uniformSetters = webglUtils.createUniformSetters(gl, this.program);
    this.modelMatrix = m4.identity();
    //left, right, bottom, top, near, far, dst
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    //var pMatrix = m4.orthographic(-gl.canvas.clientWidth, gl.canvas.clientWidth, -gl.canvas.clientHeight , gl.canvas.clientHeight , 0, 100);
    var near = -800;
    var far = 800;
    var pMatrix = m4.orthographic(-gl.canvas.clientWidth, gl.canvas.clientWidth, -gl.canvas.clientHeight, gl.canvas.clientHeight, near, far);//p
    //var pMatrix = m4.identity();
    var cameraPos = [0, 0, 100];
    var cameraTarget = [0, 0, 0];
    var cameraUp = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPos, cameraTarget, cameraUp);
    var vMatrix = m4.inverse(cameraMatrix);
    //var vMatrix = m4.identity();
    var pvMatrix = m4.multiply(pMatrix, vMatrix);
    var mvpMatrix = m4.multiply(pvMatrix, this.modelMatrix);

    this.uniformValues = {
        u_mvpMatrix : mvpMatrix
    };

    this.render = function (){
        this.gl.useProgram(this.program);
        webglUtils.setAttributes(this.attributeSetters, this.bufferInfo.attribs);
        webglUtils.setUniforms(this.uniformSetters, this.uniformValues)

        var numElements = this.bufferInfo.numElements;
        if(attriArrays.indices){
            console.log("drawElements count:" + numElements);
            gl.drawElements(gl.POINTS, numElements, gl.UNSIGNED_BYTE, 0);
        }else{
            console.log("drawArrays count:" + numElements);
            gl.drawArrays(gl.TRIANGLES, 0, numElements);
        }
    }
};



var WCubeObject = function (gl, shader, opt) {
    var _opt = {
        size : 100
    }
    opt = opt || _opt;
    WCubeObject.prototype = new WObject(gl, shader, primitives.createCubeVertices(opt.size));

    this.render = function (){
        WCubeObject.prototype.render();
    }
}

/**
 * width, depth, subdivisionsWidth, subdivisionsDepth,
 * matrix
 * @param gl
 * @param shader
 * @param opt
 * @constructor
 */
var WPlaneObject = function (gl, shader, opt) {
    var _opt = {
        width : 10,
        depth: 10
    }
    opt = opt || _opt;
    WPlaneObject.prototype = new WObject(gl, shader, primitives.createPlaneVertices(opt.width, opt.depth));

    this.render = function (){
        WPlaneObject.prototype.render();
    }
}










