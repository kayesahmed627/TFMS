import { Fair } from "./fair";

export interface Organizer {
    organizerId?:number;
    organizerName?: string;
    organizerEmail?:string;
    organizerPhone?:string;
    webSiteUrl?: string;
    sortDescription?:string;
    fairId?:number;
    fairs?:Fair[];
}
