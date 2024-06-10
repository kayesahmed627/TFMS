import { PavilionCategory } from "./pavilion-category";

export interface Pavilion {
    pavilionId?:number;
    pavilionName?:String;
    pavilionNumber?:string;
    size?:string;
    sqFoot?:number;    
    rent?:number;   
    pavilionCategoryId?:number;
    pavilionCategory?:PavilionCategory;
}
