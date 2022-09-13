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
    <!-- <line
     
      :x1="startPosition.left"
      :y1="startPosition.top"
      :x2="endPosition.left"
      :y2="endPosition.top"
      style="stroke: rgb(99, 99, 99); stroke-width: 2"
    /> -->
    <!-- <path
      pointer-events="all"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      d="M218,0 L208.11712810073647,6.191029237755795 L208.00184599859043,0.19213683691005315 L207.8865638964444,-5.806755563935689 L218,0"
      stroke="hsl(228,9.6%,79.6%)"
      fill="hsl(228,9.6%,79.6%)"
      transform="translate(3,5.806755563935689)"
    ></path> -->
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
  <div v-if="lineColor=='red'" class="deletecontent"  :style="{
      left: position.left + size.width/2+'px',
      top: position.top + size.height/2+'px',
     }"  @mouseenter.stop="mouseenter"
      @mouseleave="mouseout">
    <svg t="1663033305579"
     class="deleteicon"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2375" width="200" height="200"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" p-id="2376"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" p-id="2377"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" p-id="2378"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" p-id="2379"></path></svg>

  </div>
  </template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

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
