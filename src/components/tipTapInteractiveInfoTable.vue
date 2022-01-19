<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <div class="grey lighten-2 text-start">
        <v-btn
          fab
          small
          plain
          @click="closeDialog"
        >
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </div>
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
                <div
                  v-for="(img, index) in renderShortKeysImages(item.shortKey)"
                  :key="index"
                >
                  <div style="float: left">
                    <img :src="img">
                  </div>
                  <div
                    v-if="index < renderShortKeysImages(item.shortKey).length - 1"
                    style="float: left; position: relative; top: 7px;"
                  >
                    +
                  </div>
                </div>
              </td>
              <td class="text-center">
                <div
                  v-html="renderItems(item.insert)"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-dialog>
  </div>
</template>

<script>

import katex from 'katex'
import {katexShortkeys} from './formula/KatexShortkeys'

export default {
  name: 'InteractiveInfoTable',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      renderedShortKeys: [],
      shortKeyImages: [],
      keyBoardKeys:{
        space: 'images/keyBoardKeys/space.png',
        ctrl: 'images/keyBoardKeys/ctrl.png',
        alt: 'images/keyBoardKeys/alt.png',
        T: 'images/keyBoardKeys/T.png',
        A: 'images/keyBoardKeys/A.png',
        W: 'images/keyBoardKeys/W.png',
        I: 'images/keyBoardKeys/I.png',
        P: 'images/keyBoardKeys/P.png',
        F: 'images/keyBoardKeys/F.png',
        R: 'images/keyBoardKeys/R.png',
        H: 'images/keyBoardKeys/H.png',
        L: 'images/keyBoardKeys/L.png',
        J: 'images/keyBoardKeys/J.png',
        Q: 'images/keyBoardKeys/Q.png',
        E: 'images/keyBoardKeys/E.png',
        S: 'images/keyBoardKeys/S.png',
        D: 'images/keyBoardKeys/D.png',
        B: 'images/keyBoardKeys/B.png',
        M: 'images/keyBoardKeys/M.png',
        K: 'images/keyBoardKeys/K.png',
        U: 'images/keyBoardKeys/U.png',
        G: 'images/keyBoardKeys/G.png',
        digit0: 'images/keyBoardKeys/0.png',
        digit1: 'images/keyBoardKeys/1.png',
        digit2: 'images/keyBoardKeys/2.png',
        digit3: 'images/keyBoardKeys/3.png',
        digit4: 'images/keyBoardKeys/4.png',
        digit5: 'images/keyBoardKeys/5.png',
        digit6: 'images/keyBoardKeys/6.png',
        digit7: 'images/keyBoardKeys/7.png',
        digit8: 'images/keyBoardKeys/8.png',
        digit9: 'images/keyBoardKeys/9.png',
        Numpad0: 'images/keyBoardKeys/0.png',
        Numpad1: 'images/keyBoardKeys/1.png',
        Numpad2: 'images/keyBoardKeys/2.png',
        Numpad3: 'images/keyBoardKeys/3.png',
        Numpad4: 'images/keyBoardKeys/4.png',
        Numpad5: 'images/keyBoardKeys/5.png',
        Numpad6: 'images/keyBoardKeys/6.png',
        Numpad7: 'images/keyBoardKeys/7.png',
        Numpad8: 'images/keyBoardKeys/8.png',
        Numpad9: 'images/keyBoardKeys/9.png',
      },
    }
  },
  created() {
    this.renderedShortKeys = katexShortkeys
    this.renderShortKeysImages('ctrl+alt+[KeyT]]')
    // console.log(this.shortKeyImages)
  },
  computed: {
    renderItems() {
      return (string) => {
        return katex.renderToString(string)
      }
    },
    renderShortKeysImages() {
      return (string) => {
        const shortKeyImages = []
        if (string.search('ctrl') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.ctrl)
        }
        if (string.search('Space') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.space)
        }
        if (string.search('alt') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.alt)
        }
        if (string.search('KeyT') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.T)
        }
        if (string.search('KeyA') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.A)
        }
        if (string.search('KeyW') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.W)
        }
        if (string.search('KeyI') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.I)
        }
        if (string.search('KeyP') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.P)
        }
        if (string.search('KeyF') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.F)
        }
        if (string.search('KeyR') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.R)
        }
        if (string.search('KeyH') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.H)
        }
        if (string.search('KeyL') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.L)
        }
        if (string.search('KeyJ') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.J)
        }
        if (string.search('KeyQ') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Q)
        }
        if (string.search('KeyE') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.E)
        }
        if (string.search('KeyS') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.S)
        }
        if (string.search('KeyD') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.D)
        }
        if (string.search('KeyB') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.B)
        }
        if (string.search('KeyM') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.M)
        }
        if (string.search('KeyK') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.K)
        }
        if (string.search('KeyU') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.U)
        }
        if (string.search('KeyG') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.G)
        }
        if (string.search('Digit0') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit0)
        }
        if (string.search('Digit1') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit1)
        }
        if (string.search('Digit2') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit2)
        }
        if (string.search('Digit3') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit3)
        }
        if (string.search('Digit4') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit4)
        }
        if (string.search('Digit5') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit5)
        }
        if (string.search('Digit6') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit6)
        }
        if (string.search('Digit7') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit7)
        }
        if (string.search('Digit8') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit8)
        }
        if (string.search('Digit9') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.digit9)
        }
        if (string.search('Numpad0') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad0)
        }
        if (string.search('Numpad1') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad1)
        }
        if (string.search('Numpad2') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad2)
        }
        if (string.search('Numpad3') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad3)
        }
        if (string.search('Numpad4') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad4)
        }
        if (string.search('Numpad5') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad5)
        }
        if (string.search('Numpad6') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad6)
        }
        if (string.search('Numpad7') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad7)
        }
        if (string.search('Numpad8') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad8)
        }
        if (string.search('Numpad9') !== -1) {
          shortKeyImages.push(this.keyBoardKeys.Numpad9)
        }
        return shortKeyImages
      }
    }


  },
  methods: {
    closeDialog () {
      this.$emit('closedialog')
    }
  }
}
</script>

<style scoped>
 .text-center img {
   width: 50px;
 }
 .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td{
   font-size: 1.3em;
 }
</style>
