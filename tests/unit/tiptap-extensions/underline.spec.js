import { mount } from '@vue/test-utils'
import Test from '@/test'

const wrapper = mount(Test, {
    data () {
        return {
            test: 'This is a test text $2^2$'
        }
    }
})

wrapper.vm.setContent()
wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
wrapper.vm.$refs.tiptap.editor.chain().focus().toggleUnderline().run()
wrapper.vm.getContent()

describe('Underline', () => {
    test('Plain', () => {
        expect(wrapper.vm.test).toBe('<p dir="auto"><u>This is a test text $2^2$ </u></p>')
    })
    test('Rendered', () => {
        expect(wrapper.vm.computedKatex).toBe('<p dir="auto"><u>This is a test text <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">2^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span> </u></p>')
    })
})


