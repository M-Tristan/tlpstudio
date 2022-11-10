/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventBus } from "eventBus";
import { RENDER_EVENT, SCALE_CHANGE_EVENT, SCROLL_EVENT } from "./constants";

class ViewContainer {
    event: EventBus;

    edit = {
        width: 5000,
        height: 5000,
        scale: 1,
    };

    constainer = {
        width: 0,
        height: 0,
        scrollLeft: 0,
        scrollTop: 0,
    };
    get maxScroll() {
        return {
            scrollLeft: 5000 * this.edit.scale - this.constainer.width,
            scrollTop: 5000 * this.edit.scale - this.constainer.height,
        };
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
    setEditScale(scale: number) {
        scale = Math.floor(scale * 100) / 100;
        if (scale > 0.1) {
            this.edit.scale = scale;
        } else {
            this.edit.scale = 0.1;
        }
        const maxScroll = this.maxScroll;
        if (this.constainer.scrollLeft > maxScroll.scrollLeft) {
            this.constainer.scrollLeft = maxScroll.scrollLeft;
        }
        if (this.constainer.scrollTop > maxScroll.scrollTop) {
            this.constainer.scrollTop = maxScroll.scrollTop;
        }
        this.event.emit(SCALE_CHANGE_EVENT);
        this.event.emit(RENDER_EVENT);
        this.renderScroll();
    }
    narrow() {
        if (this.edit.scale <= 1) {
            this.setEditScale(this.edit.scale - 0.1);
        } else {
            this.setEditScale(this.edit.scale - 1);
        }
        this.render();
    }
    enlarge() {
        if (this.edit.scale >= 10) {
            this.edit.scale = 10;
            this.render();
            return;
        }
        if (this.edit.scale < 1) {
            this.setEditScale(this.edit.scale + 0.1);
        } else {
            this.setEditScale(this.edit.scale + 1);
        }
        this.render();
    }
    reduction() {
        this.setEditScale(1);
        this.render();
    }
    onScaleChange(func: Function) {
        this.event.on(SCALE_CHANGE_EVENT, func);
    }
    offScaleChange(func: Function) {
        this.event.off(SCALE_CHANGE_EVENT, func);
    }
    setRender(func: Function) {
        this.event.on(RENDER_EVENT, func);
    }
    offRender(func: Function) {
        this.event.off(RENDER_EVENT, func);
    }
    setScroll(func: Function) {
        this.event.on(SCROLL_EVENT, func);
    }
    offScroll(func: Function) {
        this.event.off(SCROLL_EVENT, func);
    }
    renderScroll() {
        this.event.emit(SCROLL_EVENT);
    }
    render() {
        this.event.emit(RENDER_EVENT);
    }
}
export default ViewContainer;
