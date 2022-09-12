<template>
  <div
    class="nodebox"
    :style="{
      width: size.width + 'px',
      height: size.height + 'px',
      left: position.left + 'px',
      top: position.top + 'px',
    }"
    @mousedown="mousedown"
  >
    <div class="endpointer" @mousedown.stop="addLine"></div>
    <div class="socket"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import eventEmit from "../common/eventBus";
import { node } from "../editType";
import editConfig from "../common/editConfig";
export default defineComponent({
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
    const size = ref({
      width: props.width,
      height: props.height,
    });
    const position = ref({
      top: props.node!.position.top,
      left: props.node!.position.left,
    });

    const mousedown = (event: MouseEvent) => {
      let oriClientX = event.clientX;
      let oriClientY = event.clientY;
      let oriLeft = position.value.left;
      let oriTop = position.value.top;
      window.onmousemove = (event: MouseEvent) => {
        position.value.left =
          Math.floor((event.clientX - oriClientX + oriLeft) / 20) * 20 + 10;
        position.value.top =
          Math.floor((event.clientY - oriClientY + oriTop) / 20) * 20 + 10;
        editConfig.changeNodePosition(
          {
            ...position.value,
          },
          props.node!.id
        );
      };
      window.onmouseup = () => {
        window.onmousemove = null;
      };
    };

    const addLine = (event: MouseEvent) => {
      let oriClientX = event.clientX;
      let oriClientY = event.clientY;
      let oriLeft = position.value.left + props.width;
      let oriTop = position.value.top + props.height / 2;
      let linkNode: node | null;
      window.onmousemove = (event: MouseEvent) => {
        let endleft = event.clientX - oriClientX + oriLeft;
        let endop = event.clientY - oriClientY + oriTop;
        linkNode = editConfig.getNodeBySocketPosition({
          left: endleft,
          top: endop,
        });

        eventEmit.emit(
          "editline",
          { left: oriLeft, top: oriTop },
          { left: endleft, top: endop }
        );
      };
      window.onmouseup = () => {
        eventEmit.emit("finisheditline");
        if (linkNode) {
          editConfig.addLine(props.node!.id, linkNode.id);
        }

        window.onmousemove = null;
      };
    };

    return { size, mousedown, position, addLine };
  },
});
</script>

<style scoped>
.nodebox {
  position: absolute;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.endpointer {
  position: absolute;
  top: 50%;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: gray;
  border-radius: 50%;
  overflow: hidden;
  transform: translateX(50%) translateY(-50%);
}
.endpointer:hover {
  background-color: red;
}
.socket {
  position: absolute;
  top: 50%;
  left: 0;
  width: 5px;
  height: 20px;
  background-color: gray;

  overflow: hidden;
  transform: translateX(-50%) translateY(-50%);
}
</style>
