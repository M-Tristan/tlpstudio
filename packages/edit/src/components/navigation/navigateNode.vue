<template>
    <div
        class="navigateNode"
        :style="{
            left: node.left + 'px',
            top: node.top + 'px',
            width: node.width + 'px',
            height: node.height + 'px',
        }"
    >
        <!-- 12321 -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        node: {
            type: Object,
            default: () => {},
        },
    },
    setup() {
        return {};
    },
});
</script>

<style lang="less" scoped>
.navigateNode {
    position: absolute;
    background-color: white;
    pointer-events: none;
}
</style>
