<template>
  <v-app>
    <vue-tiptap-katex
      ref="tiptap"
      :options="{ poem: true, reading: true, bubbleMenu: false, floatingMenu: false }"
    />
    <v-btn @click="getContent">
      Get Content
    </v-btn>
    <hr>
    <div v-html="test" />
    <hr>
    <div
      ref="printdiv"
      v-katex:auto
      v-html="test"
    />
  </v-app>
</template>

<script>
import VueTiptapKatex from '@/vue-tiptap-katex';
export default {
  name: 'Test',
  components: {VueTiptapKatex},
  methods: {
    prepareForKatex () {
      let regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gms;
      this.test = this.test.replace(regex, (match) => {
        return ' ' + match + ' '
      })
    },
    getContent () {
      this.test = this.$refs.tiptap.getContent()
      this.prepareForKatex()
    }
  },
  data () {
    return {
      test: '<p dir="auto">دو بار الکتریکی${q_1}$و${q_2} =  - 16\\,\\mu C$به ترتیب در مختصات$A\\, \\left|\\begin{array}{l}0 \\\\ 3\\, cm\\end{array}\\right.$$B\\, \\left|\\begin{array}{l}0 \\\\ 6\\, cm\\end{array}\\right.$واقع شده‌اند.${q_1}$چند میکروکولن باشد تا اگر بار${q_3}$را در مبدأ مختصات قرار دهیم، برایند نیروهای وارد بر آن صفر باشد؟</p>'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.tiptap.setContent(this.test)
    })
  }
}
</script>

<style>
  .beit {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
  .beit .mesra {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
    white-space: nowrap;
  }

  @media only screen and (max-width: 500px) {
    .beit {
      flex-direction: column;
    }
    .beit .mesra {
      white-space: normal;
      flex-basis: auto;
    }
  }
</style>
