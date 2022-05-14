import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import cell from './cell';

export default Node.create({
    name: 'cell',

    group: 'block',

    content: 'inline*',

    addAttributes() {
        return {
            cellWidth: {
                default: '100px',
            },
            cellBg: {
                default: '#fff'
            },
            cellBorderVisibility: {
                default: {
                    top: true,
                    right: true,
                    bottom: true,
                    left: true
                }
            },
            cellBorderColor: {
                default: '#000'
            },
            cellBorderType: {
                default: 'solid'
            },
            cellBorderWidth: {
                default: '1px'
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'table-cell',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['table-cell', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(cell)
    },
})
