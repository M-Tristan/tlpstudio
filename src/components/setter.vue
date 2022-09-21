<template>
  <component :is="editName" :node="node" @changeNode="changeNode"></component>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import editConfig from  "@common/EditStore";
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
    const changeNode = (node:node) => {
      editConfig.setNode(node)
    }
    return { editName, node ,changeNode};
  },
});
</script>

<style scoped></style>
