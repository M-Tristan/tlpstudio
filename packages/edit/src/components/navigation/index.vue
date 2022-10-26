<template>
    <div class="navigation_container">
        <i
            class="icon iconfont icon-yulan navigation-icon"
            v-if="!showNavigator"
            @click="showNavigator = !showNavigator"
        ></i>
        <div class="navigator" v-if="showNavigator">
            <i
                class="icon iconfont icon-guanbi close-icon"
                @click="showNavigator = !showNavigator"
            ></i>
            <div
                class="display-area"
                @mousedown="mousedown"
                :style="{
                    height: containerSize.height + 'px',
                    width: containerSize.width + 'px',
                    top: containerPosition.top - 200 + 'px',
                    left: containerPosition.left - 200 + 'px',
                }"
            ></div>
            <navigate-node
                v-for="node in nodes"
                :key="node.id"
                :node="node"
            ></navigate-node>
            <div class="operabtn">
                <i class="icon iconfont icon-fangda" @click="enlarge"></i>
                <el-tooltip
                    :content="scale * 100 + '%'"
                    placement="top"
                    effect="light"
                >
                    <i class="icon iconfont icon-chakan" @click="reduction"></i>
                </el-tooltip>

                <i class="icon iconfont icon-zoomout" @click="narrow"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    ref,
    nextTick,
    reactive,
    onBeforeUnmount,
} from "vue";
import EditStore from "../../common/editStore";
import ViewContainer from "../../common/viewContainer";
import navigateNode from "./navigateNode.vue";
export default defineComponent({
    components: {
        navigateNode,
    },
    setup() {
        const showNavigator = ref(false);
        const container: ViewContainer = inject<ViewContainer>(
            "container"
        ) as ViewContainer;
        const store: EditStore = inject<EditStore>("store") as EditStore;
        const nodes = ref([] as any[]);
        const scale = ref(1);
        const containerSize = reactive({
            width: 0,
            height: 0,
        });
        const containerPosition = reactive({
            left: 0,
            top: 0,
        });
        const mousedown = (event: MouseEvent) => {
            let oriClientX = event.clientX;
            let oriClientY = event.clientY;
            let oriLeft = containerPosition.left;
            let oriTop = containerPosition.top;
            let edit = container.edit;
            let rate = 200 / edit.width / edit.scale;
            let maxScroll = container.maxScroll;
            let maxScrollLeft = maxScroll.scrollLeft * rate;
            let maxScrollTop = maxScroll.scrollTop * rate;
            window.onmousemove = (event: MouseEvent) => {
                let newLeft = event.clientX - oriClientX + oriLeft;
                let newTop = event.clientY - oriClientY + oriTop;
                newLeft = newLeft > 0 ? newLeft : 0;
                newTop = newTop > 0 ? newTop : 0;
                containerPosition.left =
                    newLeft > maxScrollLeft ? maxScrollLeft : newLeft;
                containerPosition.top =
                    newTop > maxScrollTop ? maxScrollTop : newTop;
                container.setConstainerScroll(newLeft / rate, newTop / rate);
                container.renderScroll();
            };
            window.onmouseup = () => {
                window.onmousemove = null;
                window.onmouseup = null;
            };
        };

        const getDisplay = () => {
            let edit = container.edit;
            let containerInfo = container.constainer;
            let rate = 200 / edit.width;
            return {
                width: (containerInfo.width * rate) / edit.scale,
                height: (containerInfo.height * rate) / edit.scale,
                left: (containerInfo.scrollLeft * rate) / edit.scale,
                top: (containerInfo.scrollTop * rate) / edit.scale,
            };
        };
        const enlarge = () => {
            container.enlarge();
        };
        const narrow = () => {
            container.narrow();
        };
        const reduction = () => {
            container.reduction();
        };
        const render = () => {
            let edit = container.edit;
            let rate = 200 / edit.width;
            let display = getDisplay();
            containerSize.height = display.height;
            containerSize.width = display.width;
            containerPosition.left = display.left;
            containerPosition.top = display.top;
            scale.value = container.edit.scale;
            if (store.nodes) {
                nodes.value = store.nodes.map(node => {
                    return {
                        id: node.id,
                        width: node.size.width * rate * 2,
                        height: node.size.height * rate * 2,
                        left: node.position.left * rate,
                        top: node.position.top * rate,
                    };
                });
            } else {
                nodes.value = [];
            }
        };
        const init = () => {
            nextTick(() => {
                render();
            });
            container.setRender(render);
        };
        init();
        onBeforeUnmount(() => {
            container.offRender(render);
        });
        return {
            showNavigator,
            containerSize,
            containerPosition,
            mousedown,
            nodes,
            enlarge,
            narrow,
            reduction,
            scale,
        };
    },
});
</script>

<style lang="less" scoped>
.navigation_container {
    .navigation-icon {
        background-color: rgb(230, 230, 230);
        font-size: 20px;
        cursor: pointer;
        border: 2px solid white;
    }

    .navigator {
        width: 200px;
        height: 200px;
        background-color: rgba(255, 255, 255, 0.703);
        position: relative;
        overflow: hidden;
        filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px white);
        .close-icon {
            position: absolute;
            right: 20px;
            top: 10px;
            cursor: pointer;
            z-index: 2;
        }

        .display-area {
            position: absolute;
            border: 1px solid black;
            z-index: 1;
            border: 200px solid rgba(0, 0, 0, 0.315);
        }
        .operabtn {
            position: absolute;
            z-index: 2;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: space-between;
            width: 100px;
            .icon {
                font-size: 24px;
                cursor: pointer;
            }
        }
    }
}
</style>
