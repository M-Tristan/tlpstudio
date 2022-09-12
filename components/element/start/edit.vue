<template>
  <el-drawer
    title="I am the title"
    :with-header="false"
    v-model="draw"
    @closed="closed"
  >
    <span>Hi there!</span>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import editConfig from "../../../common/editConfig";

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
  setup() {
    const draw = ref(true);
    const closed = () => {
      editConfig.quitEditNode();
    };
    return { draw, closed };
  },
});
</script>

<style scoped></style>
