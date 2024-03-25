import { IKubeInfo } from "./kube-info.interface";

export class Deployment implements IKubeInfo {
    constructor(
        public id: string,
        public name: string,
        public namespace: string,
        public selectors: string[]
    ) { }
}