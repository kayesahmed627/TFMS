import { BookingStatus } from "../shared/app-constants";
import { Exhibitor } from "./exhibitor";
import { Fair } from "./fair";
import { Pavilion } from "./pavilion";

export interface Booking {
    bookingId?:number;
    bookingDate?:Date|string;
    numberOfPavilion?:number;
    bookingAmount?:number;
    bookingStatus?:BookingStatus;
    fairId?:number;
    exhibitorId?:number;
    pavilionId?:number;
    fair?:Fair;
    exhibitor?:Exhibitor;
    pavilion?:Pavilion
}
