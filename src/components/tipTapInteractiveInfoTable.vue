<template>
  <tiptapInteractiveInfoTable :dialog="dialog" @closedialog="closeDialog" />
</template>

<script>
import tiptapInteractiveInfoTable from 'vue-tiptap-katex-core/components/tipTapInteractiveInfoTable'

export default {
  name: 'InteractiveInfoTable',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  components: {tiptapInteractiveInfoTable},
  methods: {
    closeDialog () {
      this.$emit('closedialog')
    }
  }
}
</script>


