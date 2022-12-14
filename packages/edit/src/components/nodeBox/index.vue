<template>
    <div
        @mouseover="mouseover"
        @mouseleave="mouseleave"
        class="nodebox"
        :style="{
            width: size.width + 'px',
            height: size.height + 'px',
            left: position.left + 'px',
            top: position.top + 'px',
        }"
        @mousedown="mousedown"
    >
        <div class="node-container" :style="node.style">
            <node-set :nodeId="node?.id" v-show="showNodeSet"></node-set>

            <div
                class="endpointer"
                v-for="(item, index) in plugNum"
                :key="index"
                :style="{
                    top: (100 / (plugNum + 1)) * (index + 1) + '%',
                }"
                @mousedown.stop="addLine(index + 1)"
            ></div>
            <!-- {{node}} -->
            <div
                class="socket"
                v-for="(item, index) in socketNum"
                :key="index"
                :style="{
                    top: (100 / (socketNum + 1)) * (index + 1) + '%',
                }"
            ></div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    inject,
    onBeforeMount,
    onBeforeUnmount,
    ref,
    watch,
} from "vue";
import EditStore from "../../common/editStore";
import { node } from "../../type";
import nodeSet from "../nodeSet/index.vue";
import config from "../../common/config";
import ViewContainer from "../../common/viewContainer";

export default defineComponent({
    components: { nodeSet },
    name: "nodebox",
    props: {
        width: {
            type: Number,
            default: 100,
        },
        height: {
            type: Number,
            default: 100,
        },
        node: {
            type: Object,
            defualt: () => {
                return {} as node;
            },
        },
    },
    setup(props) {
        const nodeStyle = ref();
        const container: ViewContainer = inject<ViewContainer>(
            "container"
        ) as ViewContainer;
        const store: EditStore = inject<EditStore>("store") as EditStore;
        const size = ref({
            width: props.width,
            height: props.height,
        });
        const position = ref({
            top: props.node!.position.top,
            left: props.node!.position.left,
        });
        const showNodeSet = ref(false);
        const socketNum = computed(() => {
            let num = props.node?.socketNum;
            if (num) {
                return num;
            } else {
                return 0;
            }
        });
        const plugNum = computed(() => {
            let num = props.node?.plugNum;
            if (num) {
                return num;
            } else {
                return 1;
            }
        });
        watch(
            () => {
                return props.node;
            },
            () => {
                position.value.top = props.node!.position.top;
                position.value.left = props.node!.position.left;
            }
        );
        const mousedown = (event: MouseEvent) => {
            let oriClientX = event.clientX;
            let oriClientY = event.clientY;
            let oriLeft = position.value.left;
            let oriTop = position.value.top;
            let gridSize = config.grid.size;
            let scale = container.edit.scale;
            window.onmousemove = (event: MouseEvent) => {
                position.value.left =
                    Math.floor(
                        ((event.clientX - oriClientX) / scale + oriLeft) /
                            gridSize
                    ) * gridSize;
                position.value.top =
                    Math.floor(
                        ((event.clientY - oriClientY) / scale + oriTop) /
                            gridSize
                    ) * gridSize;
                store.changeNodePosition(
                    {
                        ...position.value,
                    },
                    props.node!.id
                );
            };
            window.onmouseup = () => {
                window.onmousemove = null;
                window.onmouseup = null;
                if (
                    oriLeft != position.value.left ||
                    oriTop != position.value.top
                ) {
                    store.emitNodeMoveEnd();
                    container.render();
                }
            };
        };

        const addLine = (index: number) => {
            let event = window.event as MouseEvent;
            let oriClientX = event.clientX;
            let oriClientY = event.clientY;
            let oriLeft = position.value.left + props.width;
            let oriTop =
                position.value.top +
                (props.height / (plugNum.value + 1)) * index;
            let socketPositions = store.getAllNodeSocketPositions();
            let linkSocket: any;
            let plug = {
                id: props.node!.id,
                plugIndex: index,
            };
            let scale = container.edit.scale;
            window.onmousemove = (event: MouseEvent) => {
                linkSocket = null;
                let endleft = (event.clientX - oriClientX) / scale + oriLeft;
                let endtop = (event.clientY - oriClientY) / scale + oriTop;
                for (let index = 0; index < socketPositions.length; index++) {
                    let socket = socketPositions[index];
                    if (
                        Math.abs(endleft - socket.left) < 10 &&
                        Math.abs(endtop - socket.top) < 15
                    ) {
                        linkSocket = socket;
                        break;
                    }
                }

                store.event.emit(
                    "editline",
                    { left: oriLeft, top: oriTop },
                    { left: endleft, top: endtop }
                );
            };
            window.onmouseup = () => {
                store.event.emit("finisheditline");

                if (linkSocket) {
                    store.addLine(plug, linkSocket);
                }

                window.onmousemove = null;
                window.onmouseup = null;
            };
        };
        const mouseover = () => {
            showNodeSet.value = true;
        };
        const mouseleave = () => {
            showNodeSet.value = false;
        };
        const init = () => {
            container.render();
        };
        init();
        onBeforeUnmount(() => {
            container.render();
        });
        return {
            size,
            mousedown,
            position,
            addLine,
            showNodeSet,
            mouseover,
            mouseleave,
            socketNum,
            plugNum,
        };
    },
});
</script>
<style lang="less" scoped>
.nodebox {
    position: absolute;
    cursor: pointer;
    user-select: none;
    z-index: 2;
    .endpointer {
        position: absolute;
        /* top: 50%; */
        right: 0;
        width: 15px;
        height: 15px;
        background-color: gray;
        border-radius: 50%;
        overflow: hidden;
        transform: translateX(50%) translateY(-50%);
        &:hover {
            background-color: #409eff
        }
    }
    .node-container {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .socket {
        position: absolute;
        /* top: 50%; */
        left: 0;
        width: 5px;
        height: 15px;
        background-color: gray;

        overflow: hidden;
        transform: translateX(-50%) translateY(-50%);
    }
}
</style>
