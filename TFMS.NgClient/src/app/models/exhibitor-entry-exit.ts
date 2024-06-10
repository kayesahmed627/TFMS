import { Time } from "@angular/common";

export interface ExhibitorEntryExit {
    exhibitorEntryExitId?:number;
    date?:Date|string;
    entryTime?:Time|string;
    exitTime?:Time|string;
    exhibitorPassId?:number;
}
