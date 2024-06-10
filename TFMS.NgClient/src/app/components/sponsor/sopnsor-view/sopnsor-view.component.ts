import { Component, OnInit, ViewChild } from '@angular/core';
import { Sponsor } from '../../../models/sponsor';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SponsorService } from '../../../services/sponsor.service';
import { NotifyService } from '../../../services/common/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { ComfirmDialogComponent } from '../../../dialogs/comfirm-dialog/comfirm-dialog.component';

@Component({
  selector: 'app-sopnsor-view',
  templateUrl: './sopnsor-view.component.html',
  styleUrl: './sopnsor-view.component.css'
})
export class SopnsorViewComponent implements OnInit{
sponsor:Sponsor[]=[];

dataSource:MatTableDataSource<Sponsor> = new MatTableDataSource(this.sponsor)
columns = ['companyName', 'phone' , 'email', 'industry', 'city', 'website', 'action'];
@ViewChild(MatSort, {static:false}) sort!:MatSort;
@ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

constructor(
  private sponsorService:SponsorService,
  private dialogRef:MatDialog,
  private notifyService:NotifyService
){}
  ngOnInit(): void {
    this.sponsorService.get()
    .subscribe({
      next: r=>{
        this.sponsor = r;
        console.log(this.sponsor)
        this.dataSource.data = this.sponsor;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        console.log(err.message|err);
      }
      });
  }

  //Delete
delete(item:Sponsor){
  this.dialogRef.open(ComfirmDialogComponent, {
    width:"400px"
  }).afterClosed()
  .subscribe(result=>{
    if(result){
      this.sponsorService.delete(<number>item.sponsorId)
      .subscribe({
        next:r=>{
            this.dataSource.data = this.dataSource.data.filter(x=> x.sponsorId!= item.sponsorId);
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
