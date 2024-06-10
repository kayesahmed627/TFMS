import { Component, OnInit, ViewChild } from '@angular/core';
import { ExhibitorPass } from '../../../models/exhibitor-pass';
import { ExhibitorEntryExit } from '../../../models/exhibitor-entry-exit';
import { MatTableDataSource } from '@angular/material/table';
import { ExhibitorPassService } from '../../../services/exhibitor-pass.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../../../services/common/notify.service';
import { ComfirmDialogComponent } from '../../../dialogs/comfirm-dialog/comfirm-dialog.component';
import { Exhibitor } from '../../../models/exhibitor';
import { EntryExitDataDialogComponent } from '../../../dialogs/entry-exit/entry-exit-data-dialog/entry-exit-data-dialog.component';

@Component({
  selector: 'app-pass-list',
  templateUrl: './pass-list.component.html',
  styleUrl: './pass-list.component.css'
})
export class PassListComponent implements OnInit{
  exhibitorPasses: ExhibitorPass[] = [];
  exhibitors: Exhibitor[] = [];

  clickexhibitorPassId: number | undefined = undefined;
  dataSource: MatTableDataSource<ExhibitorPass> = new MatTableDataSource(
    this.exhibitorPasses
  );
  columns = [
    'exhibitorId',
    'personName',
    'validFrom',
    'validUntil',
   
    'exhibitorEntryExits',
    'action'
  ];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(
    private exhibitorPassService: ExhibitorPassService,
    private dialogRef: MatDialog,
    private notifyService: NotifyService
  ) { }
 
  ///----->
  delete(item: ExhibitorPass) {
    this.dialogRef.open(ComfirmDialogComponent, {
      width: "400px"
    }).afterClosed()
      .subscribe(result => {
        if (result) {
          this.exhibitorPassService.delete(<number>item.exhibitorPassId)
            .subscribe({
              next: r => {
                this.dataSource.data = this.dataSource.data.filter(x => x.exhibitorPassId != item.exhibitorPassId);
                this.notifyService.notify("Data is deleted", "Dismiss");
              },
              error: err => {
                this.notifyService.notify("Failed to delete", "Dismiss");
              }
            })
        }
      });
  }
  getCompanyName(id: number) {
    var u = this.exhibitors.find((x) => x.exhibitorId == id);
    if (u) 
      {        
        console.log(u.companyName);
        return u.companyName;
      }
    else return '';

  }
  entryExitClick(id: number, name: string) {
    if (!this.clickexhibitorPassId) this.clickexhibitorPassId = id;
    console.log(this.clickexhibitorPassId);
    this.dialogRef
      .open(EntryExitDataDialogComponent, {
        data: {
          exhibitorPassId: this.clickexhibitorPassId,
          personName: name,
        },
        width: '450px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.clickexhibitorPassId = undefined;
      });
  }
  ngOnInit(): void {
    this.exhibitorPassService.get().subscribe({
      next: (r) => {
        this.exhibitorPasses = r;
        console.log(this.exhibitorPasses);
        this.dataSource.data = this.exhibitorPasses;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err.message | err);
      },
    });
    this.exhibitorPassService.getExhibitor().subscribe({
      next: (r) => {
        this.exhibitors = r;
        console.log(this.exhibitors)
      },
      error: (err) => {
        console.log(err.message | err);
      },
    });
  }
}
