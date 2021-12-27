<template>
  <div>
    <div v-if="flag">
      <div v-for="(item, index) in renderedShortkeys" :key="index" v-html="item.insert" />
    </div>
  </div>
</template>

<script>

import katex from 'katex'
import {katexShortkeys} from './formula/KatexShortkeys'

export default {
  name: 'InteractiveInfoTable',
  computed: {
  },
  data () {
    return {
      renderedShortkeys: [],
      flag: false
    }
  },
  created() {
    this.renderedShortkeys = katexShortkeys
    this.renderedShortkeys.forEach(shortkeyObject => {
      shortkeyObject.insert = katex.renderToString(shortkeyObject.insert)
    })
    this.flag = true
  }
}
</script>

<style scoped>

</style>
