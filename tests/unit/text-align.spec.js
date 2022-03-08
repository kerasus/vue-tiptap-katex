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


describe('Text align', () => {
    test('Right', () => {
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setTextAlign('right').run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setImageAlign('right').run()
        wrapper.vm.getContent()
        expect(wrapper.vm.test).toBe('<p dir="auto" style="text-align: right">This is a test text $2^2$ </p>')
    })
    test('Left', () => {
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setTextAlign('left').run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setImageAlign('left').run()
        wrapper.vm.getContent()
        expect(wrapper.vm.test).toBe('<p dir="auto" style="text-align: left">This is a test text $2^2$ </p>')
    })
    test('Center', () => {
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setTextAlign('center').run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setImageAlign('center').run()
        wrapper.vm.getContent()
        expect(wrapper.vm.test).toBe('<p dir="auto" style="text-align: center">This is a test text $2^2$ </p>')
    })
    test('Left', () => {
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setTextAlign('justify').run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().selectAll().run()
        wrapper.vm.$refs.tiptap.editor.chain().focus().setImageAlign('justify').run()
        wrapper.vm.getContent()
        expect(wrapper.vm.test).toBe('<p dir="auto" style="text-align: justify">This is a test text $2^2$ </p>')
    })
})


