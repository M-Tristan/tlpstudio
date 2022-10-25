import { CSSProperties } from "vue";

export interface nodeConfig {
    type: string;
    name: string;
    editName: string;
    socketNum: number;
    plugNum: number;
    param: { [key: string]: any };
    style?: CSSProperties;
}
