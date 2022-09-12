export interface position {
    left: number;
    top: number;
}
export interface size {
    width: number;
    height: number;
}

export interface node {
    id: string
    position: position,
    size: size,
    [key: string]: any
}