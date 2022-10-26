<template>
    <div class="modelist">
        <div class="modetag">
            <div :class="['modeitem', { active: item.id == selectID }]" v-for="(item, index) in scenes" :key="index"
                @click="selectScene(item)">
                {{ item.name }}
                <i v-if="item.id == selectID" class="icon iconfont icon-guanbi close"
                    @click.stop="removeScene(item)"></i>
            </div>
        </div>
        <div class="functions">
            <el-popover placement="bottom" :width="250" trigger="click" @before-enter="showPopover"
                @before-leave="showModetaglist = false">
                <template #reference>
                    <i :class="[
                        'icon',
                        'iconfont',
                        'icon-jiangxu',
                        { menu: !showModetaglist },
                        { activemenu: showModetaglist },
                    ]"></i>
                </template>
                <div class="modetaglist">
                    <div>
                        <input v-model="searchContent" placeholder="搜索流程" class='search-input'/>
                    </div>
                    <div class="tips">打开的流程</div>
                    <div  v-for="(item, index) in scenes" :key="index">
                    <el-row v-if="item.name.includes(searchContent)">
                       
                        <el-col :span="22">
                            <div class="modename" @click="selectScene(item)">
                                {{ item.name }}
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <i class="icon iconfont icon-guanbi close" @click="removeScene(item)"></i>
                        </el-col>
                    </el-row>
                </div>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        scenes: {
            type: Array,
            default: () => [],
        },
        selectID: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        let modelList = ref([]);
        const showModetaglist = ref(false);
        const searchContent = ref("")
        const selectScene = (item: any) => {
            emit("selectScene", item);
        };
        const removeScene = (item: any) => {
            emit("removeScene", item);
        };
        const showPopover = () => {
            showModetaglist.value = true
            searchContent.value = ''
        }
       

        return { modelList, selectScene, showModetaglist, removeScene,searchContent,showPopover };
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
        padding-left: 5px;

        .modeitem {
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; // 默认不换行；
            cursor: pointer;
            color: white;
            width: 200px;
            height: 100%;
            line-height: 50px;
            margin-right: 10px;
            cursor: pointer;
            float: left;
            background-color: rgb(93, 93, 93);
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            position: relative;
            padding-right: 20px;
            box-sizing: border-box;

            .close {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                position: absolute;
                right: 2px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                border-radius: 50%;

                &:hover {
                    background-color: rgb(212, 212, 212);
                }
            }
        }

        .active {
            background-color: rgb(145, 145, 145);
            font-weight: 900;
        }
    }

    .functions {
        float: right;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;

        .menu {
            position: relative;
            cursor: pointer;
            color: white;
            font-size: 30px;
            margin-right: 20px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            display: flex;
            align-items: center;
            border-radius: 50%;

            &:hover {
                background-color: rgb(101, 101, 101);
            }
        }

        .activemenu {
            position: relative;
            cursor: pointer;
            color: white;
            font-size: 30px;
            margin-right: 20px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            display: flex;
            align-items: center;
            border-radius: 50%;
            background-color: rgb(119, 119, 119);
        }
    }
}

.modetaglist {
    width: 100%;
    background-color: white;
    z-index: 9999;
.search-input{
    width: 100%;
    border: none;
    height: 30px;
    outline:0;
    margin-bottom: 10px;
}
    .tips {
        font-weight: 900;
    }

    .close {
        line-height: 30px;
        display: flex;
        align-content: center;
        cursor: pointer;
    }

    .modename {
        cursor: pointer;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; // 默认不换行；
        line-height: 30px;
    }
}

.el-row {
    &:hover {
        background-color: rgb(241, 241, 241);
    }
}
</style>
