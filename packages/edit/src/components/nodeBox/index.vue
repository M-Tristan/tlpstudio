<template>
  <div @mouseover="mouseover" @mouseleave="mouseleave" class="nodebox" :style="{
    width: size.width + 'px',
    height: size.height + 'px',
    left: position.left + 'px',
    top: position.top + 'px',
  }" @mousedown="mousedown">
    <node-set :nodeId="node?.id" v-show="showNodeSet"></node-set>
  
    <div class="endpointer" v-for="(item,index) in  plugNum" :key="index" :style="{
    top: 100/(plugNum+1)*(index+1) + '%',
  }"  @mousedown.stop="addLine(index+1)" ></div>
    <!-- {{node}} -->
    <div class="socket" v-for="(item,index) in  socketNum" :key="index" :style="{
    top: 100/(socketNum+1)*(index+1) + '%',
  }" ></div>
    <slot></slot>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";
import EditStore from "../../common/editStore";
import { node } from "../../type";
import nodeSet from "../nodeSet/index.vue";
import config  from "../../common/config";
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
    const store: EditStore = inject<EditStore>("store") as EditStore
    const size = ref({
      width: props.width,
      height: props.height,
    });
    const position = ref({
      top: props.node!.position.top,
      left: props.node!.position.left,
    });
    const showNodeSet = ref(false)
    const socketNum = computed(()=>{
      let num = props.node?.socketNum
      if(num){
        return num
      }else{
        return 1
      }
    })
    const plugNum = computed(()=>{
      let num = props.node?.plugNum
      if(num){
        return num
      }else{
        return 1
      }
    })

    
    const mousedown = (event: MouseEvent) => {
      let oriClientX = event.clientX;
      let oriClientY = event.clientY;
      let oriLeft = position.value.left;
      let oriTop = position.value.top;
      let gridSize = config.grid.size
      window.onmousemove = (event: MouseEvent) => {
        position.value.left =
          Math.floor((event.clientX - oriClientX + oriLeft) / gridSize) * gridSize ;
        position.value.top =
          Math.floor((event.clientY - oriClientY + oriTop) / gridSize) * gridSize ;
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


    const addLine = (index:number) => {
      let event = window.event as MouseEvent
      let oriClientX = event.clientX;
      let oriClientY = event.clientY;
      let oriLeft = position.value.left + props.width;
      let oriTop = position.value.top + props.height / (plugNum.value+1)*index;
      let socketPositions = store.getAllNodeSocketPositions()
      let linkSocket: any;
      let plug  = {
        id:props.node!.id,
        plugIndex:index
      }
      window.onmousemove = (event: MouseEvent) => {
        linkSocket = null
        let endleft = event.clientX - oriClientX + oriLeft;
        let endtop = event.clientY - oriClientY + oriTop;
        for (let index = 0; index < socketPositions.length; index++) {
          let socket = socketPositions[index]
          if (Math.abs((endleft - socket.left)) < 10 && Math.abs((endtop - socket.top)) < 15) {
            linkSocket = socket
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
      };
    };
    const mouseover = () => {
      showNodeSet.value = true
    }
    const mouseleave = () => {
      showNodeSet.value = false
    }

    return { size, mousedown, position, addLine, showNodeSet, mouseover, mouseleave ,socketNum,plugNum};
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
  z-index: 2;
}

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

}

.endpointer:hover {
  background-color: red;
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
</style>
  