<template>
  
  <svg
    class="line"
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
      style="stroke-width: 2; fill: none;cursor: pointer;"
      :stroke="lineColor"
    ></path>
   
    <path
      @mouseenter="mouseenter"
      @mouseleave="mouseout"
      :d="path"
      style="stroke-width: 20; fill: none;cursor: pointer;opacity: 0;"
      :stroke="lineColor"
    ></path>
  
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
      left: end.left + 'px',
      top: end.top + 'px',
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
import { computed, defineComponent, ref, watch } from "vue";
import editConfig, { line } from "../common/editConfig";

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
    const lineColor = ref("rgb(99, 99, 99)")
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
          end.value.left > start.value.left ? start.value.left : end.value.left,
        top: end.value.top > start.value.top ? start.value.top : end.value.top,
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
      const halfLeft = (startPosition.value.left + endPosition.value.left) / 2;
      return `M${startPosition.value.left} ${startPosition.value.top}
       C${halfLeft}
       ${startPosition.value.top}
       ${halfLeft}
        ${endPosition.value.top}
      ${endPosition.value.left}
      ${endPosition.value.top}`;
    });
    const mouseenter = () => {
      lineColor.value = 'red'
    }
    const mouseout = () => {
      lineColor.value = "rgb(99, 99, 99)"
    }
 
    return { size, position, startPosition, endPosition, path, start, end ,mouseenter,lineColor,mouseout};
  },
});
</script>

<style scoped>
.line {
  position: absolute;
}
.ancle {
  position: absolute;
  width: 20px;
  height: 15px;
  transform: translateY(-50%) translateX(-50%);
}
.deleteicon{

  width: 20px;
  height: 20px;
 fill:red
}
.deletecontent{
  cursor: pointer;
  z-index: 99;
  position: absolute;
  width: 20px;
  height: 20px;
  transform: translateX(-50%) translateY(-50%);
  padding: 5px;
  border: 1px solid red;
  border-radius: 5px;
 
}
</style>
