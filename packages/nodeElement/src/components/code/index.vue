<template>
    <node-box :node="node">
        <div @dblclick="editNode">code</div>
    </node-box>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import { nodeBox } from "edit";
import EditStore from "edit/src/common/editStore";
import { node } from "edit/src/type";

export default defineComponent({
    name: "code",
    components: {
        nodeBox,
    },
    props: {
        node: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup(props) {
        const store: EditStore = inject<EditStore>("store") as EditStore;
        const editNode = () => {
            store.editNode(props.node as node);
        };
        return { editNode };
    },
});
</script>

<style scoped></style>
