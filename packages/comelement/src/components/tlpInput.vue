<template>
    <el-input></el-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../style/base.css";
import "../style/el-input.css";
import { ElInput } from "element-plus";
export default defineComponent({
    components: {
        ElInput,
    },
    setup() {
        return {};
    },
});
</script>

<style scoped></style>
