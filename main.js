function main() {
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  // Define vertcies data
  /*
   * A (-0.5, -0.5)
   * B (0.5, -0.5)
   * C (0.0, 0.5)
   * D (-0.5, 0.5)
   */

  var vertices = [
    -0.5, -0.5, 0.0, 1.0, 0.0,     // Point A
    0.5, -0.5, 0.0, 0.0, 1.0,     // Point B
    0.5,  0.5, 1.0, 0.0, 0.0,     // Point C
    0.5,  0.5, 1.0, 0.0, 0.0,     // Point C
    -0.5,  0.5, 1.0, 0.0, 0.0,     // Point D
    -0.5, -0.5, 0.0, 1.0, 0.0      // Point A
];


  // Create a lnekkd-list for storing the vertices data
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // var vertexShaderCode = document.getElementById("vertexShaderCode").text;
  var vertexShaderCode = `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    varying vec3 vColor;
    uniform vec2 uChange;
    void main() { 
      gl_PointSize = 10.0; 
      gl_Position = vec4(aPosition + uChange, 0.0, 1.0); // Center of the coordnate
        vColor = aColor;
    }
    `;

  var fragmentShaderCode = `
    precision mediump float;
    varying vec3 vColor;
    void main(){
        gl_FragColor = vec4(vColor, 1.0);
    }
    `;

  // Create .c in GPU
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);

  // Compile .c into .o
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  // Prepare a .exe shell (shader program)
  var shaderProgram = gl.createProgram();

  // Put the two .o files into the shell
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  // Link the two .o files, so together they can be a runnable program/context.
  gl.linkProgram(shaderProgram);

  // Start using the context (analogy: start using the paints and the brushes)
  gl.useProgram(shaderProgram);

  // Teach the computer how to collect
  //  the positional values from ARRAY_BUFFER
  //  to each vertex being processed
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
  gl.enableVertexAttribArray(aPosition);

  var aColor = gl.getAttribLocation(shaderProgram, "aColor");
  gl.vertexAttribPointer(
    aColor,
    3,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(aColor);

  var uChange = gl.getUniformLocation(shaderProgram, "uChange");
  var changeX = 0;
  var changeY = 0;

  function render() {
    changeX  = changeX + 0.001;
    changeY  = changeY + 0.003;
    gl.uniform2f(uChange, changeX, changeY);
    // Change screen to dark grey
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    // Tell that we've three vertices
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  setInterval(render, 1000/30);
}

window.onload = main;