export default class WebGLUtility {
  private canvas!: HTMLCanvasElement;
  private currentProgram!: WebGLProgram | null;
  public gl!: WebGLRenderingContext;

  set width(width: number) {
    if (this.canvas) {
      this.canvas.width = width;
    }
  }

  get width(): number {
    return this.canvas.width;
  }

  set height(height: number) {
    this.canvas.height = height;
  }

  get height(): number {
    return this.canvas.height;
  }

  set program(program: WebGLProgram | null) {
    this.gl.useProgram(program);
    this.currentProgram = program;
  }

  get program(): WebGLProgram | null {
    return this.currentProgram;
  }

  initialize(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;

    this.gl = this.canvas.getContext('webgl')!;
  }

  createShaderObject(source: string, type: number): WebGLShader | null {
    const gl = this.gl;
    const shader = gl.createShader(type)!; // 空のシェーダオブジェクトを生成

    gl.shaderSource(shader, source); // ソースコード割り当て
    gl.compileShader(shader); // シェーダオブジェクトになった！

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    } else {
      return null;
    }
  }

  createProgramObject(vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
    // フラグメントシェーダと頂点シェーダを紐づけ
    const gl = this.gl;
    const program = gl.createProgram()!;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    gl.deleteShader(vs); // この時点でシェーダは破棄してOK
    gl.deleteShader(fs);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.useProgram(program);
      return program;
    } else {
      return null;
    }
  }

  createVBO(vertexArray: Array<number>): WebGLBuffer | null {
    const gl = this.gl;
    const vbo = gl.createBuffer(); // 空のバッファオブジェクト作成
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo); // バインド（参照を固定 ＝ 今から操作するのはこれですよ〜）以下解除するまでは全部これに対してメソッドが働く
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW); // ここで流し込み
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // バインド外す

    return vbo;
  }

  enableAttribute(vbo: WebGLBuffer, attLocation: number, attStride: number): void {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.enableVertexAttribArray(attLocation);
    gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);
  }
}
