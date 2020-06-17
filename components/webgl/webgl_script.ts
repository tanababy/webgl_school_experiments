import WebGLUtility from './webgl_api';

export default class WebGLMainScript {
  private position: Array<number> = [];
  private color: Array<number> = [];
  private vbo: Array<WebGLBuffer | null> = [];
  private webgl: WebGLUtility = new WebGLUtility();

  constructor(
    private canvas: HTMLCanvasElement,
    private vertexShaderSource: string,
    private fragmentShaderSource: string,
  ) {
    this.canvas = canvas;
    this.vertexShaderSource = vertexShaderSource;
    this.fragmentShaderSource = fragmentShaderSource;

    this.setCanvas();
    this.setCanvasSize();
    this.setupGeometry();
    this.setShader();
    this.setupLocation();
    this.setupRendering();
  }

  setCanvas(): void {
    this.webgl.initialize(this.canvas);
  }

  setCanvasSize(): void {
    const size = Math.min(window.innerWidth, window.innerHeight);
    this.webgl.width = size;
    this.webgl.height = size;
  }

  setShader(): void {
    const vs = this.webgl.createShaderObject(this.vertexShaderSource, this.webgl.gl.VERTEX_SHADER);
    const fs = this.webgl.createShaderObject(this.fragmentShaderSource, this.webgl.gl.FRAGMENT_SHADER);

    if (vs && fs) {
      this.webgl.program = this.webgl.createProgramObject(vs, fs);
    }
  }

  setupGeometry(): void {
    // 頂点属性のセットアップ
    this.position = [
      0.0,
      0.5,
      0.0,
      -0.7,
      0.0,
      0.0,
      -0.5,
      -0.5,
      0.0,
      0.0,
      0.5,
      0.0,
      -0.5,
      -0.5,
      0.0,
      0.5,
      -0.5,
      0.0,
      0.0,
      0.5,
      0.0,
      0.7,
      0.0,
      0.0,
      0.5,
      -0.5,
      0.0,
    ];
    this.color = [
      1.0,
      0.0,
      0.0,
      1.0, // １こめ
      0.0,
      0.0,
      1.0,
      1.0, // ２こめ
      0.0,
      1.0,
      0.0,
      1.0, // ３こめ
      1.0,
      0.0,
      0.0,
      1.0, // ４こめ
      0.0,
      1.0,
      0.0,
      1.0, // ５こめ
      0.0,
      0.0,
      1.0,
      1.0, // 6こめ
      1.0,
      0.0,
      0.0,
      1.0, // ７こめ
      0.0,
      1.0,
      0.5,
      1.0, // 8こめ
      0.0,
      0.0,
      1.0,
      1.0, // ９こめ
    ];

    this.vbo = [this.webgl.createVBO(this.position), this.webgl.createVBO(this.color)]; // バッファに入れる
  }

  setupLocation(): void {
    // ロケーション = CPU側とGPU側を関連付け ポインタ的な

    const gl = this.webgl.gl;

    // プログラムオブジェクトからシェーダ内部の変数を調べる
    const aPosition = gl.getAttribLocation(this.webgl.program!, 'position');
    this.webgl.enableAttribute(this.vbo[0]!, aPosition, 3); // 第三引数は一頂点あたりの個数

    const aColor = gl.getAttribLocation(this.webgl.program!, 'color');
    this.webgl.enableAttribute(this.vbo[1]!, aColor, 4);
  }

  setupRendering(): void {
    const gl = this.webgl.gl;
    gl.viewport(0, 0, this.webgl.width, this.webgl.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  render(): void {
    const gl = this.webgl.gl;
    // 三角形ポリゴンで、頂点の個数三個
    gl.drawArrays(gl.TRIANGLES, 0, 9); // 第三引数は、頂点シェーダーを呼ぶ回数と考える？
  }
}
