<template>
    <div class="header">
        <div class="logo">TLP Studio</div>
        <div class="functions">
            <i
                class="icon iconfont icon-7chexiao menu"
                @click="back"
                :style="{
                    color: historyInfo.canBack ? 'white' : 'grey',
                    cursor: historyInfo.canBack ? 'pointer' : 'default',
                }"
            ></i>
            <i
                class="icon iconfont icon-fanchexiao menu"
                @click="redo"
                :style="{
                    color: historyInfo.canRedo ? 'white' : 'grey',
                    cursor: historyInfo.canRedo ? 'pointer' : 'default',
                }"
            ></i>
            <div class="model">模版</div>
            <el-button type="primary">部署 </el-button>

            <el-button type="primary" @click="getinfo">数据导出 </el-button>
            <i class="icon iconfont icon-caidan menu"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeUnmount, reactive } from "vue";

export default defineComponent({
    setup() {
        const storeUtil = inject<any>("storeUtil");
        const historyInfo = reactive({
            canBack: false,
            canRedo: false,
        });
        const resetHistoryInfo = () => {
            historyInfo.canBack = storeUtil.canBack;
            historyInfo.canRedo = storeUtil.canRedo;
        };
        storeUtil.event.on("onPushHistory", resetHistoryInfo);
        const getinfo = () => {
            storeUtil.getJson();
        };
        const back = () => {
            if (historyInfo.canBack) {
                storeUtil.back();
                resetHistoryInfo();
            }
        };
        const redo = () => {
            if (historyInfo.canRedo) {
                storeUtil.redo();
                resetHistoryInfo();
            }
        };
        onBeforeUnmount(() => {
            storeUtil.event.off("onPushHistory", resetHistoryInfo);
        });
        return { getinfo, historyInfo, back, redo };
    },
});
</script>
<style lang="less" scoped>
.header {
    width: 100%;
    height: 80px;
    background-color: rgb(51, 51, 51);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        height: 100%;
        color: white;
        font-size: 30px;
        font-weight: 900;
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .functions {
        display: flex;
        align-items: center;

        .menu {
            color: white;
            font-size: 30px;
            margin-left: 20px;
            margin-right: 20px;
        }

        .model {
            color: white;
            margin-right: 20px;
        }
    }
}
</style>
