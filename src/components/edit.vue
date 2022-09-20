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
    <!-- {{ lines }} -->
    <eline v-for="line in lines" :key="line.id" :line="line"></eline>

    <!-- <node-box
      v-for="(node, index) in nodes"
      :key="index"
      :node="node"
      :width="node.size.width"
      :height="node.size.height"
    ></node-box> -->
    <component :is="node.name ? node.name : 'nodebox'" v-for="(node, index) in nodes" :key="index" :node="node"
      :width="node.size.width" :height="node.size.height"></component>
      <add-line v-if="showEditLine" :line="newLine"></add-line>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from "vue";
import Eline from "./eline.vue";
import eventEmit from "../common/eventBus";
import NodeBox from "./nodeBox.vue";
import { node, position } from "../editType";
import editConfig from "../common/editConfig";
import _ from "lodash";
import AddLine from "./addLine.vue";
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
    },
    nodes: {
      type: Array,
      default: () => {
        return [] as Array<node>;
      },
    },
  },
  setup() {
    const backImageInfo = ref({
      backgroundSize: 20,
      backgroundPosition: { left: 0, top: 0 },
      backgroundImage:
        "radial-gradient(circle at 10px 10px, rgb(218, 224, 228) 1px, transparent 0px)",
    });
    const lines = ref([] as any);
    const newLine = ref({} as any);
    const showEditLine = ref(false);

    eventEmit.on("editline", function (start: position, end: position) {
      showEditLine.value = true;
      newLine.value = {
        startPosition: start,
        endPosition: end,
      };
    });
    eventEmit.on("finisheditline", function () {
      showEditLine.value = false;
    });
    editConfig.onLineChange(function () {
      // console.log(editConfig.lines)
      lines.value = editConfig.lines;
    });

    onBeforeUnmount(() => {
      eventEmit.off("editline");
      eventEmit.off("finisheditline");
      editConfig.removeLineChange();
    });

    return {
      backImageInfo,
      showEditLine,
      lines,
      newLine,
    };
  },
  components: { NodeBox, Eline, AddLine },
});
</script>

<style scoped>
.edit {
  position: relative;
  overflow: hidden;
}
</style>
