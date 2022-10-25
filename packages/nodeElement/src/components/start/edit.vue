<template>
    <el-drawer
        title="I am the title"
        :with-header="false"
        v-model="draw"
        @closed="closed"
    >
        <span>Hi there!</span>
        <input v-model="node.param.name" @change="changeNode" />
    </el-drawer>
</template>

<script lang="ts">
import EditStore from "edit/src/common/editStore";
import { node } from "edit/src/type";
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
    name: "startEdit",
    props: {
        node: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup(props) {
        const draw = ref(true);
        const store: EditStore = inject<EditStore>("store") as EditStore;
        const closed = () => {
            store.quitEditNode();
        };
        const changeNode = () => {
            store.setNode(props.node as node);
        };
        return { draw, closed, changeNode };
    },
});
</script>

<style scoped></style>
