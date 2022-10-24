<template>
    <div class="page">
        <tlp-header></tlp-header>
        <ModeList></ModeList>
        <div class="content">
            <div class="nodelist">
                <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="el-menu-vertical-demo"
                    default-active="1"
                    text-color="#fff"
                    style="border: 0px"
                >
                    <el-sub-menu index="1">
                        <template #title>
                            <span>IOT</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item
                                index="1-1"
                                @click="createElement('start')"
                                >start</el-menu-item
                            >
                            <el-menu-item
                                index="1-2"
                                @click="createElement('end')"
                                >end</el-menu-item
                            >
                            <el-menu-item
                                index="1-2"
                                @click="createElement('code')"
                                >code</el-menu-item
                            >
                            <el-menu-item
                                index="1-2"
                                @click="createElement('ifnode')"
                                >ifnode</el-menu-item
                            >
                            
                            <el-menu-item
                                index="1-2"
                                @click="createElement('twoSocketTest')"
                                >twoSocketTest
                            </el-menu-item>
                            <el-menu-item
                                index="1-2"
                                @click="createElement('twoPlugTest')"
                                >twoPlugTest</el-menu-item
                            >
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div class="editarea">
                <edit
                    @getCtx="getCtx"
                    width="100%"
                    height="100%"
                    backgroundColor="#a9a9a9"
                ></edit>
            </div>
        </div>
        <!-- <button @click="addNode">添加box</button>
      <button @click="createStart">添加start</button> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, provide, ref } from "vue";
import edit from "edit";
import { create } from "nodeElement";
import TlpHeader from "../../components/tlpHeader/index.vue";
import ModeList from "../../components/modeList/index.vue";
import EditStore from "edit/src/common/editStore";
import EventBus from "eventBus";
import registerPushBack from "@common/registerPushBack";
export default defineComponent({
    components: { edit, TlpHeader, ModeList },
    setup() {
        let store: EditStore;
        let storeUtil = {
            get store() {
                return store;
            },
            event: new EventBus(),
            getJson() {
                store.getJson();
            },
            get canRedo() {
                if (store) {
                    return store.canRedo;
                } else {
                    return false;
                }
            },
            get canBack() {
                if (store) {
                    return store.canBack;
                } else {
                    return false;
                }
            },
            pushHistory() {
                store.pushHistory();
                this.event.emit("onPushHistory");
            },
            back() {
                store.back();
            },
            redo() {
                store.redo();
            },
        };
        let cancelPushBack: Function | undefined;
        const getCtx = (editstore: EditStore) => {
            store = editstore;
            cancelPushBack = registerPushBack(storeUtil);
        };
        const createElement = (name: string) => {
            create(name, store);
        };

        provide("storeUtil", storeUtil);
        onBeforeUnmount(() => {
            if (cancelPushBack) {
                cancelPushBack();
            }
        });
        return { createElement, getCtx };
    },
});
</script>
<style lang="less" scoped>
.page {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .content {
        position: absolute;
        top: 130px;
        left: 0;
        bottom: 0;
        right: 0;

        .nodelist {
            float: left;
            width: 250px;
            height: 100%;
            background-color: #545c64;
        }

        .editarea {
            position: absolute;
            left: 250px;
            right: 0;
            top: 0;
            bottom: 0;
            overflow: hidden;
        }
    }
}
</style>
