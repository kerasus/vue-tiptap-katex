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


describe('Text direction', () => {
    test('Right', () => {
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setTextDirection('rtl').run()
        wrapper.vm.getContent()
        expect(wrapper.vm.test).toBe('<p dir="rtl">This is a test text $2^2$ </p>')
    })
    test('Left', () => {
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setTextDirection('ltr').run()
        wrapper.vm.getContent()
        expect(wrapper.vm.test).toBe('<p dir="ltr">This is a test text $2^2$ </p>')
    })
})


