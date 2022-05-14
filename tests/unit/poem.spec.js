import { mount } from '@vue/test-utils'
import Test from '@/test'
import {DOMParser} from 'prosemirror-model';

const wrapper = mount(Test, {
  data () {
    return {
      test: 'This is a test text'
    }
  }
})

function elementFromString(value) {
  const element = document.createElement('div')
  element.innerHTML = value.trim()

  return element
}
function insertPoem({ state, view }, value) {
  const element = elementFromString(value)
  const slice = DOMParser.fromSchema(state.schema).parseSlice(element)

  const { tr } = state;
  let trx = tr;

  // trx = trx.insertText('',state.doc.content.size,state.doc.content.size + 1)

  trx = trx.insert(state.doc.content.size, slice.content)
  view.dispatch(trx)
}

wrapper.vm.setContent()
insertPoem(wrapper.vm.$refs.tiptap.editor, '<tiptap-interactive-poem><mesra>تست ۱</mesra><mesra>تست ۲</mesra></tiptap-interactive-poem>')
wrapper.vm.getContent()

describe('Poem', () => {
  test('Init poem', () => {
    expect(wrapper.vm.html).toBe('<p dir="auto">This is a test text</p><tiptap-interactive-poem><mesra>تست ۱</mesra><mesra>تست ۲</mesra></tiptap-interactive-poem>')
  })
  test('HTML poem', () => {
    expect(wrapper.vm.test).toBe('<p dir="auto">This is a test text</p><div><div class="beit"><div class="mesra">تست ۱</div><div class="mesra">تست ۲</div></div></div>')
  })
})


