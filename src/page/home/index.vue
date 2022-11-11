<template>
    <div class="page">
        <tlp-header
            @addScene="showScene"
            :showDeploy="scenes.length != 0"
            :showHistoryControl="scenes.length != 0"
            :scenes="scenes"
        >
        </tlp-header>
        <ModeList
            v-show="scenes.length != 0"
            :scenes="scenes"
            @selectScene="selectScene"
            @removeScene="removeScene"
            :selectID="sceneID"
        ></ModeList>
        <div v-show="scenes.length != 0" class="content">
            <node-list :createElement="createElement"></node-list>
            <div class="editarea">
                <edit
                    @getCtx="getCtx"
                    width="100%"
                    height="100%"
                    backgroundColor="rgb(59 62 66)"
                ></edit>
            </div>
        </div>
        <div class="emptyContent" v-show="scenes.length == 0">
            <div class="tips">TLP Studio</div>
            <div class="button-list">
                <div class="button" @click="showScene">New Project</div>
                <div class="button">Import</div>
            </div>
        </div>
        <edit-process
            v-model="addSceneVisible"
            :createScene="createScene"
            :sceneBaseInfo="sceneBaseInfo"
        ></edit-process>
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
import nodeList from "@components/nodeList/index.vue";
import editProcess from "@components/editProcess/index.vue";
export default defineComponent({
    components: { edit, TlpHeader, ModeList, nodeList, editProcess },
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
            removeScene(scene: Scene) {
                removeScene(scene);
            },
        };
        let scenes = ref([] as Array<any>);
        // eslint-disable-next-line @typescript-eslint/ban-types
        let cancelPushBack: Function | undefined;
        const getCtx = (editstore: EditStore) => {
            store = editstore;
            cancelPushBack = registerPushBack(storeUtil);
        };
        const createElement = (node: any) => {
            if (node.value == "") {
                return;
            }
            create(node.value, store);
            storeUtil.event.emit("resetHistoryInfo");
        };
        const createScene = (baseInfo: { [key: string]: any }) => {
            let scene = store.createScene(baseInfo);
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
            console.log(deleteIndex);
            console.log(scene);
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
@import "./index.less";
</style>
