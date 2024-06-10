import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PavilionViewComponent } from './components/pavilion/pavilion-view/pavilion-view.component';
import { PavilionCreateComponent } from './components/pavilion/pavilion-create/pavilion-create.component';
import { PavilionEditComponent } from './components/pavilion/pavilion-edit/pavilion-edit.component';
import { SopnsorViewComponent } from './components/sponsor/sopnsor-view/sopnsor-view.component';
import { SopnsorCreateComponent } from './components/sponsor/sopnsor-create/sopnsor-create.component';
import { SopnsorEditComponent } from './components/sponsor/sopnsor-edit/sopnsor-edit.component';
import { StaffDetailListComponent } from './components/staffDetail/staff-detail-list/staff-detail-list.component';
import { StaffDetailCreateComponent } from './components/staffDetail/staff-detail-create/staff-detail-create.component';
import { StaffDetailEditComponent } from './components/staffDetail/staff-detail-edit/staff-detail-edit.component';
import { OrganizerCreateComponent } from './components/organizer/organizer-create/organizer-create.component';
import { OrganizerEditComponent } from './components/organizer/organizer-edit/organizer-edit.component';
import { OrganizerListComponent } from './components/organizer/organizer-list/organizer-list.component';
import { ExhibitorListComponent } from './components/exhibitor/exhibitor-list/exhibitor-list.component';
import { ExhibitorCreateComponent } from './components/exhibitor/exhibitor-create/exhibitor-create.component';
import { ExhibitorEditComponent } from './components/exhibitor/exhibitor-edit/exhibitor-edit.component';
import { PassListComponent } from './components/fair-pass/pass-list/pass-list.component';
import { PassCreateComponent } from './components/fair-pass/pass-create/pass-create.component';
import { PassEditComponent } from './components/fair-pass/pass-edit/pass-edit.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { EventCreateComponent } from './components/event/event-create/event-create.component';
import { EventEditComponent } from './components/event/event-edit/event-edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pavilions', component: PavilionViewComponent },
  { path: 'pavilion-create', component: PavilionCreateComponent },
  { path: 'pavilion-edit/:id', component: PavilionEditComponent },
  { path: 'sponsors', component: SopnsorViewComponent },
  { path: 'sponsor-create', component: SopnsorCreateComponent },
  { path: 'sponsor-edit/:id', component: SopnsorEditComponent },
  { path: 'staffDetails', component: StaffDetailListComponent },
  { path: 'staffDetail-create', component: StaffDetailCreateComponent },
  { path: 'staffDetail-edit/:id', component: StaffDetailEditComponent },
  { path: 'organizers', component: OrganizerListComponent },
  { path: 'organizer-create', component: OrganizerCreateComponent },
  { path: 'organizer-edit/:id', component: OrganizerEditComponent },
  { path: 'exhibitors', component: ExhibitorListComponent },
  { path: 'exhibitor-create', component: ExhibitorCreateComponent },
  { path: 'exhibitor-edit/:id', component: ExhibitorEditComponent },
  { path: 'entry-exit', component: PassListComponent },
  { path: 'fair-pass-create', component: PassCreateComponent },
  { path: 'fair-pass-edit/:id', component: PassEditComponent },
  {path: 'events',component:EventListComponent},
  {path:'event-create',component:EventCreateComponent},
  {path:'event-edit/:id',component:EventEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
