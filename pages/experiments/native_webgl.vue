<template lang="pug">
  .container
    canvas(ref="canvas")
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'nuxt-property-decorator';
import { frag } from './shader/frag';
import { vert } from './shader/vert';
import WebGLMainScript from '@/components/webgl/webgl_script';

@Component({
  components: {},
})
export default class WebglComponent extends Vue {
  // private get count(): number {
  //   return counterModule.count;
  // }
  @Ref('canvas') readonly canvas!: HTMLCanvasElement;
  private webgl: any = null;

  mounted(): void {
    this.webgl = new WebGLMainScript(this.canvas, vert, frag);
    this.webgl.render();
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
