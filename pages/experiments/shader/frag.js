export const frag = `
  precision mediump float;
  // データ型が変数名が頂点シェーダと一致する必要がある点に注意！ @@@
  varying vec4 vColor;

  void main(){
      // gl_FragColor が、最終的に画面に出力される色（vec4）
      gl_FragColor = vColor;
  }
`;
