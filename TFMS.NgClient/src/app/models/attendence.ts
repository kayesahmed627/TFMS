import { Time } from "@angular/common";
import { StaffDetail } from "./staff-detail";

export interface Attendence {
    attendenceId?:number;
    attendenceDate?:Date|string;
    startTime?:Time|string;
    endTime?:Time|string;
    staffDetailId?:number;
    staffDetails?:StaffDetail;
}
