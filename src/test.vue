<template>
  <div id="app">
    <vue-tiptap-katex
      ref="tiptap"
      v-model="test"
      :options="{ poem: true, reading: true, bubbleMenu: false, floatingMenu: false, persianKeyboard: true, uploadServer: { instantUpload: false, url: '/api/v1/question/upload/620e09bd2079aa7c1b00cf8d', headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYjJjYThmNTQ5YTRiYThjODBkMjBmYzVhMDNjN2Y3MjJjNzhjY2NiMjI2NTIyNzRmMzQzYWVhYWRlNGRlY2E0ODBiZjk0OWQ5OTRiNGZiNGYiLCJpYXQiOjE2NDI2NzQ1MzYuNzAxNDcyLCJuYmYiOjE2NDI2NzQ1MzYuNzAxNDc1LCJleHAiOjE2NzQyMTA1MzYuNzAwMTg3LCJzdWIiOiIxNjYzMDIiLCJzY29wZXMiOltdfQ.MTKkljpODVJVP7JyhJgC7wK7wObtjK0aEZOYgDHPB5qLDecay-Nc6zQ7If3R8qmjxlRO7qDBtZZZ-z7Y0w0ZKHNpSb64AkSoMKvAFEzvZzb3-rYHR-aNVqI5L3o6LHbi_l5fusd6z90lPjdKh7qLbgkzW4H97iAMcEfJ1MA5aItgeJQvrKZI1ex4R3OoQnvLKIUtfAmCVSyY-hc3_Kh9wDDcWKmWL42CMOAmqxDduPXb09h1v_3JbMzgzR_gQU0omvNmIeEymMONRdYjUUTTNeSCsQ4uUICpXP5Z1KBPhYePbHDGtuIG-ZTK5RVha5PJkPbm6Kegw3uLpUSDgcR-5mLqQRxnrzvyLTv_YWyO4K542uoQNqMCCzJSOA1iMrXlOZSw-VkFsC1WJ-w46a6GuBDa2r3JSaoKhPOAwAw1nH8fdmmF-TfmjuZsogTzvPohIMphkqV4Sp3up7QIq_Die8IoBsag8mMfcl7IcKWLqr0yP3MfSya2Fhy_sMrr7CKAkA0I0oWEIyD0uEckT6nYDS-cJ35wLmX6_MHFG0P_DTtcvnRR2bHKRLBz2GaCfeLCdqGxIi1shytwu2FknChKkbo7QgqxH89Fu1mG2h6qxV5s9yHAGSIk0OWsXOvHFN94SbH0NVu8uFYtyC0O28444bOg9F8ht0B97pJKzMNYUxs' } } }"
    />
    <hr>
    <div>
      {{ computedKatex }}
    </div>
    <hr>
    <div
      ref="printdiv"
    >
      {{ test }}
    </div>
    <div v-html="computedKatex" />
  </div>
</template>

<script>
import katex from 'katex'
import 'katex/dist/katex.min.css'
import VueTiptapKatex from '@/vue-tiptap-katex';
export default {
  name: 'Test',
  components: { VueTiptapKatex },
  methods: {
    prepareForKatex () {
      let regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gms;
      this.test = this.test.replace(regex, (match) => {
        console.log('match', match)
        return ' ' + match + ' '
      })
    },
    onResizeEnd (url, width, height) {
      return url.split('?w=')[0] + '?w=' + width + '&h=' + height
    },
    computedHTML () {
      this.html = this.$refs.tiptap.editor.getHTML()
    },
  },
  data () {
    return {
      test: '<p dir="[object Object]">مجموعۀ$\\{ i\\,,\\,j\\,,\\,f\\,,\\,b\\,,\\,e\\,,\\,g\\,,\\,d\\}$چند زیرمجموعۀ احاطه‌گر مینیمال برای گراف مقابل دارد؟</p><p dir="[object Object]" style="text-align: left"><span style="display: inline-block; width: 149px; height: 109px; position: relative; margin: -264px 10px 264px;"><img src="https://nodes.alaatv.com/aaa/questionPhotos/Picture3-2632256.png" style="position: relative; top: 264px;" width="149" height="109"></span></p>',
      html: '',
    }
  },
  computed: {
    computedKatex () {
      let localInput = this.test
      let regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])/gms;
      localInput = localInput.replace(regex, (match) => {
        return ' ' + match + ' '
      })
      localInput = localInput.replaceAll('\\[ ', '\\[')
      localInput = localInput.replaceAll(' \\]', ' \\]')
      localInput = localInput.replaceAll(' $', '$')
      localInput = localInput.replaceAll('$ ', '$')
      localInput = localInput.replace(regex, (match) => {
        let finalMatch
        if (match.includes('$$')) {
          finalMatch = match.slice(2, -2)
        } else if (match.includes('$')) {
          finalMatch = match.slice(1, -1)
        } else {
          finalMatch = match.slice(2, -2)
        }
        finalMatch = finalMatch.replaceAll(/&lt;/g, '<').replaceAll(/&gt;/g, '>').replaceAll('&amp;', '&');
        return katex.renderToString(finalMatch, {
          throwOnError: false,
          safe: true,
          trust: true
        })
      })
      return localInput
    }
  }
}
</script>

<style>

.tiptap-click-btn{
//width: 130px;
  height: 20px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
//display: inline-block;
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
  7px 7px 20px 0px rgba(0,0,0,.1),
  4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  width: 97.5%;
  text-align: center;
}


.btn-16 {
  border: none;
  color: #000;
}
.btn-16:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  direction: rtl;
  z-index: -1;
  box-shadow:
      -7px -7px 20px 0px #fff9,
      -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}
.btn-16:hover {
  color: #000;
}
.btn-16:hover:after {
  left: auto;
  right: 0;
  width: 100%;
}
.btn-16:active {
  top: 2px;
}

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
