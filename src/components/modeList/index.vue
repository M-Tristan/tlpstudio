<template>
    <div class="modelist">
        <div class="modeitem">回家模式</div>
        <div class="modeitem">离家模式</div>
        <div class="functions">
            <i class="icon iconfont icon-jia menu"></i>
            <i class="icon iconfont icon-shengxu menu"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {};
    },
});
</script>

<style scoped>
.modelist {
    height: 50px;
    padding-top: 5px;
    background-color: rgb(65, 65, 65);
    box-sizing: border-box;
    overflow: hidden;
}

.modeitem {
    color: white;
    width: 200px;
    height: 100%;
    margin-right: 10px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
}

.functions {
    height: 100%;
    float: right;
    display: flex;
    align-items: center;
}

.menu {
    color: white;
    font-size: 30px;
    margin-right: 20px;
}
</style>
