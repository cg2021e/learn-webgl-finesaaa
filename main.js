function main(){
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("webgl");

    var vertexShaderCode = `
    void main(){
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
    }
    `;

    var vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertexShaderCode);
    context.compileShader(vertexShader);

    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `;

    var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, fragmentShaderCode);
    context.compileShader(fragmentShader);

    var shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    context.useProgram(shaderProgram);

    context.clearColor(1.0, 1.0, 0.0, 1.0);
    context.clear(context.COLOR_BUFFER_BIT);

    context.drawArrays(context.POINTS, 0, 1);
}
