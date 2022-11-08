<template>
    <div>
        <tlpInput></tlpInput>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tlpInput from "../components/tlpInput.vue";
export default defineComponent({
    components: {
        tlpInput,
    },
    setup() {
        return {};
    },
});
</script>

<style scoped></style>
