<template>
    <div class="header">
        <div class="logo">TLP Studio</div>
        <div class="functions">
            <i
                class="icon iconfont icon-7chexiao menu"
                v-if="showHistoryControl"
                @click="back"
                :style="{
                    color: historyInfo.canBack ? 'white' : 'grey',
                    cursor: historyInfo.canBack ? 'pointer' : 'default',
                }"
            ></i>
            <i
                class="icon iconfont icon-fanchexiao menu"
                v-if="showHistoryControl"
                @click="redo"
                :style="{
                    color: historyInfo.canRedo ? 'white' : 'grey',
                    cursor: historyInfo.canRedo ? 'pointer' : 'default',
                }"
            ></i>
            <div class="model">Template</div>
            <el-button type="primary" v-if="showDeploy">Publish </el-button>
            <i class="icon iconfont icon-jia menu iconadd" @click="addScene"></i>
            <el-popover placement="bottom" :width="200" trigger="click">
                <template #reference>
                    <i class="icon iconfont icon-caidan menu"></i>
                </template>
                <div>
                    <div class="menu-item">Import</div>
                    <div class="menu-item">Export</div>
                    <div class="menu-item" @click="showProcessManagement">
                        Manage projects
                    </div>
                    <div class="menu-item">Manage Global Variables</div>
                    <div class="menu-item">Settings</div>
                </div>
            </el-popover>
        </div>
        <el-dialog v-model="dialogVisible" title="Manage projects" width="50%">
            <process-management :scenes="scenes"></process-management>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeUnmount, reactive, ref } from "vue";
import processManagement from "../processManagement/index.vue";
export default defineComponent({
    props: {
        showDeploy: {
            type: Boolean,
            default: false,
        },
        showHistoryControl: {
            type: Boolean,
            default: false,
        },
        scenes: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        processManagement,
    },
    setup(props, { emit }) {
        const storeUtil = inject<any>("storeUtil");

        const historyInfo = reactive({
            canBack: false,
            canRedo: false,
        });
        const dialogVisible = ref(false);
        const showProcessManagement = () => {
            dialogVisible.value = true;
        };
        const resetHistoryInfo = () => {
            historyInfo.canBack = storeUtil.canBack;
            historyInfo.canRedo = storeUtil.canRedo;
        };
        storeUtil.event.on("resetHistoryInfo", resetHistoryInfo);
        const getinfo = () => {
            storeUtil.getJson();
        };
        const addScene = () => {
            emit("addScene");
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
            storeUtil.event.off("resetHistoryInfo", resetHistoryInfo);
        });
        return {
            getinfo,
            historyInfo,
            back,
            redo,
            addScene,
            showProcessManagement,
            dialogVisible,
        };
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
            font-size: 24px;
            margin-left: 20px;
            margin-right: 20px;
            // width: 20px;
            // height: 20px;

            cursor: pointer;
            &:hover{
                background-color: #4a4d52;
                border-radius: 2px;
            }
        }
        .iconadd{
            width: 34px;
            height: 34px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .model {
            color: white;
            margin-right: 20px;
        }
    }
}

.menu-item {
    line-height: 30px;
    cursor: pointer;
    font-weight: 800;

    &:hover {
        background-color: rgba(221, 221, 221, 0.416);
        color: black;
    }
}
</style>
