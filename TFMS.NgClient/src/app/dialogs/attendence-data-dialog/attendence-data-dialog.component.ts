import { Component, Inject, ViewChild } from '@angular/core';
import { Attendence } from '../../models/attendence';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendenceDialogData } from '../../models/dialog-data/attendence-dialog-data';
import { AttendenceService } from '../../services/attendence.service';

@Component({
  selector: 'app-attendence-data-dialog',
  templateUrl: './attendence-data-dialog.component.html',
  styleUrl: './attendence-data-dialog.component.css'
})
export class AttendenceDataDialogComponent {
attendences:Attendence[]=[];
dataSource: MatTableDataSource<Attendence> = new MatTableDataSource(this.attendences);
columns = ['attendenceDate', 'startTime', 'endTime'];
@ViewChild(MatSort, { static: false }) sort!: MatSort;

constructor(
  @Inject(MAT_DIALOG_DATA) public data:AttendenceDialogData,
  private attendenceService:AttendenceService
){}

ngOnInit(): void {
  this.attendenceService.getAttendences(<number>this.data.staffDetailId)
  .subscribe({
    next:r=>{
      this.attendences=r;
      console.log(this.attendences);
      this.dataSource.data=this.attendences;
      this.dataSource.sort=this.sort;
    },
    error:err=> console.log(err.message|err)
  })
}

}
