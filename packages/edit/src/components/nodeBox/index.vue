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
      <node-set :nodeId="node?.id"  v-show="showNodeSet"></node-set>
      <div class="endpointer" @mousedown.stop="addLine"></div>
      {{node}}
      <div class="socket"></div>
      <slot></slot>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, inject, ref } from "vue";
import EditStore from "../../common/EditStore";
  import { node } from "../../type";
  import nodeSet from "../nodeSet/index.vue";
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
      const store:EditStore = inject<EditStore>("store") as EditStore
      const size = ref({
        width: props.width,
        height: props.height,
      });
      const position = ref({
        top: props.node!.position.top,
        left: props.node!.position.left,
      });
      const showNodeSet = ref(false)
  
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
            store.changeNodePosition(
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
        let socketPositions = store.getAllNodeSocketPositons()
        let linkNode: node | null;
        window.onmousemove = (event: MouseEvent) => {
          linkNode = null
          let endleft = event.clientX - oriClientX + oriLeft;
          let endtop = event.clientY - oriClientY + oriTop;
          for(let index = 0;index<socketPositions.length;index++){
            let socket = socketPositions[index]
            if (Math.abs((endleft - socket.left)) < 10 && Math.abs((endtop - socket.top)) < 15) {
              linkNode = store.getNodeById(socket.id)
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
          
          if (linkNode) {
            store.addLine(props.node!.id, linkNode.id);
          }
  
          window.onmousemove = null;
        };
      };
      const mouseover = () => {
        showNodeSet.value = true
      }
      const mouseleave = () => {
        showNodeSet.value = false
      }
  
      return { size, mousedown, position, addLine,showNodeSet,mouseover ,mouseleave};
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
  