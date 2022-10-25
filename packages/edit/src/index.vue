<template>
    <div
        class="edit-container"
        :style="{
            width: width,
            height: height,
        }"
    >
        <div class="edit-main" ref="editContainer" @scroll="containerScroll">
            <div
                ref="editCanvas"
                class="edit-border"
                :style="{
                    width: `${5000 * scale}px`,
                    height: `${5000 * scale}px`,
                    ...editBorderPosition,
                }"
            >
                <div
                    class="edit"
                    :style="{
                        transform: `scale(${scale},${scale})`,
                        width: '5000px',
                        height: '5000px',
                        backgroundColor: backgroundColor,
                        backgroundSize:
                            backImageInfo.backgroundSize +
                            'px ' +
                            backImageInfo.backgroundSize +
                            'px',
                        backgroundPositionX:
                            backImageInfo.backgroundPosition.left + 'px',
                        backgroundPositionY:
                            backImageInfo.backgroundPosition.top + 'px',
                        backgroundImage: backImageInfo.backgroundImage,
                    }"
                >
                    <eline
                        v-for="line in lines"
                        :key="line.id"
                        :line="line"
                    ></eline>
                    <component
                        :is="node.name ? node.name : 'nodebox'"
                        v-for="node in nodes"
                        :key="node.id"
                        :node="node"
                        :width="node.size.width"
                        :height="node.size.height"
                    ></component>
                    <add-line v-if="showEditLine" :line="newLine"></add-line>
                </div>
            </div>
        </div>
        <setter></setter>
        <div class="edit-navigation">
            <Navigation></Navigation>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref, provide, nextTick } from "vue";
import Eline from "./components/eline/index.vue";
import NodeBox from "./components/nodeBox/index.vue";
import { node, position } from "./type";
import EditStore from "./common/editStore";
import _ from "lodash";
import AddLine from "./components/addLine/index.vue";
import config from "./common/config";
import Setter from "./components/setter/index.vue";
import Navigation from "./components/navigation/index.vue";
import ViewContainer from "./common/viewContainer";
import Hotkeys from "./common/hotkeys";
export default defineComponent({
    props: {
        width: {
            type: String || Number,
            default: 0,
        },
        height: {
            type: String || Number,
            default: 0,
        },
        backgroundColor: {
            type: String,
            default: "white",
        },
    },
    components: { NodeBox, Eline, AddLine, Setter, Navigation },

    setup(props, { emit }) {
        const store = new EditStore();
        const container = new ViewContainer();
        const nodes = ref([] as Array<any>);
        const editContainer = ref(null as unknown as HTMLDivElement);
        const editCanvas = ref(null as unknown as HTMLDivElement);

        let hotkeys: Hotkeys;

        emit("getCtx", store);
        const backImageInfo = ref({
            backgroundSize: config.grid.size,
            backgroundPosition: { left: 0, top: 0 },
            backgroundImage:
                "radial-gradient(circle at 0.5px 0.5px, rgb(218, 224, 228) 1px, transparent 0px)",
        });
        const lines = ref([] as any);
        const newLine = ref({} as any);
        const showEditLine = ref(false);
        const scale = ref(1);
        const editBorderPosition = ref({
            left: "0",
            top: "0",
        } as { [key: string]: string });
        const resizeObserver = new ResizeObserver(() => {
            container.setConstainerSize(
                editContainer.value.clientWidth,
                editContainer.value.clientHeight
            );
            container.render();
            setEditPositoion();
        });
        provide("store", store);
        provide("container", container);
        // provide("hotkeys", hotkeys);
        const setScale = () => {
            scale.value = container.edit.scale;
            setEditPositoion();
            containerScroll();
        };
        const setEditPositoion = () => {
            editBorderPosition.value = { left: "0", top: "0" };
            if (5000 * scale.value < editContainer.value.clientWidth) {
                editBorderPosition.value.left =
                    (editContainer.value.clientWidth - 5000 * scale.value) / 2 +
                    "px";
            }
            if (5000 * scale.value < editContainer.value.clientHeight) {
                editBorderPosition.value.top =
                    (editContainer.value.clientHeight - 5000 * scale.value) /
                        2 +
                    "px";
            }
        };
        const init = () => {
            
            store.onNodeChange(() => {
                if(store.nodes){
                    nodes.value = [...store.nodes];
                   
                }
            });
            store.event.on(
                "editline",
                function (start: position, end: position) {
                    showEditLine.value = true;
                    newLine.value = {
                        startPosition: start,
                        endPosition: end,
                    };
                }
            );
            store.event.on("finisheditline", function () {
                showEditLine.value = false;
            });
            store.onLineChange(function () {
                lines.value = store.lines;
            });
            nextTick(() => {
                container.setConstainerSize(
                    editContainer.value.clientWidth,
                    editContainer.value.clientHeight
                );
                resizeObserver.observe(editContainer.value);
                hotkeys = new Hotkeys(editCanvas.value);
                hotkeys.addKeyEvent((event: KeyboardEvent) => {
                    if (event.ctrlKey && event.key == "-") {
                        container.narrow();
                    }
                    if (event.metaKey && event.key == "-") {
                        container.narrow();
                    }
                    if (
                        event.ctrlKey &&
                        (event.key == "+" || event.key == "=")
                    ) {
                        container.enlarge();
                    }
                    if (
                        event.metaKey &&
                        (event.key == "+" || event.key == "=")
                    ) {
                        container.enlarge();
                    }
                    if (
                        event.key == "Backspace" ||
                        event.key == "Delete" ||
                        event.key == "delete"
                    ) {
                        store.removeLine();
                    }
                });
            });
            container.setScroll(setScroll);
            container.onScaleChange(setScale);
        };
        const containerScroll = () => {
            container.setConstainerScroll(
                editContainer.value.scrollLeft,
                editContainer.value.scrollTop
            );
            container.render();
        };
        const setScroll = () => {
            editContainer.value.scrollLeft = container.constainer.scrollLeft;
            editContainer.value.scrollTop = container.constainer.scrollTop;
        };

        init();

        onBeforeUnmount(() => {
            store.event.off("editline");
            store.event.off("finisheditline");
            store.removeLineChange();
            container.offScroll(setScroll);
            resizeObserver.unobserve(editContainer.value);
            container.offScaleChange(setScale);
            if (hotkeys) {
                hotkeys.destroyed();
            }
        });

        return {
            backImageInfo,
            showEditLine,
            lines,
            newLine,
            nodes,
            editContainer,
            containerScroll,
            scale,
            editBorderPosition,
            editCanvas,
        };
    },
});
</script>
<style lang="less" scoped>
.edit-container {
    position: relative;
    overflow: hidden;

    .edit-main {
        position: relative;
        overflow: scroll;
        // display: flex;
        width: 100%;
        height: 100%;

        .edit-border {
            position: absolute;

            .edit {
                // overflow: hidden;
                position: relative;
                // left: 0;
                // top: 0;
                transform-origin: 0 0;
            }
        }
    }

    .edit-navigation {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 200px;
    }
}

// .testcontent{
//     display: inline-block;
// }
</style>
