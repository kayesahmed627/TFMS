import { Component, OnInit, ViewChild } from '@angular/core';
import { apiUrl } from '../../../shared/app-constants';
import { Exhibitor } from '../../../models/exhibitor';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExhibitorService } from '../../../services/exhibitor.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../../../services/common/notify.service';
import { ComfirmDialogComponent } from '../../../dialogs/comfirm-dialog/comfirm-dialog.component';

@Component({
  selector: 'app-exhibitor-list',
  templateUrl: './exhibitor-list.component.html',
  styleUrl: './exhibitor-list.component.css'
})
export class ExhibitorListComponent implements OnInit{
  imagePath = apiUrl + '/Pictures';
  exhibitors:Exhibitor[]=[];

  dataSource:MatTableDataSource<Exhibitor> = new MatTableDataSource(this.exhibitors)
  columns = ['logoUrl','companyName', 'tradeLicence' , 'contactNumber', 'email', 'website', 'description', 'action'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private exhibiorService:ExhibitorService,
    private dialogRef:MatDialog,
    private notifyService:NotifyService
  ){}
  ngOnInit(): void {
    this.exhibiorService.get()
    .subscribe({
      next: r=>{
        this.exhibitors = r;
        console.log(this.exhibitors)
        this.dataSource.data = this.exhibitors;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        console.log(err.message|err);
      }
      });
  }

    //Delete
delete(item:Exhibitor){
  this.dialogRef.open(ComfirmDialogComponent, {
    width:"400px"
  }).afterClosed()
  .subscribe(result=>{
    if(result){
      this.exhibiorService.delete(<number>item.exhibitorId)
      .subscribe({
        next:r=>{
            this.dataSource.data = this.dataSource.data.filter(x=> x.exhibitorId!= item.exhibitorId);
            this.notifyService.notify("Exhibitor is deleted", "Dismiss");
          },
        error:err=>{
          this.notifyService.notify("Failed to delete data", "Dismiss");
        }
      })
    }
  });
}

}
