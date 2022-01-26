import {Extension} from '@tiptap/core';
import mixinConvertToTiptap from '../../mixins/convertToTiptap';

const Shortkeys = Extension.create({
    addKeyboardShortcuts() {
        return {
            // Paste Shortkey
            'Mod-v': () => navigator.clipboard.readText()
                .then(text => {
                    let string = mixinConvertToTiptap.methods.convertToTiptap(text)
                    this.editor.commands.insertContent(string)
                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                }),

            'Mod-e': () => {
                this.editor.chain().focus().insertContent('<tiptap-interactive-poem><mesra></mesra><mesra></mesra></tiptap-interactive-poem>').run()
            },

            // Insert TiptapInteractiveKatex
            'Mod-Alt-q': () => {
                const SPACE = ' '
                this.editor.chain().focus().insertContent(`<tiptap-interactive-katex-inline editMode="true" katex="${SPACE}"></tiptap-interactive-katex-inline>${SPACE}`).run()
            },

        }
    }
})

export default Shortkeys