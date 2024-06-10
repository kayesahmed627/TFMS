import { Gender } from "../shared/app-constants";
import { Attendence } from "./attendence";

export interface StaffDetail {
    staffDetailId?:number;
    staffName?:string;
    email?:string;
    phone?:string;
    gender?:Gender;
    picture?:string;
    attendenceId?:number;
    attendences?:Attendence[];
}
