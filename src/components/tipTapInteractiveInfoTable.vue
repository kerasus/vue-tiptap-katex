<template>
  <div
      v-html="getShortKey"
  />
</template>

<script>

import katex from 'katex'
import {tipTapInteractiveObjects} from '../mixins/tipTapInteractiveObjects'

export default {
  name: 'InteractiveInfoTable',
  props: {tipTapInteractiveObjects},
  computed:{
    getShortKey(){
      return katex.renderToString(tipTapInteractiveObjects[0])
    }
  },
  created() {
    console.log(this.getShortKey)
  }
}
</script>

<style scoped>

</style>
