import { PavilionType } from "../shared/app-constants";
import { Pavilion } from "./pavilion";

export interface PavilionCategory {
    pavilionCategoryId?: number;
    categoryName?: string;
    pavilionType?: PavilionType;
    description?:string;
    farePerSquareFeet?: number;
    pavilions?:Pavilion[];
}
