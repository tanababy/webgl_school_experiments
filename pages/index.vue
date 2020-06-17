<template lang="pug">
  .container
    div
      logo
      h1.title webgl-training
      //- h2.subtitle vuex count is {{ count }}
      .links
        a(href="https://nuxtjs.org/" target="_blank" class="button--green") Documentation
        a(href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey") GitHub
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { counterModule } from '@/store/index';
import Logo from '~/components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class IndexComponent extends Vue {
  private get count(): number {
    return counterModule.count;
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

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
