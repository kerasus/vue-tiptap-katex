<template>
  <div
      v-html="getShortKey"
  />
</template>

<script>

import katex from 'katex'
import {katexShortkeys} from './formula/KatexShortkeys'

export default {
  name: 'InteractiveInfoTable',
  props: {tipTapInteractiveObjects: katexShortkeys},
  computed:{
    getShortKey(){
      return katex.renderToString(katexShortkeys[0])
    }
  },
  created() {
    console.log(this.getShortKey)
  }
}
</script>

<style scoped>

</style>
