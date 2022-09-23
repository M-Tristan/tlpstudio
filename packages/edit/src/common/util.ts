import { position } from "../type";

const backWidth = 40
const minBackHeight = 100
const getBecurve = (startPosition: position, endPosition: position) => {
    if(endPosition.top < startPosition.top){
        const halfLeft = ( endPosition.left-startPosition.left) / 2;
        return `M${0} ${startPosition.top - endPosition.top}
         C${halfLeft} ${startPosition.top - endPosition.top}
          ${halfLeft} ${0} 
          ${endPosition.left-startPosition.left} ${0}`;
    }else{
        const halfLeft = ( endPosition.left-startPosition.left) / 2;
        return `M${0} ${0} 
        C${halfLeft} ${0} 
        ${halfLeft} ${endPosition.top-startPosition.top} 
        ${endPosition.left-startPosition.left} ${endPosition.top-startPosition.top}`;
    }
   
}

const getBackCurve = (startPosition: position, endPosition: position) => {
    const height = Math.abs(endPosition.top - startPosition.top)
    if(endPosition.top < startPosition.top){
        return `M${startPosition.left-endPosition.left+backWidth} ${height} 
        L${startPosition.left-endPosition.left+80} ${height} 
        L${startPosition.left-endPosition.left+80} ${minBackHeight} 
        L${0} ${minBackHeight} 
        L${0} ${0} 
        L${backWidth} ${0} 
        `
    }else{
        return `M${startPosition.left-endPosition.left+backWidth} ${0} 
        L${startPosition.left-endPosition.left+80} ${0} 
        L${startPosition.left-endPosition.left+80} ${minBackHeight} 
        L${0} ${minBackHeight} 
        L${0} ${height} 
        L${backWidth} ${height} 
        `
    }
   
}

const getLine = (startPosition: position, endPosition: position) => {
    if ((startPosition.left + backWidth) > endPosition.left ) {
        return getBackCurve(startPosition, endPosition).replace(/\n/g,' ')
    } else {
        return getBecurve(startPosition, endPosition).replace(/\n/g,' ')
    }


}

const getSize = (startPosition: position, endPosition: position) => {
    if ((startPosition.left + backWidth) > endPosition.left) {

        const width = (startPosition.left + backWidth) - (endPosition.left - backWidth)
        let height = Math.abs(endPosition.top - startPosition.top)
        if (height < minBackHeight) {
            height = minBackHeight
        }
        return {
            width,
            height
        }
    } else {
        const width = endPosition.left - startPosition.left;
        const height = Math.abs(endPosition.top - startPosition.top);
        return {
            width: width,
            height: height > 2 ? height : 2,
        };
    }

}

const getPosition = (startPosition: position, endPosition: position) => {
    if ((startPosition.left + backWidth) > endPosition.left) {
        return {
            left: endPosition.left-backWidth,
            top: endPosition.top > startPosition.top ? startPosition.top : endPosition.top,
        }
    } else {
        return {
            left: endPosition.left > startPosition.left ? startPosition.left : endPosition.left,
            top: endPosition.top > startPosition.top ? startPosition.top : endPosition.top,
        }
    }
}

export { getLine, getSize, getPosition,getBecurve }

export default { getLine, getSize, getPosition,getBecurve }