<template>
    <svg
        pointer-events="none"
        class="line"
        :style="{
            left: position.left + 'px',
            top: position.top + 'px',
            zIndex: hover ? 1 : 0,
        }"
        :width="size.width"
        :height="size.height"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            ref="pathLine"
            :d="path"
            style="stroke-width: 2; fill: none; cursor: pointer"
            :stroke="lineColor"
        ></path>

        <path
            pointer-events="visibleStroke"
            @mouseenter="mouseenter"
            @mouseleave="mouseout"
            :d="path"
            style="stroke-width: 20; fill: none; cursor: pointer; opacity: 0"
            :stroke="lineColor"
        ></path>
    </svg>
    <!-- {{ancleRotate}} -->
    <!-- tranform:rotate(ancleRotate) -->
    <svg
        t="1662814763800"
        class="ancle"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        preserveAspectRatio="none"
        :style="{
            left: position.left + 'px',
            top: position.top + 'px',
            offsetPath: `path('${path}')`,
            offsetDistance: `40%`,
            fill: lineColor,
            zIndex: hover ? 1 : 0,
        }"
    >
        <!-- offsetPath: `path('${path}')`, -->
        <path d="M325.456896 862.27968" p-id="2455"></path>
        <path d="M882.05824 862.27968" p-id="2456"></path>
        <path d="M236.027904 877.161472" p-id="2457"></path>
        <path d="M960.132096 877.161472" p-id="2458"></path>
        <path d="M154.215424 876.16" p-id="2459"></path>
        <path
            d="M816.575488 509.791232 209.619968 63.070208 209.619968 957.022208Z"
            p-id="2460"
        ></path>
        <path d="M871.471104 876.16" p-id="2461"></path>
    </svg>
    <svg
        t="1662814763800"
        class="ancle"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        preserveAspectRatio="none"
        :style="{
            left: position.left + 'px',
            top: position.top + 'px',
            offsetPath: `path('${path}')`,
            offsetDistance: `${endArrowPosition}%`,
            fill: lineColor,
            zIndex: hover ? 1 : 0,
        }"
    >
        <!-- offsetPath: `path('${path}')`, -->
        <path d="M325.456896 862.27968" p-id="2455"></path>
        <path d="M882.05824 862.27968" p-id="2456"></path>
        <path d="M236.027904 877.161472" p-id="2457"></path>
        <path d="M960.132096 877.161472" p-id="2458"></path>
        <path d="M154.215424 876.16" p-id="2459"></path>
        <path
            d="M816.575488 509.791232 209.619968 63.070208 209.619968 957.022208Z"
            p-id="2460"
        ></path>
        <path d="M871.471104 876.16" p-id="2461"></path>
    </svg>
    <div
        v-if="hover"
        class="deletecontent"
        :style="{
            left: deleteposition.left + position.left + 'px',
            top: deleteposition.top + position.top + 'px',
        }"
        @mouseenter.stop="mouseenter"
        @mouseleave="mouseout"
        @click="removeLine"
    >
        <svg
            t="1663033305579"
            class="deleteicon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2375"
            width="200"
            height="200"
        >
            <path
                d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
                p-id="2376"
            ></path>
            <path
                d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
                p-id="2377"
            ></path>
            <path
                d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
                p-id="2378"
            ></path>
            <path
                d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
                p-id="2379"
            ></path>
        </svg>
    </div>
</template>

<script lang="ts">
import { getLine, getPosition, getSize } from "../../common/util";
import {
    computed,
    defineComponent,
    inject,
    ref,
    toRaw,
    watch,
    nextTick,
} from "vue";
import config from "../../common/config";
import EditStore, { line } from "../../common/editStore";

export default defineComponent({
    props: {
        line: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup(props) {
        const store: EditStore = inject<EditStore>("store") as EditStore;
        const hover = ref(false);
        let lineConfig = config.line;
        const lineColor = ref(lineConfig.originColor);
        const pathLine = ref(null as unknown as SVGPathElement);
        const deleteposition = ref({ left: 0, top: 0 });
        const endArrowPosition = ref(100);
        const start = computed(() => {
            return props.line.startPosition;
        });
        const end = computed(() => {
            return props.line.endPosition;
        });
        const size = computed(() => {
            return getSize(start.value, end.value);
        });
        const position = computed(() => {
            return getPosition(start.value, end.value);
        });
        const path = computed(() => {
            let path = getLine(start.value, end.value);

            return path;
        });
        watch(path, () => {
            setEndArrowPosition();
        });

        const init = () => {
            setEndArrowPosition();
            if (props.line.active) {
                lineColor.value = lineConfig.activeColor;
            }
        };
        const setEndArrowPosition = () => {
            nextTick(() => {
                let totalLength = pathLine.value.getTotalLength();
                endArrowPosition.value =
                    ((totalLength - 15) * 100) / totalLength;
            });
        };
        const mouseenter = () => {
            lineColor.value = lineConfig.tipColor;
            let point = pathLine.value.getPointAtLength(
                pathLine.value.getTotalLength() / 2
            );
            deleteposition.value.left = point.x;
            deleteposition.value.top = point.y;
            hover.value = true;
        };
        const mouseout = () => {
            if (props.line.active) {
                lineColor.value = lineConfig.activeColor;
            } else {
                lineColor.value = lineConfig.originColor;
            }

            hover.value = false;
        };
        const removeLine = () => {
            store.removeLine(toRaw(props.line) as line);
        };
        init();
        return {
            size,
            position,
            path,
            start,
            end,
            mouseenter,
            lineColor,
            mouseout,
            removeLine,
            pathLine,
            deleteposition,
            endArrowPosition,
            hover,
        };
    },
});
</script>
<style lang="less" scoped>
.line {
    position: absolute;
    /* border: 1px solid ;
    z-index: 99; */
}

.ancle {
    position: absolute;
    width: 20px;
    height: 15px;
    transform-origin: 0% 50%;
    /* transform: translateY(-50%) translateX(-80%); */
}

.deletecontent {
    cursor: pointer;
    z-index: 99;
    position: absolute;
    width: 20px;
    height: 20px;
    transform: translateX(-50%) translateY(-50%);
    padding: 5px;
    border: 1px solid red;
    border-radius: 5px;
    .deleteicon {
        width: 20px;
        height: 20px;
        fill: red;
    }
}
</style>
