export class Pod {
    constructor(
      public name: string,
      public namespace: string,
      public status: string,
      public selectors: string[]
    ) { }
}