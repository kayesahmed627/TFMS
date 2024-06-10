import { Time } from "@angular/common";
import { Venue } from "./venue";
import { EventReg } from "./event-reg";

export interface Events {
    eventId?:number;
    eventName?:string;
    eventDescription?:string;
    eventDate?:Date|string;
    startTime?:Time|string;
    endTime?:Time|string;
    speakerName?:string;
    speakerDetails?:string;
    venueId?:number;
    venue?:Venue;
    eventReg?:EventReg[];
}
