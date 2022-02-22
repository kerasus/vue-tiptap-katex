<template>
  <v-app>
    <vue-tiptap-katex
      ref="tiptap"
      :options="{ poem: true, reading: true, bubbleMenu: false, floatingMenu: false, uploadServer: { url: '/api/v1/question/upload/620e09bd2079aa7c1b00cf8d', headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjJjYThmNTQ5YTRiYThjODBkMjBmYzVhMDNjN2Y3MjJjNzhjY2NiMjI2NTIyNzRmMzQzYWVhYWRlNGRlY2E0ODBiZjk0OWQ5OTRiNGZiNGYiLCJpYXQiOjE2NDI2NzQ1MzYuNzAxNDcyLCJuYmYiOjE2NDI2NzQ1MzYuNzAxNDc1LCJleHAiOjE2NzQyMTA1MzYuNzAwMTg3LCJzdWIiOiIxNjYzMDIiLCJzY29wZXMiOltdfQ.MTKkljpODVJVP7JyhJgC7wK7wObtjK0aEZOYgDHPB5qLDecay-Nc6zQ7If3R8qmjxlRO7qDBtZZZ-z7Y0w0ZKHNpSb64AkSoMKvAFEzvZzb3-rYHR-aNVqI5L3o6LHbi_l5fusd6z90lPjdKh7qLbgkzW4H97iAMcEfJ1MA5aItgeJQvrKZI1ex4R3OoQnvLKIUtfAmCVSyY-hc3_Kh9wDDcWKmWL42CMOAmqxDduPXb09h1v_3JbMzgzR_gQU0omvNmIeEymMONRdYjUUTTNeSCsQ4uUICpXP5Z1KBPhYePbHDGtuIG-ZTK5RVha5PJkPbm6Kegw3uLpUSDgcR-5mLqQRxnrzvyLTv_YWyO4K542uoQNqMCCzJSOA1iMrXlOZSw-VkFsC1WJ-w46a6GuBDa2r3JSaoKhPOAwAw1nH8fdmmF-TfmjuZsogTzvPohIMphkqV4Sp3up7QIq_Die8IoBsag8mMfcl7IcKWLqr0yP3MfSya2Fhy_sMrr7CKAkA0I0oWEIyD0uEckT6nYDS-cJ35wLmX6_MHFG0P_DTtcvnRR2bHKRLBz2GaCfeLCdqGxIi1shytwu2FknChKkbo7QgqxH89Fu1mG2h6qxV5s9yHAGSIk0OWsXOvHFN94SbH0NVu8uFYtyC0O28444bOg9F8ht0B97pJKzMNYUxs' } } }"
    />
<!--    <interactive-info-table></interactive-info-table>-->
    <v-btn @click="getContent">
      Get Content
    </v-btn>
    <hr>
    <div v-html="test" />
    <hr>
    <div
      ref="printdiv"
    >
      {{ test }}
    </div>
  </v-app>
</template>

<script>
import VueTiptapKatex from '@/vue-tiptap-katex';
export default {
  name: 'Test',
  components: {VueTiptapKatex },
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
      test: '$\\begin{array}{cc}f(x) = a(x - 1)(x - 2) \\\\\\Rightarrow f(0) = a( - 1)( - 2) = 4\\\\\\\\\\Rightarrow 2a = 4 \\\\\\Rightarrow a = 2\\\\\\\\f(x) = 2(x - 1)(x - 2) \\\\\\Rightarrow f(3) = 2(2)(1) = 4\\end{array}$'
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

.katex {
  direction: ltr;
}
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
