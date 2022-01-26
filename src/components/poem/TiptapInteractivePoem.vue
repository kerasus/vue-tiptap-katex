<template>
  <node-view-wrapper class="poem ma-4" data-drag-handle>
    <node-view-content class="content" dir="auto" />
  </node-view-wrapper>
</template>

<script>

import {NodeViewWrapper, NodeViewContent, nodeViewProps} from '@tiptap/vue-2'
export default {
  name: 'TiptapInteractivePoem',
  components: {
    NodeViewWrapper,
    NodeViewContent
  },
  props: {
    nodeViewProps,
    node: {
      type: Object,
      required: true
    },
    updateAttributes: {
      type: Function,
      required: true,
    },
    editor: {
      type: Object
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.poem .content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.poem {
  width: 100%;
}
</style>
