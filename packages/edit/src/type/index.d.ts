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
}
export interface node {
    id: string;
    position: position;
    size: size;
    [key: string]: any;
    links?: Array<linkinfo>;
}
export {};
