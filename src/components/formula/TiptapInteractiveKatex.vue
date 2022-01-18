<template>
  <node-view-wrapper
    :class="{ 'vue-component': true, 'inline': node.attrs.inline }"
    data-drag-handle
  >
    <div
      v-if="editMode"
      id="mathfield"
      ref="mathfield"
      dir="ltr"
      locale="fa"
      :class="{ 'editable': editMode }"
    >
    </div>
    <div
      v-if="!editMode"
      class="converted"
      dir="ltr"
      @click="editMode = true"
      v-html="computedKatex"
    />
    <div
      v-if="!editMode"
      icon
      color="blue"
      @click="editMode = true"
    >
      mdi-pencil
    </div>
    <div
      v-if="editMode"
      icon
      color="green"
      @click="toggleEdit"
    >
      mdi-check
    </div>
  </node-view-wrapper>
</template>

<script>

import 'katex/dist/katex.min.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import '@mdi/font/css/materialdesignicons.css'
import {EXTRA_KEYBOARD, EXTRA_KEYBOARD_LAYER} from './ExtraKeyboard'
import {katexShortkeys} from './KatexShortkeys'
import {NodeViewWrapper, nodeViewProps} from '@tiptap/vue-3'


// ------------------- Mathlive ---------------------

// import 'mathlive/dist/mathlive-fonts.css'
// import 'mathlive/dist/mathlive-static.css'
// import { MathfieldElement } from 'mathlive';


import { MathfieldElement } from '../../Mathlive'
import '../../Mathlive/mathlive-fonts.css'
import '../../Mathlive/mathlive-static.css'

// --------------------------------------------------
// Vue.use(VueKatex, {
//   globalOptions: {
//     delimiters: [
//       {left: '$$', right: '$$', display: true},
//       {left: '\\[', right: '\\]', display: true},
//       {left: '$', right: '$', display: false},
//       {left: '\\(', right: '\\)', display: false}
//     ]
//   }
// });

export default {
  components: {
    NodeViewWrapper,
  },
  props: {
    nodeViewProps,
    node: {
      type: Object,
      required: true
    },
    updateAttributes: {
      type: Function,
      required: true,
    },
    editor: {
      type: Object,
      default: () => {return {}}
    }
  },
  data: () => {
    return {
      editModal: false,
      latexData: null,
      formula: '',
      editMode: false,
      questMarkdownText: '# Math Rulez! \n  $x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$',
      katex: '$x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$',
      icons: {},
      mf: null
    }
  },
  watch: {
    editMode(newValue) {
      if (!newValue) {
        return
      }
      this.$nextTick(() => {
        this.loadMathLive()
      });
    },
    latexData: function (newValue) {
      this.updateAttributes({
        // katex: this.latexData
        katex: newValue
      })
      this.katex = newValue
    },
  },
  computed: {
    keyboardList() {
      let options = 'numeric custom-functions symbols roman  greek matrix-keyboard others-keyboard extra-keyboard'
      if (this.editor.editorOptions.persianKeyboard) {
        options += ' persian-keyboard'
      }
      return options
    },
    computedKatex() {
      return katex.renderToString(this.node.attrs.katex, {
        throwOnError: false,
        safe: true,
        trust: true
      })
    }
  },
  created() {
    this.katex = this.node.attrs.katex
    this.editMode = this.node.attrs.editMode
    this.overrideKeyboardEvent()
  },
  mounted () {
    if (this.node.attrs.editMode) {
      setTimeout(() => {
        this.mf.executeCommand('toggleVirtualKeyboard')
        this.mf.executeCommand('toggleVirtualKeyboard')
      }, 100)
    }
  },
  methods: {
    // setDirMath () {
    //   //.setAttribute('dir', 'auto')
    //   document.querySelectorAll('span').forEach(item => {
    //
    //   })
    // },
    // setDir (input) {
    //   input.querySelectorAll('.boxpad').forEach(item => {
    //     item.setAttribute('dir', 'auto')
    //   })
    //   return input
    // },
    overrideKeyboardEvent () {
      window.document.onkeydown = overrideKeyboardEvent;
      window.document.onkeyup = overrideKeyboardEvent;
      const keyIsDown = {};

      function overrideKeyboardEvent(e) {
        if (e.keyCode !== 17) {
          return
        }
        switch(e.type){
          case 'keydown':
            if(!keyIsDown[e.keyCode]){
              keyIsDown[e.keyCode] = true;
              // do key down stuff here
            }
            break;
          case 'keyup':
            delete(keyIsDown[e.keyCode]);
            // do key up stuff here
            break;
        }
        disabledEventPropagation(e);
        e.preventDefault();
        return false;
      }
      function disabledEventPropagation(e) {
        if(e){
          if(e.stopPropagation){
            e.stopPropagation();
          } else if(window.event){
            window.event.cancelBubble = true;
          }
        }
      }
    },
    toggleEdit () {
      this.editMode = !this.editMode
      this.editor.chain().focus().run()
    },
    getMathliveValue (mf) {
      return mf.getValue().replaceAll('\\mleft', '\\left').replaceAll('\\mright', '\\right')
    },
    loadMathLive() {
      // this.katex = this.markdown.render(this.katex)
      let that = this
      const mf = new MathfieldElement(
          {
            virtualKeyboardMode: 'manual',
            onContentDidChange: (mf) => {
              that.latexData = that.getMathliveValue(mf)
            },
          });
      mf.setOptions({
        'customVirtualKeyboardLayers': EXTRA_KEYBOARD_LAYER,
        'customVirtualKeyboards': EXTRA_KEYBOARD,
        'virtualKeyboards': this.keyboardList,
        onKeystroke: (mathfield, keystroke /* , ev */) => {
          // console.log('ev', ev)
          // console.log('mathfield', mathfield)
          if (keystroke === 'ctrl+[Enter]') {
            this.mf.executeCommand('toggleVirtualKeyboard')
            this.editMode = false
            console.log(this.editor.state)
            this.editor.chain().focus('end').run()
            return false
          }
          for (let i = 0; i < katexShortkeys.length; i++) {
            if (keystroke === katexShortkeys[i].shortKey && katexShortkeys[i].class === 'math') {
              mf.insert(katexShortkeys[i].insert)
              return false
            }
          }
          if (this.editor.editorOptions.persianKeyboard) {
            for (let i = 0; i < katexShortkeys.length; i++) {
              if (keystroke === katexShortkeys[i].shortKey && katexShortkeys[i].class === 'persian') {
                mf.insert(katexShortkeys[i].insert)
                return false
              }
            }
          }
          // Keystroke not handled, return true for default handling to proceed.
          return true;
        },
        mathModeSpace: '\\:',
        inlineShortcuts: {
          'lim': { mode: 'math', value: '\\lim\\limits_{x \\to \\infty}' },
        }
      });

      mf.value = this.katex
      this.mf = mf

      this.$refs.mathfield.appendChild(mf)

      // MathLive > 0.60
      // this.$refs.mathfield.setOptions({
      //   virtualKeyboardMode: 'manual',
      //   'customVirtualKeyboardLayers': EXTRA_KEYBOARD_LAYER,
      //   'customVirtualKeyboards': EXTRA_KEYBOARD,
      //   'virtualKeyboards': 'numeric functions symbols roman  greek matrix-keyboard others-keyboard extra-keyboard',
      //   mathModeSpace: '\\:'
      // });

      // console.log(mf.getOption())
      // mf.$setConfig(
      //     //{ macros: { ...mf.getConfig('macros'), smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}', }, }
      // );
      that.latexData = that.getMathliveValue(mf)
    }
  }
}
</script>

