<template>
  <component :is="editName" :node="node"></component>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import editConfig from "../common/editConfig";
import { node } from "../editType";

export default defineComponent({
  setup() {
    const editName = ref("");
    const node = ref(null as any | null);
    editConfig.onEditNode((item: node) => {
      node.value = item;
      editName.value = item.editName;
    });
    editConfig.onQuitEitNode(() => {
      node.value = null;
      editName.value = "";
    });
    return { editName, node };
  },
});
</script>

<style scoped></style>
