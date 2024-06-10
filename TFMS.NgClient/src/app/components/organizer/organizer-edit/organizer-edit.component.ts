import { Component, OnInit } from '@angular/core';
import { Organizer } from '../../../models/organizer';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizerService } from '../../../services/organizer.service';
import { NotifyService } from '../../../services/common/notify.service';
import { ActivatedRoute } from '@angular/router';
import { Fair } from '../../../models/fair';

@Component({
  selector: 'app-organizer-edit',
  templateUrl: './organizer-edit.component.html',
  styleUrl: './organizer-edit.component.css'
})
export class OrganizerEditComponent implements OnInit{
  organizer:Organizer = {};
  organizerForm:FormGroup = new FormGroup({
    organizerName: new FormControl('', Validators.required),
    organizerEmail: new FormControl('', Validators.required),
    organizerPhone: new FormControl('', Validators.required),
    webSiteUrl: new FormControl('', Validators.required),
    sortDescription: new FormControl('', Validators.required),
    fairs: new FormArray([])
  })

  constructor(
    private organizerService:OrganizerService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute

  ){}
  
  get f(){
    return this.organizerForm.controls;
  }
  get fairs(){
    return this.organizerForm.controls['fairs'] as FormArray;
  }
  addFair(org?:Fair){
    if(org){
      console.log(this.fairs)
      this.fairs.push(new FormGroup({
        fairName: new FormControl(org.fairName, Validators.required),
        startDate: new FormControl(org.startDate, Validators.required),
        endDate: new FormControl(org.endDate, Validators.required),
        location: new FormControl(org.location, Validators.required),
        registrationDeadLine: new FormControl(org.registrationDeadLine, Validators.required),
      }));
    }
    else
    {
      this.fairs.push(new FormGroup({
        fairName: new FormControl('', Validators.required),
        
        startDate: new FormControl(undefined, Validators.required),
        endDate: new FormControl(undefined, Validators.required),
        location: new FormControl('', Validators.required),
        registrationDeadLine: new FormControl(undefined, Validators.required),
  
      }));
    }
  }

  removeFair(index:number){
    this.fairs.removeAt(index);
    //console.log(this.attendences.controls[index].get('attendenceDate')?.hasError('required'))
   }


  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params["id"];
    this.organizerService.getByIdInclude(id)
    .subscribe({
      next: r=>{
        this.organizer=r;
        this.organizerForm.patchValue(this.organizer);
        this.organizer.fairs?.forEach(x => {
          this.addFair(x);
        });
      },
      error:err=>{
        console.log(err.message || err);
      }
    });
  }

  save(){
    if(this.organizerForm.invalid) return;
  
    Object.assign(this.organizer, this.organizerForm.value);
    //console.log(this.pavilionCategory);
    this.organizerService.updateOrganizer(this.organizer)
    .subscribe({
      next:r=>{
        this.notifyService.notify("Data saved", "DISMISS");
        this.organizer={};
        this.organizerForm.reset({});
  
      },
      error:err=>{
        console.log(err.message || err);
        this.notifyService.notify("Failed to save Organizer", "DISMISS");
      }
      });
    }
  }
