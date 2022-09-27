/* eslint-disable @typescript-eslint/ban-types */
class Hotkeys {
    keyEvents: Array<Function> = [];
    selectDom=false;
    dom?:HTMLElement
    constructor(dom?: HTMLElement) {
             this.dom = dom
             if(this.dom){
                this.dom.addEventListener("click",(event:MouseEvent)=>{
                    this.selectDom=true
                    event.stopPropagation()
                })
                this.dom.addEventListener('mouseenter',(event:MouseEvent)=>{
                  
                    this.selectDom=true
                    event.stopPropagation()
                })
                this.dom.addEventListener("mouseleave",(event:MouseEvent)=>{
                  
                    this.selectDom=false
                    event.stopPropagation()
                })
             }
            document.addEventListener('click',()=>{
                this.selectDom = false
            })
            document.addEventListener("keydown", (event: KeyboardEvent) => {
              
                if(this.dom){
                    if(this.selectDom){
                        this.triggerKeyEvent(event);
                        event.preventDefault()
                    }
                }else{
                    this.triggerKeyEvent(event);
                    event.preventDefault()
                }
             
            });
       
       
    }
    triggerKeyEvent(event: KeyboardEvent) {
        this.keyEvents.forEach(func => {
            func(event);
        });
    }
    addKeyEvent(func: Function) {
        this.keyEvents.push(func);
    }
    offKeyEvent(func: Function) {
        this.keyEvents = this.keyEvents.filter(keyEvent => {
            return keyEvent != func;
        });
    }
    destroyed() {
        window.removeEventListener("keydown", this.triggerKeyEvent);
        this.keyEvents = [];
    }
}

export default Hotkeys;
