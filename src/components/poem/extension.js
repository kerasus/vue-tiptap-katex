import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TiptapInteractivePoem from './TiptapInteractivePoem';

export default Node.create({
    name: 'TiptapInteractivePoem',

    group: 'block',

    content: 'block+',

    parseHTML() {
        return [
            {
                tag: 'tiptap-interactive-poem',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['tiptap-interactive-poem', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(TiptapInteractivePoem)
    },
})
