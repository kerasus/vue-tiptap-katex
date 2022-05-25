import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TiptapInteractivePoem from './TiptapInteractivePoem';

export default Node.create({
    name: 'TiptapInteractivePoem',

    group: 'block',

    content: 'block+',

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: element => element.getAttribute('class') === 'beit'
            },
        ]
    },

    renderHTML() {
        return ['div', { class: 'beit' }, 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractivePoem)
    },
})