<style lang="scss" scoped>

.katex {
  direction: ltr;
  display: inline-block;

  .colorbox {
    background-color: transparent !important;
  }

  .katex-html {
    .accent {
      background-color: transparent !important;
      border-color: transparent !important;
    }
    .overline {
      font-size: inherit !important;
      font-weight: inherit !important;
      letter-spacing: inherit !important;
      line-height: inherit !important;
      text-transform: inherit !important;
      font-family: inherit !important;
    }
  }
}

.ML__fieldcontainer {
  .ML__fieldcontainer__field {
    .accent {
      background-color: transparent !important;
      border-color: transparent !important;
    }
    .overline {
      font-size: inherit !important;
      font-weight: inherit !important;
      letter-spacing: inherit !important;
      line-height: inherit !important;
      text-transform: inherit !important;
      font-family: inherit !important;
    }
  }
}

.vue-component {
  /*background: #FAF594;*/
  /*border: 1px solid #0D0D0D;*/
  border-radius: 0.5rem;
  margin: 1rem 0;
  position: relative;
  white-space: normal;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}

.vue-component.inline {
  display: inline-flex;
}

.label {
  margin-left: 1rem;
  background-color: #0D0D0D;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
}

.content {
  margin-top: 1.5rem;
  padding: 1rem;
}

/*#mathfield, .latexData {*/
/*    padding: 8px;*/
/*    font-size: 20px;*/
/*}*/

#mathfield {
  width: 95%;
}

#mathfield, .latexData {
  font-size: 32px;
  margin: 0;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, .3);
  box-shadow: 0 0 8px rgba(0, 0, 0, .2)
}
</style>

<style>
.ML__mathlive .ML__base span span span span span span span svg {
  width: 300em !important;
  height: 0.5em !important;
}

.converted p {
  margin-bottom: 0 !important;
}

.ML__keyboard div .rows > ul > .w30 {
  width: 200px;
}

.ML__keyboard div .rows > ul > .h80 {
  height: 80px;
}

.ML__keyboard div .rows > ul > .h100 {
  height: 100px;
}

.ML__keyboard div .rows>ul>li aside {
  color: #fff !important;
}

@media only screen and (min-width: 1025px) {
  .ML__keyboard div .rows>ul {
    height: fit-content !important;
  }
}
</style>
