import { position } from "../type";
import SVGPath from "./svgPath";

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
    const radius = 5;
    if (endPosition.top < startPosition.top) {
        let firstCircle = 1;
        if (minBackHeight > height) {
            firstCircle = -1;
        } else if (minBackHeight === height) {
            firstCircle = 0;
        }
        const path = new SVGPath();
        const m = SVGPath.M(
            startPosition.left - endPosition.left + backWidth + borderWidth,
            height + borderWidth
        );

        const l = SVGPath.L(
            startPosition.left -
                endPosition.left +
                80 +
                borderWidth -
                radius * Math.abs(firstCircle),
            height + borderWidth
        );

        const a = SVGPath.A(
            radius,
            radius,
            0,
            0,
            0,
            startPosition.left - endPosition.left + 80 + borderWidth,
            height + borderWidth - radius * firstCircle
        );
        if (firstCircle != 1) {
            a.setSweepFlag(1);
        }

        const l2 = SVGPath.L(
            startPosition.left - endPosition.left + 80 + borderWidth,
            minBackHeight + borderWidth
        );

        const a2 = SVGPath.A(
            radius,
            radius,
            0,
            0,
            0,
            startPosition.left - endPosition.left + 80 + borderWidth - radius,
            minBackHeight + borderWidth
        );
        if (firstCircle != 1) {
            a2.setSweepFlag(1);
        }

        const l3 = SVGPath.L(
            0 + borderWidth + radius,
            minBackHeight + borderWidth
        );

        const a3 = SVGPath.A(
            radius,
            radius,
            0,
            0,
            1,
            borderWidth,
            minBackHeight + borderWidth - radius
        );

        const l4 = SVGPath.L(0 + borderWidth, 0 + borderWidth + radius);

        const a4 = SVGPath.A(
            radius,
            radius,
            0,
            0,
            1,
            0 + borderWidth + radius,
            borderWidth
        );

        const l5 = SVGPath.L(backWidth + borderWidth, 0 + borderWidth);
        path.addPath(m);
        path.addPath(l);
        path.addPath(a);
        path.addPath(l2);
        if (minBackHeight !== height) {
            l2.setY(minBackHeight + borderWidth + radius * firstCircle);
            path.addPath(a2);
        }
        path.addPath(l3);
        path.addPath(a3);
        path.addPath(l4);
        path.addPath(a4);
        path.addPath(l5);
        return path.toPath();
    } else {
        const path = new SVGPath();
        const m = SVGPath.M(
            startPosition.left - endPosition.left + backWidth + borderWidth,
            0 + borderWidth
        );

        const l = SVGPath.L(
            startPosition.left - endPosition.left + 80 + borderWidth-radius,
            0 + borderWidth
        );
        const a = SVGPath.A(
            radius,
            radius,
            0,
            0,
            1,
            startPosition.left - endPosition.left + 80 + borderWidth,
            0 + borderWidth+radius
        );
        const l2 = SVGPath.L(
            startPosition.left - endPosition.left + 80 + borderWidth,
            minBackHeight + borderWidth-radius
        );
        const a2 = SVGPath.A(
            radius,
            radius,
            0,
            0,
            1,
            startPosition.left - endPosition.left + 80 + borderWidth-radius,
            minBackHeight + borderWidth
        );
        const l3 = SVGPath.L(0 + borderWidth+radius, minBackHeight + borderWidth);
        const a3 = SVGPath.A(
            radius,
            radius,
            0,
            0,
            0,
            0 + borderWidth,
            minBackHeight + borderWidth+radius
        );
        if(minBackHeight>height){
            a3.setSweepFlag(1)
            a3.setY( minBackHeight + borderWidth-radius)
        }
        const l4 = SVGPath.L(0 + borderWidth, height + borderWidth-radius);
        const a4 = SVGPath.A(
            radius,
            radius,
            0,
            0,
            0,
            0 + borderWidth+radius,
            height + borderWidth
        );
        if(minBackHeight>height){
            l4.setY(height + borderWidth+radius)
            a4.setSweepFlag(1)
            a4.setX(   borderWidth+radius)
        }
        const l5 = SVGPath.L(backWidth + borderWidth, height + borderWidth);
        path.addPath(m);
        path.addPath(l);
        path.addPath(a);
        path.addPath(l2);
        path.addPath(a2);
        path.addPath(l3);
        if(minBackHeight !==height){
            path.addPath(a3);
        }
      
        path.addPath(l4);
        if(minBackHeight !==height){
            path.addPath(a4);
        }else{
            l4.setY(height + borderWidth)
        }
      
        path.addPath(l5);

        return path.toPath();
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
