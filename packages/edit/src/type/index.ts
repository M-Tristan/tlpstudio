export interface position {
    left: number;
    top: number;
}
export interface size {
    width: number;
    height: number;
}

interface linkinfo {
    id: string;
    active: boolean;
    socketIndex?: number;
    plugIndex?: number;
}
export interface node {
    id: string;
    position: position;
    size: size;
    socketNum?: number;
    plugNum?: number;
    [key: string]: any;
    links?: Array<linkinfo>;
}
