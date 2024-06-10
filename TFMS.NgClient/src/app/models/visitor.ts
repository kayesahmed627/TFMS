import { Gender } from "../shared/app-constants";
import { EventReg } from "./event-reg";

export interface Visitor {
    visitorId?:number;
    firstName?:String;
    lastName?:string;
    email?:string;
    phone?:string;
    gender?:Gender;    
    nationality?:string;   
    eventRegr?:EventReg;
}
