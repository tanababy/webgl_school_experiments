export const vert = `
  attribute vec3 position;
  attribute vec4 color;
  // varying はフラグメントシェーダとの橋渡しをする変数を意味する修飾子 @@@
  varying vec4 vColor;

  void main(){
      // フラグメントシェーダに送る色の情報を varying 変数に代入 @@@
      vColor = color;
      // gl_Position は頂点がどのように描かれるかを決める座標の出力（vec4）
      gl_Position = vec4(position, 1.0);
  }
`;
