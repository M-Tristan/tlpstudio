<template>
    <div class="page">
        <tlp-header></tlp-header>
        <ModeList></ModeList>
        s
      <!-- <button @click="addNode">添加box</button>
      <button @click="createStart">添加start</button> -->
      <edit
        :nodes="nodeboxList"
        width="1000px"
        height="800px"
        backgroundColor="lightgrey"
      ></edit>
      <setter></setter>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import edit from "../../components/edit.vue";
  import { v4 as uuidv4 } from "uuid";
  import editConfig from "../../common/editConfig";
  import { createStart } from "../../components/element";
  import Setter from "../../components/setter.vue";
  import TlpHeader from "../../components/tlpHeader/index.vue";
import ModeList from "../../components/modeList/index.vue";
  export default defineComponent({
    components: { edit, Setter, TlpHeader, ModeList },
    setup() {
      const nodeboxList = ref([] as Array<any>);
      editConfig.onNodeChange(() => {
        nodeboxList.value = [...editConfig.node];
        console.log(nodeboxList.value);
      });
      const addNode = () => {
        let newBox = {
          id: uuidv4(),
          position: {
            left: 100,
            top: 100,
          },
          size: {
            width: 100,
            height: 100,
          },
        };
        editConfig.addNode(newBox);
        nodeboxList.value = [...editConfig.node];
      };
      return { nodeboxList, addNode, createStart };
    },
  });
  </script>
  
  <style scoped>
.page{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

  </style>
  