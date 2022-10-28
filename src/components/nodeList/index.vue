<template>
    <div class="nodelist">
        <el-tree
            :data="nodes"
            @node-click="createElement"
            icon="ArrowRightBold"
        >
            <template #default="{ node }">
                <div class="tree-node">
                    <span>{{ node.label }}</span>
                </div>
            </template>
        </el-tree>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
interface Tree {
    value: string;
    label: string;
    children?: Tree[];
}
export default defineComponent({
    props: {
        createElement: Function,
    },
    setup() {
        const nodes = [
            {
                value: "",
                label: "IOT",
                children: [
                    {
                        value: "start",
                        label: "start",
                    },
                    {
                        value: "end",
                        label: "end",
                    },
                    {
                        value: "twoSocketTest",
                        label: "twoSocketTest",
                    },
                    {
                        value: "twoPlugTest",
                        label: "twoPlugTest",
                    },
                    {
                        value: "code",
                        label: "code",
                    },
                    {
                        value: "ifnode",
                        label: "ifnode",
                    },
                ],
            },
            {
                value: "",
                label: "core nodes",
                children: [],
            },
        ];

        return { nodes };
    },
});
</script>

<style lang="less" scoped>
.nodelist {
    float: left;
    width: 250px;
    height: 100%;
    background-color: #545c64;
    overflow-y: scroll;
}
.el-tree {
    background: rgba(0, 0, 0, 0);
    color: white;
    * {
        background: rgba(0, 0, 0, 0) !important ;
    }
    :deep(.el-tree-node__content) {
        height: 50px;
    }
}
</style>
