export interface MergeColumn{
    groupId:number;
    start:number;
    colspan:number;
    title?:string;
    class?:string;
    columns:any[];
    isMerge:boolean;
}