import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffDetail } from '../../../models/staff-detail';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AttendenceService } from '../../../services/attendence.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../../../services/common/notify.service';
import { Gender, apiUrl } from '../../../shared/app-constants';
import { AttendenceDataDialogComponent } from '../../../dialogs/attendence-data-dialog/attendence-data-dialog.component';
import { ComfirmDialogComponent } from '../../../dialogs/comfirm-dialog/comfirm-dialog.component';

@Component({
  selector: 'app-staff-detail-list',
  templateUrl: './staff-detail-list.component.html',
  styleUrl: './staff-detail-list.component.css'
})
export class StaffDetailListComponent implements OnInit {
  imagePath = apiUrl + '/Pictures';
  staffDetails:StaffDetail[]=[];
  clickedStaffDetailId:number | undefined = undefined;
  
  dataSource:MatTableDataSource<StaffDetail> = new MatTableDataSource(this.staffDetails)
  columns = ['picture','staffName', 'email' , 'phone', 'gender', 'attendence', 'action'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private attendenceService:AttendenceService,
    private dialogRef:MatDialog,
    private notifyService:NotifyService
  ){}

  getGender(value:number){
    return Gender[value];
  }

  detailClick(id:number, name:string){
    if(!this.clickedStaffDetailId)
      this.clickedStaffDetailId = id;
    console.log(this.clickedStaffDetailId);
    this.dialogRef.open(AttendenceDataDialogComponent,{
      data: {
        staffDetailId:this.clickedStaffDetailId,
        staffName:name
      },
      width: '75%'
    }).afterClosed().subscribe(result=>{
      this.clickedStaffDetailId=undefined;
    });
  }


  ngOnInit(): void {
    this.attendenceService.getWithAttendences()
    .subscribe({
      next: r=>{
        this.staffDetails = r;
        console.log(this.staffDetails)
        this.dataSource.data = this.staffDetails;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        console.log(err.message|err);
      }
      });
  }
//Delete
delete(item:StaffDetail){
  this.dialogRef.open(ComfirmDialogComponent, {
    width:"400px"
  }).afterClosed()
  .subscribe(result=>{
    if(result){
      this.attendenceService.delete(<number>item.staffDetailId)
      .subscribe({
        next:r=>{
            this.dataSource.data = this.dataSource.data.filter(x=> x.staffDetailId!= item.staffDetailId);
            this.notifyService.notify("Pailion is deleted", "Dismiss");
          },
        error:err=>{
          this.notifyService.notify("Failed to delete data", "Dismiss");
        }
      })
    }
  });
}


}
