import { position } from "../type";

const backWidth = 40;
const minBackHeight = 100;
const borderWidth = 20;
const getBecurve = (startPosition: position, endPosition: position) => {
    if (endPosition.top < startPosition.top) {
        const halfLeft = (endPosition.left - startPosition.left) / 2;
        return `M${0 + borderWidth} ${
            startPosition.top - endPosition.top + borderWidth
        }
         C${halfLeft + borderWidth} ${
            startPosition.top - endPosition.top + borderWidth
        }
          ${halfLeft + borderWidth} ${0 + borderWidth} 
          ${endPosition.left - startPosition.left + borderWidth} ${
            0 + borderWidth
        }`;
    } else {
        const halfLeft = (endPosition.left - startPosition.left) / 2;
        return `M${0 + borderWidth} ${0 + borderWidth} 
        C${halfLeft + borderWidth} ${0 + borderWidth} 
        ${halfLeft + borderWidth} ${
            endPosition.top - startPosition.top + borderWidth
        } 
        ${endPosition.left - startPosition.left + borderWidth} ${
            endPosition.top - startPosition.top + borderWidth
        }`;
    }
};

const getBackCurve = (startPosition: position, endPosition: position) => {
    const height = Math.abs(endPosition.top - startPosition.top);
    if (endPosition.top < startPosition.top) {
        return `M${
            startPosition.left - endPosition.left + backWidth + borderWidth
        } ${height + borderWidth} 
        L${startPosition.left - endPosition.left + 80 + borderWidth} ${
            height + borderWidth
        } 
        L${startPosition.left - endPosition.left + 80 + borderWidth} ${
            minBackHeight + borderWidth
        } 
        L${0 + borderWidth} ${minBackHeight + borderWidth} 
        L${0 + borderWidth} ${0 + borderWidth} 
        L${backWidth + borderWidth} ${0 + borderWidth} 
        `;
    } else {
        return `M${
            startPosition.left - endPosition.left + backWidth + borderWidth
        } ${0 + borderWidth} 
        L${startPosition.left - endPosition.left + 80 + borderWidth} ${
            0 + borderWidth
        } 
        L${startPosition.left - endPosition.left + 80 + borderWidth} ${
            minBackHeight + borderWidth
        } 
        L${0 + borderWidth} ${minBackHeight + borderWidth} 
        L${0 + borderWidth} ${height + borderWidth} 
        L${backWidth + borderWidth} ${height + borderWidth} 
        `;
    }
};

const getLine = (startPosition: position, endPosition: position) => {
    if (startPosition.left + backWidth > endPosition.left) {
        return getBackCurve(startPosition, endPosition).replace(/\n/g, " ");
    } else {
        return getBecurve(startPosition, endPosition).replace(/\n/g, " ");
    }
};

const getSize = (startPosition: position, endPosition: position) => {
    let size = {
        width: 0,
        height: 0,
    };
    if (startPosition.left + backWidth > endPosition.left) {
        const width =
            startPosition.left + backWidth - (endPosition.left - backWidth);
        let height = Math.abs(endPosition.top - startPosition.top);
        if (height < minBackHeight) {
            height = minBackHeight;
        }
        size = {
            width,
            height,
        };
    } else {
        const width = endPosition.left - startPosition.left;
        const height = Math.abs(endPosition.top - startPosition.top);
        size = {
            width: width,
            height: height,
        };
    }
    return {
        width: size.width + borderWidth * 2,
        height: size.height + borderWidth * 2,
    };
};

const getPosition = (startPosition: position, endPosition: position) => {
    let position = {
        left: 0,
        top: 0,
    };
    if (startPosition.left + backWidth > endPosition.left) {
        position = {
            left: endPosition.left - backWidth,
            top:
                endPosition.top > startPosition.top
                    ? startPosition.top
                    : endPosition.top,
        };
    } else {
        position = {
            left:
                endPosition.left > startPosition.left
                    ? startPosition.left
                    : endPosition.left,
            top:
                endPosition.top > startPosition.top
                    ? startPosition.top
                    : endPosition.top,
        };
    }
    return {
        left: position.left - borderWidth,
        top: position.top - borderWidth,
    };
};

export { getLine, getSize, getPosition, getBecurve };

export default { getLine, getSize, getPosition, getBecurve };
