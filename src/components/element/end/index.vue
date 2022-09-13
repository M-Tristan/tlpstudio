<template>
  <node-box>
    <div>end</div>
  </node-box>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NodeBox from "../../nodeBox.vue";

export default defineComponent({
  name: "end",
  components: {
    NodeBox,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
