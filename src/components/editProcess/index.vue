<template>
    <el-dialog
        v-model="dialogVisible"
        :title="edit ? '编辑流程' : '创建流程'"
        width="50%"
        @open="open"
    >
        <div>
            <el-row>
                <el-col :span="3">流程名称：</el-col>
                <el-col :span="16">
                    <el-input v-model="baseInfo.name"></el-input>
                </el-col>

                <el-col :span="4">
                    <div class="grid-content ep-bg-purple-light" />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3"
                    >流程描述：
                    <div class="grid-content ep-bg-purple" />
                </el-col>
                <el-col :span="16">
                    <el-input
                        type="textarea"
                        :rows="3"
                        resize="none"
                        v-model="baseInfo.descript"
                    ></el-input>
                </el-col>

                <el-col :span="4">
                    <div class="grid-content ep-bg-purple-light" />
                </el-col>
            </el-row>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="editScene"> 完成 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        sceneBaseInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
        createScene: Function,
        editScene: Function,

        edit: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const dialogVisible = ref(false);
        dialogVisible.value = props.modelValue ? props.modelValue : false;
        const baseInfo = ref({
            name: "",
            descript: "",
        });
        watch(
            () => dialogVisible.value,
            () => {
                emit("update:modelValue", dialogVisible.value);
            }
        );
        watch(
            () => props.modelValue,
            () => {
                dialogVisible.value = props.modelValue
                    ? props.modelValue
                    : false;
            }
        );
        const editScene = () => {
            if (props.edit) {
                props.editScene!(baseInfo.value);
            } else {
                props.createScene!(baseInfo.value);
            }
        };
        const open = () => {
            baseInfo.value.name = props.sceneBaseInfo?.name;
            baseInfo.value.descript = props.sceneBaseInfo?.descript;
        };
        return { dialogVisible, baseInfo, editScene, open };
    },
});
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 10px;
}
</style>
