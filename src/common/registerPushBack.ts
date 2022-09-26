import EditStore from "edit/src/common/editStore";

const registerPushBack = (storeUtil:{
    store: EditStore;
    pushHistory(): void;

}) => {

    const pushHistory = () =>{
        storeUtil.pushHistory()
    }
    storeUtil.store.onAddNode(pushHistory)
    storeUtil.store.onNodeMoveEnd(pushHistory)
    storeUtil.store.onDeleteNode(pushHistory)
    storeUtil.store.onAddLine(pushHistory)
    storeUtil.store.onRemoveLine(pushHistory)
    
    return () => {
        storeUtil.store.removeAddNode(pushHistory)
        storeUtil.store.removeNodeMoveEnd(pushHistory)
        storeUtil.store.removeDeleteNode(pushHistory)
        storeUtil.store.removeAddLine(pushHistory)
        storeUtil.store.removeRemoveLine(pushHistory)
    }
}

export default registerPushBack