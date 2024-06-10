import { Exhibitor } from "./exhibitor";
import { ExhibitorEntryExit } from "./exhibitor-entry-exit";

export interface ExhibitorPass {
    exhibitorPassId?:number;
    personName?:string;
    validFrom?:Date|string;
    validUntil?:Date|string;
   
    exhibitorId?:number
    exhibitor?:Exhibitor;
    exhibitorEntryExits?:ExhibitorEntryExit[];
}
