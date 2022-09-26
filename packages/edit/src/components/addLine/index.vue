<template>
    <svg
        class="addline"
        :style="{
            left: position.left + 'px',
            top: position.top + 'px',
        }"
        :width="size.width"
        :height="size.height"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            :d="path"
            style="stroke-width: 2; fill: none; cursor: pointer"
            :stroke="lineColor"
        ></path>

        <path
            :d="path"
            style="stroke-width: 20; fill: none; cursor: pointer; opacity: 0"
            :stroke="lineColor"
        ></path>
    </svg>
    <svg
        t="1662814763800"
        class="addancle"
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
            fill: lineColor,
            offsetDistance: `99%`,
        }"
    >
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
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import config from "../../common/config";
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
        let lineConfig = config.line;
        const lineColor = ref(lineConfig.originColor);
        const start = computed(() => {
            return props.line.startPosition;
        });
        const end = computed(() => {
            return props.line.endPosition;
        });
        const size = computed(() => {
            let width = Math.abs(end.value.left - start.value.left);
            let height = Math.abs(end.value.top - start.value.top);
            return {
                width: width > 2 ? width : 2,
                height: height > 2 ? height : 2,
            };
        });

        const position = computed(() => {
            return {
                left:
                    end.value.left > start.value.left
                        ? start.value.left
                        : end.value.left,
                top:
                    end.value.top > start.value.top
                        ? start.value.top
                        : end.value.top,
            };
        });

        const startPosition = computed(() => {
            if (
                end.value.left >= start.value.left &&
                end.value.top >= start.value.top
            ) {
                return {
                    top: 0,
                    left: 0,
                };
            } else if (
                end.value.left >= start.value.left &&
                end.value.top < start.value.top
            ) {
                return {
                    top: size.value.height,
                    left: 0,
                };
            } else if (
                end.value.left < start.value.left &&
                end.value.top < start.value.top
            ) {
                return {
                    top: size.value.height,
                    left: size.value.width,
                };
            } else {
                return {
                    top: 0,
                    left: size.value.width,
                };
            }
        });
        const endPosition = computed(() => {
            if (
                end.value.left >= start.value.left &&
                end.value.top >= start.value.top
            ) {
                return {
                    top: size.value.height,
                    left: size.value.width,
                };
            } else if (
                end.value.left >= start.value.left &&
                end.value.top < start.value.top
            ) {
                return {
                    top: 0,
                    left: size.value.width,
                };
            } else if (
                end.value.left < start.value.left &&
                end.value.top < start.value.top
            ) {
                return {
                    top: 0,
                    left: 0,
                };
            } else {
                return {
                    top: size.value.height,
                    left: 0,
                };
            }
        });
        const path = computed(() => {
            const halfLeft =
                (startPosition.value.left + endPosition.value.left) / 2;
            return `M${startPosition.value.left} ${startPosition.value.top} C${halfLeft} ${startPosition.value.top} ${halfLeft} ${endPosition.value.top} ${endPosition.value.left} ${endPosition.value.top}`;
        });

        return {
            size,
            position,
            startPosition,
            endPosition,
            path,
            start,
            end,
            lineColor,
        };
    },
});
</script>
<style lang="less" scoped>
.addline {
    position: absolute;
    z-index: 10;
}
.addancle {
    position: absolute;
    width: 20px;
    height: 15px;
    z-index: 10;
    /* transform: translateY(-50%) translateX(-50%); */
}
</style>
