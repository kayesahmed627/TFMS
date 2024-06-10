import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { Organizer } from '../../../models/organizer';
import { OrganizerService } from '../../../services/organizer.service';
import { NotifyService } from '../../../services/common/notify.service';
import { OrganizerDataDialogComponent } from '../../../dialogs/organizer-data-dialog/organizer-data-dialog.component';
import { ComfirmDialogComponent } from '../../../dialogs/comfirm-dialog/comfirm-dialog.component';


@Component({
  selector: 'app-organizer-list',
  templateUrl: './organizer-list.component.html',
  styleUrl: './organizer-list.component.css'
})
export class OrganizerListComponent implements OnInit{
  
  
  organizers:Organizer[]=[];
  clickedOrganizerId:number | undefined = undefined;
  
  dataSource:MatTableDataSource<Organizer> = new MatTableDataSource(this.organizers)
  columns = ['organizerName','organizerEmail', 'organizerPhone' , 'webSiteUrl', 'sortDescription', 'fair', 'action'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private organizerService:OrganizerService,
    private dialogRef:MatDialog,
    private notifyService:NotifyService
  ){}


  organizerClick(id:number, name:string){
    if(!this.clickedOrganizerId)
      this.clickedOrganizerId = id;
    console.log(this.clickedOrganizerId);
    this.dialogRef.open(OrganizerDataDialogComponent,{
      data: {
        organizerId:this.clickedOrganizerId,
        organizerName:name
      },
      width: '75%'
    }).afterClosed().subscribe(result=>{
      this.clickedOrganizerId=undefined;
    });
  }


  ngOnInit(): void {
    this.organizerService.getWithFairs()
    .subscribe({
      next: r=>{
        this.organizers = r;
        //console.log(this.organizers)
        this.dataSource.data = this.organizers;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        console.log(err.message|err);
      }
      });
  }
//Delete
delete(item:Organizer){
  this.dialogRef.open(ComfirmDialogComponent, {
    width:"400px"
  }).afterClosed()
  .subscribe(result=>{
    if(result){
      this.organizerService.delete(<number>item.organizerId)
      .subscribe({
        next:r=>{
            this.dataSource.data = this.dataSource.data.filter(x=> x.organizerId!= item.organizerId);
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
