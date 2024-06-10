import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ExhibitorEntryExit } from '../../../models/exhibitor-entry-exit';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExhibitorPassDialogData } from '../../../models/dialog-data/exhibitor-pass-dialog-data';
import { ExhibitorPassService } from '../../../services/exhibitor-pass.service';

@Component({
  selector: 'app-entry-exit-data-dialog',
  templateUrl: './entry-exit-data-dialog.component.html',
  styleUrl: './entry-exit-data-dialog.component.css'
})
export class EntryExitDataDialogComponent implements OnInit{
entryExits:ExhibitorEntryExit[]=[];
dataSource: MatTableDataSource<ExhibitorEntryExit> = new MatTableDataSource(this.entryExits);
columns = ['date', 'entryTime', 'exitTime'];
@ViewChild(MatSort, { static: false }) sort!: MatSort;
constructor(
  @Inject(MAT_DIALOG_DATA) public data:ExhibitorPassDialogData,
  private exhibitorPassService:ExhibitorPassService
){}
  ngOnInit(): void {
    this.exhibitorPassService.getEntryExitOfPass(<number>this.data.exhibitorPassId)
 .subscribe({
   next:r=>{
     this.entryExits=r;
     //console.log(this.pavilions);
     this.dataSource.data=this.entryExits;
     this.dataSource.sort=this.sort;
   },
   error:err=> console.log(err.message|err)
 });
  }
}
