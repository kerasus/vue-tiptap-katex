import { mount } from '@vue/test-utils'
import Test from '@/test'

const wrapper = mount(Test, {
    data () {
        return {
            test: 'This i­s a test¬text $2^2$'
        }
    }
})

wrapper.vm.setContent()
wrapper.vm.getContent()

describe('Thin space', () => {
    test('Replace on input', () => {
        expect(wrapper.vm.test).toBe('<p dir="auto">This i s a test text $2^2$ </p>')
    })
})


