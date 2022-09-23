<template>
    <div class="nodeset">
        <span class="icon iconfont icon-fuzhi1" @click="copyNode"></span>
        <span class="icon iconfont icon-lianxian_icon"></span>
        <span class="icon iconfont icon-shanchu2" @click="deleteNode"></span>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import EditStore from "../../common/EditStore";
export default defineComponent({
    props: {
        nodeId: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const store: EditStore = inject<EditStore>("store") as EditStore;

        const deleteNode = () => {
            store.deleteNode(props.nodeId);
        };
        const copyNode = () => {
            store.copyNode(props.nodeId);
        };
        return { deleteNode, copyNode };
    },
});
</script>
<style lang="less" scoped>
.nodeset {
    position: absolute;
    bottom: 100%;
    background-color: rgba(0, 0, 0, 0.155);
    border-radius: 5px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .icon {
        color: white;
        cursor: pointer;
    }
}
</style>
