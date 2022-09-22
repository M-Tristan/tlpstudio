<template>
    <div class="edit" :style="{
      width: width,
      height: height,
      backgroundColor: backgroundColor,
      backgroundSize:
        backImageInfo.backgroundSize +
        'px ' +
        backImageInfo.backgroundSize +
        'px',
      backgroundPositionX: backImageInfo.backgroundPosition.left + 'px',
      backgroundPositionY: backImageInfo.backgroundPosition.top + 'px',
      backgroundImage: backImageInfo.backgroundImage,
    }">
    
      <eline v-for="line in lines" :key="line.id" :line="line"></eline>
      <component :is="node.name ? node.name : 'nodebox'" v-for="(node) in nodes" :key="node.id" :node="node"
        :width="node.size.width" :height="node.size.height"></component>
        <add-line v-if="showEditLine" :line="newLine"></add-line>
      <setter></setter>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onBeforeUnmount, ref ,provide} from "vue";
  import Eline from "./components/eline/index.vue";
  import NodeBox from "./components/nodeBox/index.vue"
  import { node, position } from "./type";
  import EditStore from  "./common/EditStore";
  import _ from "lodash";
  import AddLine from "./components/addLine/index.vue";
import Setter from "./components/setter/index.vue";
  export default defineComponent({
    props: {
      width: {
        type: String || Number,
        default: 0,
      },
      height: {
        type: String || Number,
        default: 0,
      },
      backgroundColor: {
        type: String,
        default: "white",
      }
    },
    setup(props,{emit}) {
      const store = new EditStore()
      const nodes = ref([] as Array<node>)
      emit("getCtx",store)
      const backImageInfo = ref({
        backgroundSize: 20,
        backgroundPosition: { left: 0, top: 0 },
        backgroundImage:
          "radial-gradient(circle at 10px 10px, rgb(218, 224, 228) 1px, transparent 0px)",
      });
      const lines = ref([] as any);
      const newLine = ref({} as any);
      const showEditLine = ref(false);
      provide("store",store)
      store.onNodeChange(() => {
            nodes.value =  [...store.node]
        });
      store.event.on("editline", function (start: position, end: position) {
        showEditLine.value = true;
        newLine.value = {
          startPosition: start,
          endPosition: end,
        };
      });
      store.event.on("finisheditline", function () {
        showEditLine.value = false;
      });
      store.onLineChange(function () {
        lines.value = store.lines;
      });
  
      onBeforeUnmount(() => {
        store.event.off("editline");
        store.event.off("finisheditline");
        store.removeLineChange();
      });
  
      return {
        backImageInfo,
        showEditLine,
        lines,
        newLine,nodes
      };
    },
    components: { NodeBox, Eline, AddLine, Setter },
  });
  </script>
  
  <style scoped>
  .edit {
    position: relative;
    overflow: hidden;
  }
  </style>
  