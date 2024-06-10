import { Visitor } from "./visitor";

export interface EventReg {
    eventRegId?:number;
  eventId?:number;
  events?:Event;
  visitorId?:number;
  visitor?:Visitor;
}
