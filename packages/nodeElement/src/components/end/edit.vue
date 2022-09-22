<template>
  <el-drawer
    title="I am the title"
    :with-header="false"
    v-model="draw"
    @closed="closed"
  >
    <span>Hi there! end</span>
  </el-drawer>
</template>

<script lang="ts">
import EditStore from "edit/src/common/EditStore";
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  name: "endEdit",
  props: {
    node: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    const store:EditStore = inject<EditStore>("store") as EditStore
    const draw = ref(true);
    const closed = () => {
      store.quitEditNode();
    };
    return { draw, closed };
  },
});
</script>

<style scoped></style>
