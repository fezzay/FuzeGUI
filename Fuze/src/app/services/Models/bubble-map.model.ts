import { Link } from "./link.model";
import { NodePoint } from "./node.model";

export class BubbleMap {
    constructor(
      public nodes: NodePoint[],
      public links: Link[]
    ) { }
}