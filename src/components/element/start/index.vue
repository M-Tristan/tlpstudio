<template>
  <node-box :node="node">
    <div @dblclick="editNode">start</div>
  </node-box>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import editConfig from "../../../common/editConfig";
import { node } from "../../../editType";
import NodeBox from "../../nodeBox.vue";

export default defineComponent({
  name: "start",
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
