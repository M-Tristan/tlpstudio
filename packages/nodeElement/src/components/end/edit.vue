<template>
    <!-- <el-drawer
        title="I am the title"
        :with-header="false"
        v-model="draw"
        @closed="closed"
    >
        <span>Hi there! end</span>
      
    </el-drawer> -->
    <TlpOverlay @click="closed">
        <div class="container">sads</div>
    </TlpOverlay>
</template>

<script lang="ts">
import EditStore from "edit/src/common/editStore";
import { defineComponent, inject, ref } from "vue";
import { TlpOverlay } from "@tlp/comelement";
export default defineComponent({
    components: {
        TlpOverlay,
    },
    name: "endEdit",
    props: {
        node: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup() {
        const store: EditStore = inject<EditStore>("store") as EditStore;
        const draw = ref(true);
        const closed = () => {
            store.quitEditNode();
        };

        return { draw, closed };
    },
});
</script>

<style lang="less" scoped>
.container {
    position: absolute;
    color: white;
    width: 30%;
    height: 80%;
    top: 10%;
    left: 35%;
    background-color: rgb(57, 56, 71);
}
</style>
