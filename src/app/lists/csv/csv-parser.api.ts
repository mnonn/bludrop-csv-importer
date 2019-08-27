export interface TableData {
    headers: string[];
    rows: Object[];
}

export class SortHelper {
    constructor(public header: string, public sortType = SortType.ASC) {}
}

export enum SortType {
    ASC,
    DSC
}
