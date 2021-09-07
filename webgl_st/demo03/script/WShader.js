var WShader = function(opt_vertexShaderScriptId, opt_fragmentShaderScriptId) {
    this.vertexShaderScriptId = opt_vertexShaderScriptId || "vertex-shader-sc";
    this.fragmentShaderScriptId = opt_fragmentShaderScriptId || "fragment-shader-sc";
};

WShader.prototype.getProgram = function (gl) {
    return webglUtils.createProgramFromScripts(gl, [this.vertexShaderScriptId, this.fragmentShaderScriptId]);
}