<template>
    <div class="container">
        <div>
            <el-row v-for="(item, index) in scenes" :key="index">
                <el-col :span="20" class="desc">
                    <div>{{ item.name }}</div>
                    <div>{{ item.descript }}</div>
                </el-col>
                <el-col :span="2" class="center">
                    <el-icon @click="editScene(item)"><EditPen /></el-icon>
                </el-col>

                <el-col :span="2" class="center">
                    <el-icon @click="removeScene(item)"
                        ><DeleteFilled
                    /></el-icon>
                </el-col>
            </el-row>
        </div>
        <edit-process
            v-model="editsceneVisible"
            :sceneBaseInfo="sceneBaseInfo"
            :editScene="modifyScene"
            edit
        ></edit-process>
    </div>
</template>

<script lang="ts">
import Scene from "edit/src/common/scene";
import { defineComponent, inject, PropType, ref } from "vue";
import editProcess from "../editProcess/index.vue";
export default defineComponent({
    props: {
        scenes: {
            type: Array as PropType<Array<Scene>>,
            default: () => [],
        },
    },
    components: {
        editProcess,
    },
    setup() {
        const storeUtil = inject<any>("storeUtil");
        const editsceneVisible = ref(false);
        const sceneBaseInfo = ref({} as Scene);
        const removeScene = (scene: Scene) => {
            storeUtil.removeScene(scene);
        };
        const editScene = (scene: Scene) => {
            sceneBaseInfo.value = scene;
            editsceneVisible.value = true;
        };
        const modifyScene = (info: any) => {
            sceneBaseInfo.value.name = info.name;
            sceneBaseInfo.value.descript = info.descript;
            editsceneVisible.value = false;
        };
        return {
            removeScene,
            editsceneVisible,
            sceneBaseInfo,
            editScene,
            modifyScene,
        };
    },
});
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.133);
}
.container {
    max-height: 500px;
    overflow-y: scroll;
}
.desc {
    text-align: left;
}
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    .el-icon {
        cursor: pointer;
    }
}
</style>
