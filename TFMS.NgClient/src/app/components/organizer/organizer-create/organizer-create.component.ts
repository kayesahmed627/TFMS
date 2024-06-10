import { Component, OnInit } from '@angular/core';
import { Organizer } from '../../../models/organizer';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizerService } from '../../../services/organizer.service';
import { NotifyService } from '../../../services/common/notify.service';

@Component({
  selector: 'app-organizer-create',
  templateUrl: './organizer-create.component.html',
  styleUrl: './organizer-create.component.css'
})
export class OrganizerCreateComponent implements OnInit {
  typeOptions: { label: string, value: number }[] = [];
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
    private notifyService:NotifyService
  ){}

  get f(){
    return this.organizerForm.controls;
  }

  get fairs(){
    return this.organizerForm.controls['fairs'] as FormArray;
  }

  addFair(){
    this.fairs.push(new FormGroup({
      fairName: new FormControl('', Validators.required),
      startDate: new FormControl(undefined, Validators.required),
      endDate: new FormControl(undefined, Validators.required),
      location: new FormControl('', Validators.required),
      registrationDeadLine: new FormControl(undefined, Validators.required),

    }));
  }

  removeFair(index:number){
    this.fairs.removeAt(index);
    //console.log(this.attendences.controls[index].get('attendenceDate')?.hasError('required'))
   }
 
   save(){
    if(this.organizerForm.invalid) return;
    Object.assign(this.organizer, this.organizerForm.value);
    //console.log(this.staffDetail);
    this.organizerService.create(this.organizer)
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
    })
  }


  ngOnInit(): void {
this.addFair();
  }
}
