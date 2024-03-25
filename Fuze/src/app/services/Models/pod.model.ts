import { IKubeInfo } from "./kube-info.interface";

export class Pod implements IKubeInfo {
    constructor(
        public id: string,
        public name: string,
        public namespace: string,
        public status: string,
        public selectors: string[]
    ) { }
}