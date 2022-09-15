<template>
  <el-drawer
    title="I am the title"
    :with-header="false"
    v-model="draw"
    @closed="closed"
  >
    <span>Hi there!</span>
    <input v-model="node.param.name" @change="changeNode"/>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import editConfig from "../../../common/editConfig";
import { node } from "../../../editType";

export default defineComponent({
  name: "startEdit",
  props: {
    node: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const draw = ref(true);
    const closed = () => {
      editConfig.quitEditNode();
    };
    const changeNode = () => {
      editConfig.setNode(props.node as node)
    }
    return { draw, closed, changeNode};
  },
});
</script>

<style scoped></style>
