<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-center">
                Short Key
              </th>
              <th class="text-center">
                Result
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item, index) in renderedShortKeys"
                :key="index"
            >
              <td class="text-center">
                <div v-html="item.shortKey" />
              </td>
              <td class="text-center">
                <div v-html="item.insert" />
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import katex from 'katex'
import {katexShortkeys} from './formula/KatexShortkeys'

export default {
  name: 'InteractiveInfoTable',
  computed: {},
  data() {
    return {
      renderedShortKeys: [],
      flag: false,
      str: 'alt+[Digit3]'
    }
  },
  created() {
    this.renderInserts()
    this.renderShortKeys()
    this.flag = true
  },
  methods: {
    renderInserts() {
      this.renderedShortKeys = katexShortkeys
      this.renderedShortKeys.forEach(shortKeyObject => {
        shortKeyObject.insert = katex.renderToString(shortKeyObject.insert)
      })
      return this.renderedShortKeys
    },
    renderShortKeys() {
      this.renderedShortKeys = katexShortkeys
      this.renderedShortKeys.forEach(shortKeyObject => {
        shortKeyObject.shortKey = shortKeyObject.shortKey.replace(/Digit/g, '')
      })

      return this.renderedShortKeys
    }
  }
}
</script>

<style scoped>

</style>
