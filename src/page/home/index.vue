<template>
    <div class="page">
        <tlp-header @addScene="showScene"></tlp-header>
        <ModeList v-show="scenes.length != 0" :scenes="scenes" @selectScene="selectScene" @removeScene="removeScene"
            :selectID="sceneID"></ModeList>
        <div v-show="scenes.length != 0" class="content">
            <div class="nodelist">
                <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                    default-active="1" text-color="#fff" style="border: 0px">
                    <el-sub-menu index="1">
                        <template #title>
                            <span>IOT</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1" @click="createElement('start')">start</el-menu-item>
                            <el-menu-item index="1-2" @click="createElement('end')">end</el-menu-item>
                            <el-menu-item index="1-2" @click="createElement('code')">code</el-menu-item>
                            <el-menu-item index="1-2" @click="createElement('ifnode')">ifnode</el-menu-item>

                            <el-menu-item index="1-2" @click="createElement('twoSocketTest')">twoSocketTest
                            </el-menu-item>
                            <el-menu-item index="1-2" @click="createElement('twoPlugTest')">twoPlugTest</el-menu-item>
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
                <edit @getCtx="getCtx" width="100%" height="100%" backgroundColor="#a9a9a9"></edit>
            </div>
        </div>
        <div class="emptyContent" v-show="scenes.length == 0">
            <div class="tips">TLP Studio</div>
            <div class="button-list">
                <div class="button" @click="showScene">新建流程</div>
                <div class="button">导入</div>
            </div>
        </div>
        <el-dialog v-model="addSceneVisible" title="创建流程" width="50%">
            <div>
                <el-row>
                    <el-col :span="3">流程名称：</el-col>
                    <el-col :span="16">
                        <el-input v-model="sceneBaseInfo.name"></el-input>
                    </el-col>

                    <el-col :span="4">
                        <div class="grid-content ep-bg-purple-light" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">流程描述：
                        <div class="grid-content ep-bg-purple" />
                    </el-col>
                    <el-col :span="16">
                        <el-input type="textarea" :rows="3" resize="none" v-model="sceneBaseInfo.descript"></el-input>
                    </el-col>

                    <el-col :span="4">
                        <div class="grid-content ep-bg-purple-light" />
                    </el-col>
                </el-row>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="createScene">
                        完成
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, provide, reactive, ref } from "vue";
import edit from "edit";
import { create } from "nodeElement";
import TlpHeader from "../../components/tlpHeader/index.vue";
import ModeList from "../../components/modeList/index.vue";
import EditStore from "edit/src/common/editStore";
import EventBus from "eventBus";
import registerPushBack from "@common/registerPushBack";
import Scene from "edit/src/common/scene";
export default defineComponent({
    components: { edit, TlpHeader, ModeList },
    setup() {
        let sceneBaseInfo = ref({
            name: "",
            descript: "",
        });
        let sceneID = ref("");
        let addSceneVisible = ref(false);
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
                this.event.emit("resetHistoryInfo");
            },
            back() {
                store.back();
            },
            redo() {
                store.redo();
            },
        };
        let scenes = ref([] as Array<any>);
        // eslint-disable-next-line @typescript-eslint/ban-types
        let cancelPushBack: Function | undefined;
        const getCtx = (editstore: EditStore) => {
            store = editstore;
            cancelPushBack = registerPushBack(storeUtil);
        };
        const createElement = (name: string) => {
            create(name, store);
            storeUtil.event.emit("resetHistoryInfo");
        };
        const createScene = () => {
            let scene = store.createScene(sceneBaseInfo.value);
            sceneID.value = scene.id;
            store.addScene(scene);
            scenes.value = store.scenes;
            addSceneVisible.value = false;
            storeUtil.event.emit("resetHistoryInfo");
        };
        const showScene = () => {
            sceneBaseInfo.value = {
                name: "",
                descript: "",
            };
            addSceneVisible.value = true;
        };

        const selectScene = (scene: Scene | undefined) => {
            if (scene) {
                store.renderScene(scene);
                sceneID.value = scene.id;
            } else {
                sceneID.value = "";
            }
            storeUtil.event.emit("resetHistoryInfo");
        };
        const removeScene = (scene: Scene) => {
            let deleteIndex = store.scenes.findIndex(item => {
                return item.id == scene.id;
            });

            if (deleteIndex != -1) {
                store.removeScene(scene);
                scenes.value = store.scenes;
                if (scene.id != sceneID.value) {
                    return;
                }
                if (scenes.value[deleteIndex]) {
                    selectScene(scenes.value[deleteIndex]);
                } else {
                    selectScene(scenes.value[deleteIndex - 1]);
                }
            }
        };

        provide("storeUtil", storeUtil);
        onBeforeUnmount(() => {
            if (cancelPushBack) {
                cancelPushBack();
            }
        });
        return {
            createElement,
            getCtx,
            scenes,
            showScene,
            addSceneVisible,
            createScene,
            sceneBaseInfo,
            selectScene,
            sceneID,
            removeScene,
        };
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

    .el-row {
        margin-bottom: 10px;
    }

    .emptyContent {
        position: absolute;
        top: 80px;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #545c64;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
       
        .tips {
            font-size: 80px;
            font-weight: 900;
            color: white;
            height: 80px;
        }

        .button-list {
            display: flex;

            .button {
                cursor: pointer;
                width: 100px;
                height: 50px;
                color: white;
                border:1px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                font-weight: 700;
                margin: 10px;
                &:hover{
                    background-color: rgba(255, 255, 255, 0.139);
                }
            }
        }

    }

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
