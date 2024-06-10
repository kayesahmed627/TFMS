import { FormGroup, FormControl } from "@angular/forms";

export interface Sponsor {
    sponsorId?: number;
    companyName?: string;
    phone?: string;
    email?:string;
    industry?: string;
    city?:string;
    website?:string;
}
