<template>
    <div class="modelist">
        <div class="modetag">
            <div
                class="modeitem"
                v-for="(item, index) in modelList"
                :key="index"
            >
                回家模式
            </div>
        </div>
        <div class="functions">
            <i class="icon iconfont icon-jia menu" @click="addModel"></i>
            <i class="icon iconfont icon-shengxu menu"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let modelList = ref([]);
        const addModel = () => {
            modelList.value.push({});
        };
        return { addModel, modelList };
    },
});
</script>
<style lang="less" scoped>
.modelist {
    height: 50px;
    padding-top: 5px;
    background-color: rgb(65, 65, 65);
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    .modetag {
        display: flex;
        float: left;
        position: absolute;
        top: 0;
        left: 0;
        right: 100px;
        bottom: 0;
        overflow-x: scroll;
        .modeitem {
            color: white;
            width: 200px;
            height: 100%;
            margin-right: 10px;
            cursor: pointer;
            // border: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            float: left;
            background-color: rgb(93, 93, 93);
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
    }

    .functions {
        width: 100px;
        float: right;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        .menu {
            color: white;
            font-size: 30px;
            margin-right: 20px;
            cursor: pointer;
        }
    }
}
</style>
