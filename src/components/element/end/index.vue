<template>
  <node-box :node="node">
    <div @dblclick="editNode">end</div>
  </node-box>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import editConfig from  "@common/EditStore";
import { node } from "../../../editType";
import NodeBox from "../../nodeBox.vue";

export default defineComponent({
  name: "end",
  components: {
    NodeBox,
  },
  props: {
    node: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    console.log();
    const editNode = () => {
      editConfig.editNode(props.node as node);
    };
    return { editNode };
  },
});
</script>

<style scoped></style>
