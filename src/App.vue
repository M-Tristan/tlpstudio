<template>
    <home></home>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "./page/home/index.vue";

export default defineComponent({
    setup() {
        return {};
    },
    components: { Home },
});
</script>

<style scoped></style>
