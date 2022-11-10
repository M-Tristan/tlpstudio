<template>
    <div>
        <tlp-over-lay></tlp-over-lay>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TlpOverLay from "../../components/overlay";
export default defineComponent({
    components: {
        TlpOverLay,
    },
    setup() {
        return {};
    },
});
</script>

<style scoped></style>
