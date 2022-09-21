<template>
    <component :is="editName" :node="node" @changeNode="changeNode"></component>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref,inject } from "vue";
import EditStore from "../../common/EditStore";
  import { node } from "../../type/index";
  
  export default defineComponent({
    setup() {
      const store:EditStore = inject<EditStore>("store") as EditStore
      const editName = ref("");
      const node = ref(null as any | null);
      store.onEditNode((item: node) => {
        node.value = item;
        editName.value = item.editName;
      });
      store.onQuitEitNode(() => {
        node.value = null;
        editName.value = "";
      });
      const changeNode = (node:node) => {
        store.setNode(node)
      }
      return { editName, node ,changeNode};
    },
  });
  </script>
  
  <style scoped></style>
  