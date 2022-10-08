abstract class path {
    abstract toPath(): string;
}
class M extends path {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
    toPath(): string {
        return `M${this.x} ${this.y}`;
    }
}
class L extends path {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
    setY(y: number) {
        this.y = y;
    }
    toPath(): string {
        return `L${this.x} ${this.y}`;
    }
}
class A extends path {
    rx: number;
    ry: number;
    xAxisRotation: number;
    largeArcFlag: number;
    sweepFlag: number;
    x: number;
    y: number;
    constructor(
        rx: number,
        ry: number,
        xAxisRotation: number,
        largeArcFlag: number,
        sweepFlag: number,
        x: number,
        y: number
    ) {
        super();
        this.rx = rx;
        this.ry = ry;
        this.xAxisRotation = xAxisRotation;
        this.largeArcFlag = largeArcFlag;
        this.sweepFlag = sweepFlag;
        this.x = x;
        this.y = y;
    }
    setSweepFlag(sweepFlag: number) {
        this.sweepFlag = sweepFlag;
    }
    setY(y: number) {
        this.y = y;
    }
    setX(x: number) {
        this.x = x;
    }
    toPath(): string {
        return `A${this.rx} ${this.ry} ${this.xAxisRotation} ${this.largeArcFlag} ${this.sweepFlag} ${this.x} ${this.y}`;
    }
}
class SVGPath {
    pathList: Array<path> = [];
    static M(x: number, y: number) {
        return new M(x, y);
    }
    static L(x: number, y: number) {
        return new L(x, y);
    }
    static A(
        rx: number,
        ry: number,
        xAxisRotation: number,
        largeArcFlag: number,
        sweepFlag: number,
        x: number,
        y: number
    ) {
        return new A(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y);
    }
    addPath(path: path) {
        this.pathList.push(path);
    }
    toPath(): string {
        let res = "";
        this.pathList.forEach((item: path) => {
            res = res + item.toPath();
        });
        return res;
    }
}

export default SVGPath;
