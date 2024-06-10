import { Organizer } from "./organizer";

export interface Fair {
    fairId?:number;
    fairName?:String;
    startDate?:Date|string;
    endDate?:Date|string;
    location?:string;
    registrationDeadLine?:Date|string;
    organizerId?:number;
    organizer?: Organizer;
}
