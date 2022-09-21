<template>
    <div class="nodeset">
        <span class="icon iconfont icon-fuzhi1" @click="copyNode"></span>
        <span class="icon iconfont icon-lianxian_icon"></span>
        <span class="icon iconfont icon-shanchu2" @click="deleteNode"></span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import editConfig from "../common/editConfig";
export default defineComponent({
    props:{
        nodeId:{
            type:String,
            default:""
        }
    },
    setup (props) {
        
        const deleteNode = () => {
            editConfig.deleteNode(props.nodeId)
        }
        const copyNode = () => {
            editConfig.copyNode(props.nodeId)
        }
        return {deleteNode,copyNode}
    }
})
</script>

<style scoped>
.nodeset{
    position: absolute;
    bottom: 100%;
    background-color: rgba(0, 0, 0, 0.155);
    border-radius: 5px;
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.icon{
    color:white;
    cursor: pointer;
}
</style>