import { position } from "../type";
declare const getBecurve: (startPosition: position, endPosition: position) => string;
declare const getLine: (startPosition: position, endPosition: position) => string;
declare const getSize: (startPosition: position, endPosition: position) => {
    width: number;
    height: number;
};
declare const getPosition: (startPosition: position, endPosition: position) => {
    left: number;
    top: number;
};
export { getLine, getSize, getPosition, getBecurve };
declare const _default: {
    getLine: (startPosition: position, endPosition: position) => string;
    getSize: (startPosition: position, endPosition: position) => {
        width: number;
        height: number;
    };
    getPosition: (startPosition: position, endPosition: position) => {
        left: number;
        top: number;
    };
    getBecurve: (startPosition: position, endPosition: position) => string;
};
export default _default;
