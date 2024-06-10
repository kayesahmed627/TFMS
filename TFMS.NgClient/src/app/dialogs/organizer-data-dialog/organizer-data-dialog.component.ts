import { Component, Inject, ViewChild } from '@angular/core';
import { Fair } from '../../models/fair';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FairDialogData } from '../../models/dialog-data/fair-dialog-data';
import { OrganizerService } from '../../services/organizer.service';

@Component({
  selector: 'app-organizer-data-dialog',
  templateUrl: './organizer-data-dialog.component.html',
  styleUrl: './organizer-data-dialog.component.css'
})
export class OrganizerDataDialogComponent {
fairs:Fair[]=[];
dataSource: MatTableDataSource<Fair> = new MatTableDataSource(this.fairs);
columns = ['fairName',  'startDate','endDate','location', 'registrationDeadLine'];
@ViewChild(MatSort, { static: false }) sort!: MatSort;

constructor(
  @Inject(MAT_DIALOG_DATA) public data:FairDialogData,
  private organizerService:OrganizerService
){}

ngOnInit(): void {
  this.organizerService.getFairs(<number>this.data.organizerId)
  .subscribe({
    next:r=>{
      this.fairs=r;
      console.log(this.fairs);
      this.dataSource.data=this.fairs;
      this.dataSource.sort=this.sort;
    },
    error:err=> console.log(err.message|err)
  })
}




}
