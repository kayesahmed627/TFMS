import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { HomeComponent } from './components/home/home.component';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { ReactiveFormsModule } from '@angular/forms';
import { PavilionViewComponent } from './components/pavilion/pavilion-view/pavilion-view.component';
import { PavilionCreateComponent } from './components/pavilion/pavilion-create/pavilion-create.component';
import { PavilionEditComponent } from './components/pavilion/pavilion-edit/pavilion-edit.component';
import { PavilionDataDialogComponent } from './dialogs/pavilion-data-dialog/pavilion-data-dialog.component';
import { ComfirmDialogComponent } from './dialogs/comfirm-dialog/comfirm-dialog.component';
import { SopnsorViewComponent } from './components/sponsor/sopnsor-view/sopnsor-view.component';
import { SopnsorCreateComponent } from './components/sponsor/sopnsor-create/sopnsor-create.component';
import { SopnsorEditComponent } from './components/sponsor/sopnsor-edit/sopnsor-edit.component';
import { StaffDetailListComponent } from './components/staffDetail/staff-detail-list/staff-detail-list.component';
import { StaffDetailCreateComponent } from './components/staffDetail/staff-detail-create/staff-detail-create.component';
import { StaffDetailEditComponent } from './components/staffDetail/staff-detail-edit/staff-detail-edit.component';
import { AttendenceDataDialogComponent } from './dialogs/attendence-data-dialog/attendence-data-dialog.component';
import { SponsorService } from './services/sponsor.service';
import { AttendenceService } from './services/attendence.service';
import { OrganizerCreateComponent } from './components/organizer/organizer-create/organizer-create.component';
import { OrganizerDataDialogComponent } from './dialogs/organizer-data-dialog/organizer-data-dialog.component';
import { OrganizerListComponent } from './components/organizer/organizer-list/organizer-list.component';
import { OrganizerEditComponent } from './components/organizer/organizer-edit/organizer-edit.component';
import { ExhibitorListComponent } from './components/exhibitor/exhibitor-list/exhibitor-list.component';
import { ExhibitorCreateComponent } from './components/exhibitor/exhibitor-create/exhibitor-create.component';
import { ExhibitorEditComponent } from './components/exhibitor/exhibitor-edit/exhibitor-edit.component';
import { PassListComponent } from './components/fair-pass/pass-list/pass-list.component';
import { PassCreateComponent } from './components/fair-pass/pass-create/pass-create.component';
import { PassEditComponent } from './components/fair-pass/pass-edit/pass-edit.component';
import { EntryExitDataDialogComponent } from './dialogs/entry-exit/entry-exit-data-dialog/entry-exit-data-dialog.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { EventCreateComponent } from './components/event/event-create/event-create.component';
import { EventEditComponent } from './components/event/event-edit/event-edit.component';
import { EventDataDialogComponent } from './dialogs/event-data-dialog/event-data-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    PavilionViewComponent,
    PavilionCreateComponent,
    PavilionEditComponent,
    PavilionDataDialogComponent,
    ComfirmDialogComponent,
    SopnsorViewComponent,
    SopnsorCreateComponent,
    SopnsorEditComponent,
    StaffDetailListComponent,
    StaffDetailCreateComponent,
    StaffDetailEditComponent,
    AttendenceDataDialogComponent,
  
    OrganizerCreateComponent,
    OrganizerListComponent,
    OrganizerDataDialogComponent,
    OrganizerEditComponent,
    ExhibitorListComponent,
    ExhibitorCreateComponent,
    ExhibitorEditComponent,
    PassListComponent,
    PassCreateComponent,
    PassEditComponent,
    EntryExitDataDialogComponent,
    EventListComponent,
    EventCreateComponent,
    EventEditComponent,
    EventDataDialogComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatImportModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMaterialMultilevelMenuModule,
    ReactiveFormsModule

  ],
  providers: [
    provideAnimationsAsync(),
    MultilevelMenuService,
    HttpClient,
    SponsorService,
    AttendenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
