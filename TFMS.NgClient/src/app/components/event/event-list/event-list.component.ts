import { Component, OnInit, ViewChild } from '@angular/core';
import { Venue } from '../../../models/venue';
import { Events } from '../../../models/events';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EventRegService } from '../../../services/event-reg.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../../../services/common/notify.service';
import { ComfirmDialogComponent } from '../../../dialogs/comfirm-dialog/comfirm-dialog.component';
import { EventDataDialogComponent } from '../../../dialogs/event-data-dialog/event-data-dialog.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  venue:Venue[]=[];
  event:Events[]=[];
  // eventreg:EventsReg[]=[];
  // visitor:Visitor[]=[];
  
  clickeventId: number | undefined = undefined;
  dataSource: MatTableDataSource<Events> = new MatTableDataSource(
    this.event
  );
  columns = [
    'venueId',
    'eventName',
    'eventDescription',
    'eventDate',
    'startTime',
    'endTime',
    'speakerName',
    'speakerDetails',
    'eventsReg',
    'action'
  ];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(
    private eventsregService: EventRegService,
    private dialogRef: MatDialog,
    private notifyService: NotifyService
  ) { }
  
    ///----->
    delete(item: Events) {
      this.dialogRef.open(ComfirmDialogComponent, {
        width: "400px"
      }).afterClosed()
        .subscribe(result => {
          if (result) {
            this.eventsregService.delete(<number>item.eventId)
              .subscribe({
                next: r => {
                  this.dataSource.data = this.dataSource.data.filter(x =>x.eventId != item.eventId);
                  this.notifyService.notify("Data is deleted", "Dismiss");
                },
                error: err => {
                  this.notifyService.notify("Failed to delete", "Dismiss");
                }
              })
          }
        });
    }
  
    getVenueName(id: number) {
      var u = this.venue.find((x) => x.venueId == id);
      if (u) 
        {        
          // console.log(u.venueName);
          return u.venueName;
        }
      else return '';
  
    }
  
    eventregClick(id: number, name: string) {
      if (!this.clickeventId) this.clickeventId = id;
      console.log(this.clickeventId);
      this.dialogRef
        .open(EventDataDialogComponent, {
          data: {
            eventId: this.clickeventId,
            eventName: name,
          },
          width: '450px',
        })
        .afterClosed()
        .subscribe((result) => {
          this.clickeventId = undefined;
        });
    }
  
    ngOnInit(): void {
      this.eventsregService.get().subscribe({
        next: (r) => {
          this.event = r;
          // console.log(this.event);
          this.dataSource.data = this.event;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.log(err.message | err);
        },
      });
      this.eventsregService.getVenue().subscribe({
        next: (r) => {
          this.venue = r;
          // console.log(this.venue)
        },
        error: (err) => {
          console.log(err.message | err);
        },
      });
    }
}
