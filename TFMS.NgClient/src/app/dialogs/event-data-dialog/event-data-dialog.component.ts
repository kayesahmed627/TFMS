import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EventReg } from '../../models/event-reg';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDialogData } from '../../models/dialog-data/event-dialog-data';
import { EventRegService } from '../../services/event-reg.service';
import { Visitor } from '../../models/visitor';

@Component({
  selector: 'app-event-data-dialog',
  templateUrl: './event-data-dialog.component.html',
  styleUrl: './event-data-dialog.component.css'
})
export class EventDataDialogComponent implements OnInit{
  eventRegs: EventReg[] = [];
  visitor: Visitor[] = [];

  dataSource: MatTableDataSource<EventReg> = new MatTableDataSource(this.eventRegs);
  columns = ['visitorId'];

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EventDialogData,
    private eventregService: EventRegService
  ) { }
  getVistorName(id: number) {
    var u = this.visitor.find((x) => x.visitorId == id);
    if (u) 
      {        
        console.log(u.firstName);
        return u.firstName;
      }
    else return '';

  }
  ngOnInit(): void {
    this.eventregService.getRegistrationOfEvent(<number>this.data.eventId)
      .subscribe({
        next: r => {
          console.log(r)
          this.eventRegs = r;
          console.log(this.eventRegs);
          this.dataSource.data = this.eventRegs;
          this.dataSource.sort = this.sort;
        },
        error: err => console.log(err.message | err)
      });
      this.eventregService.getVisitors().subscribe({
        next: (r) => {
         //this.visitor=r;
          console.log(this.visitor)
        },
        error: (err) => {
          console.log(err.message | err);
        },
      });
  }
}
