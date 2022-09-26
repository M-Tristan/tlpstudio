<template>
    <div class="navigation_container">
        <i class="icon iconfont icon-yulan navigation-icon" v-if="!showNavigator"
            @click="showNavigator = !showNavigator"></i>
        <div class="navigator" v-if="showNavigator">
            <i class="icon iconfont icon-guanbi close-icon" @click="showNavigator = !showNavigator"></i>
            <div class="display-area"  @mousedown="mousedown"  :style="{
                 height:containerSize.height+'px',
                width:containerSize.width+'px',
                top:containerPosition.top+'px',
                left:containerPosition.left+'px',
                        
            }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, nextTick, reactive, onBeforeUnmount } from "vue";
import ViewContainer from "../../common/viewContainer";

export default defineComponent({
    setup() {
        const showNavigator = ref(false);
        const container: ViewContainer = inject<ViewContainer>("container") as ViewContainer;
        const containerSize = reactive({
            width: 0,
            height: 0
        })
        const containerPosition = reactive({
            left: 0,
            top: 0
        })
        const mousedown = (event: MouseEvent) => {
            let oriClientX = event.clientX;
            let oriClientY = event.clientY;
            let oriLeft = containerPosition.left;
            let oriTop = containerPosition.top;
            let edit = container.edit
            let rate = 200 / edit.width
            let maxScroll = container.maxScroll
            let maxScrollLeft = maxScroll.scrollLeft*rate
            let maxScrollTop = maxScroll.scrollTop*rate
            window.onmousemove = (event: MouseEvent) => {
                let newLeft = event.clientX - oriClientX + oriLeft
                let newTop = event.clientY - oriClientY + oriTop
                newLeft =newLeft>0?newLeft:0
                newTop = newTop>0?newTop:0
                containerPosition.left =newLeft>maxScrollLeft?maxScrollLeft:newLeft
                containerPosition.top = newTop>maxScrollTop?maxScrollTop:newTop
                container.setConstainerScroll(newLeft/rate,newTop/rate)
                container.renderScroll()
            };
            window.onmouseup = () => {
                window.onmousemove = null;
                window.onmouseup = null;
               
            };
        };
        
        const getDisplay = () => {
            let edit = container.edit
            let containerInfo = container.constainer
            let rate = 200 / edit.width

            return {
                width: containerInfo.width * rate,
                height: containerInfo.height * rate,
                left:containerInfo.scrollLeft * rate,
                top:containerInfo.scrollTop * rate,
            }
        }
        const render = () => {
           
            let display = getDisplay()
            containerSize.height = display.height
            containerSize.width = display.width
            containerPosition.left = display.left
            containerPosition.top = display.top
        }
        const init = () => {
            nextTick(() => {
                render()
            })
            container.setRender(render)

        }
        init()
        onBeforeUnmount(()=>{
            container.offRender(render)
        })
        return { showNavigator, containerSize,containerPosition ,mousedown};
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
        }
    }
}
</style>
