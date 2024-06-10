import { Component, Inject, ViewChild } from '@angular/core';
import { Pavilion } from '../../models/pavilion';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PavilionDialogData } from '../../models/dialog-data/pavilion-dialog-data';
import { PavilionService } from '../../services/pavilion.service';

@Component({
  selector: 'app-pavilion-data-dialog',
  templateUrl: './pavilion-data-dialog.component.html',
  styleUrl: './pavilion-data-dialog.component.css'
})
export class PavilionDataDialogComponent {
  pavilions: Pavilion[] = [];
  dataSource: MatTableDataSource<Pavilion> = new MatTableDataSource(this.pavilions);
  columns = ['pavilionName', 'pavilionNumber', 'size', 'sqFoot', 'rent'];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:PavilionDialogData,
    private pavilionService:PavilionService
  ){}
  ngOnInit(): void {
    this.pavilionService.getPavilions(<number>this.data.pavilionCategoryId)
    .subscribe({
      next:r=>{
        this.pavilions=r;
        //console.log(this.pavilions);
        this.dataSource.data=this.pavilions;
        this.dataSource.sort=this.sort;
      },
      error:err=> console.log(err.message|err)
    })
  }
}
