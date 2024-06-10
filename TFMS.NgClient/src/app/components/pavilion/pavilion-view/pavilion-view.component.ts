import { Component, OnInit, ViewChild } from '@angular/core';
import { PavilionCategory } from '../../../models/pavilion-category';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PavilionService } from '../../../services/pavilion.service';
import { PavilionType } from '../../../shared/app-constants';
import { MatDialog } from '@angular/material/dialog';
import { PavilionDataDialogComponent } from '../../../dialogs/pavilion-data-dialog/pavilion-data-dialog.component';
import { ComfirmDialogComponent } from '../../../dialogs/comfirm-dialog/comfirm-dialog.component';
import { NotifyService } from '../../../services/common/notify.service';

@Component({
  selector: 'app-pavilion-view',
  templateUrl: './pavilion-view.component.html',
  styleUrl: './pavilion-view.component.css'
})
export class PavilionViewComponent implements OnInit{
  pavilionCategories:PavilionCategory[]=[];
  clickedCategoryId:number | undefined = undefined;
  
  dataSource:MatTableDataSource<PavilionCategory> = new MatTableDataSource(this.pavilionCategories)
  columns = ['categoryName', 'pavilionType' , 'description', 'farePerSquareFeet', 'pavilions', 'action'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private pavilionCategoryService:PavilionService,
    private dialogRef:MatDialog,
    private notifyService:NotifyService
  ){}
   //-----------//
   getPavilionType(value:number){
    return PavilionType[value];
  }

  categoryClick(id:number, name:string){
    if(!this.clickedCategoryId)
      this.clickedCategoryId = id;
    console.log(this.clickedCategoryId);
    this.dialogRef.open(PavilionDataDialogComponent,{
      data: {
        pavilionCategoryId:this.clickedCategoryId,
        categoryName:name
      },
      width: '75%'
    }).afterClosed().subscribe(result=>{
      this.clickedCategoryId=undefined;
    });
  }

  ngOnInit(): void {
    this.pavilionCategoryService.get()
    .subscribe({
      next: r=>{
        this.pavilionCategories = r;
        console.log(this.pavilionCategories)
        this.dataSource.data = this.pavilionCategories;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        console.log(err.message|err);
      }
      });
  }

//Delete
delete(item:PavilionCategory){
  this.dialogRef.open(ComfirmDialogComponent, {
    width:"400px"
  }).afterClosed()
  .subscribe(result=>{
    if(result){
      this.pavilionCategoryService.delete(<number>item.pavilionCategoryId)
      .subscribe({
        next:r=>{
            this.dataSource.data = this.dataSource.data.filter(x=> x.pavilionCategoryId!= item.pavilionCategoryId);
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
