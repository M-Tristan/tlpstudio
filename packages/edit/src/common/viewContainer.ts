/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventBus } from "eventBus";

class ViewContainer {
    event: EventBus;

    edit = {
        width: 5000,
        height: 5000,
    };
   
    constainer = {
        width: 0,
        height: 0,
        scrollLeft: 0,
        scrollTop: 0,
    };
    get maxScroll(){
        return{
            scrollLeft:5000-this.constainer.width,
            scrollTop:5000-this.constainer.height
        }
    }
    constructor() {
        this.event = new EventBus();
    }
    setConstainerSize(width: number, height: number) {
        this.constainer.height = height;
        this.constainer.width = width;
    }
    setConstainerScroll(scrollLeft: number, scrollTop: number) {
        this.constainer.scrollLeft = scrollLeft;
        this.constainer.scrollTop = scrollTop;
    }
    setRender(func:Function){
        this.event.on("render",func)
    }
    offRender(func:Function){
        this.event.off("render",func)
    }
    setScroll(func:Function){
        this.event.on("scroll",func)
    }
    offScroll(func:Function){
        this.event.off("scroll",func)
    }
    renderScroll(){
        this.event.emit("scroll")
    }
    render(){
        this.event.emit("render")
    }
}
export default ViewContainer;
