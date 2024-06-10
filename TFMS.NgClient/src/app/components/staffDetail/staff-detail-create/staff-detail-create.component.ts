import { Component, OnInit } from '@angular/core';
import { StaffDetail } from '../../../models/staff-detail';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendenceService } from '../../../services/attendence.service';
import { NotifyService } from '../../../services/common/notify.service';
import { Gender } from '../../../shared/app-constants';

@Component({
  selector: 'app-staff-detail-create',
  templateUrl: './staff-detail-create.component.html',
  styleUrl: './staff-detail-create.component.css'
})
export class StaffDetailCreateComponent implements OnInit {
  typeOptions: { label: string, value: number }[] = [];
  staffDetail:StaffDetail = {};
  image:File =null!;

  staffForm:FormGroup = new FormGroup({
    staffName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender: new FormControl(undefined, Validators.required),
    picture: new FormControl('', Validators.required),
    attendences: new FormArray([])
  })

  constructor(
    private attendenceService:AttendenceService,
    private notifyService:NotifyService
  ){}

  get f(){
    return this.staffForm.controls;
  }

  get attendences(){
    return this.staffForm.controls['attendences'] as FormArray;
  }

  addAttendence(){
    this.attendences.push(new FormGroup({
      attendenceDate: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
    }));
  }

  removeAttendence(index:number){
    this.attendences.removeAt(index);
    //console.log(this.attendences.controls[index].get('attendenceDate')?.hasError('required'))
   }
 
   save(){
    if(this.staffForm.invalid) return;
    Object.assign(this.staffDetail, this.staffForm.value);
    //console.log(this.staffDetail);
    this.attendenceService.create(this.staffDetail)
    .subscribe({
      next:r=>{
        this.notifyService.notify("Data saved", "DISMISS");
        this.staffDetail={};
        this.staffForm.reset({});  
      },
      error:err=>{
        console.log(err.message || err);
        this.notifyService.notify("Failed to save Pavilions", "DISMISS");
      }
    })
  }

  upload(id:number){
    const reader = new FileReader();
    reader.onload = (ev:any)=>{
      this.attendenceService.uploadImage(id, this.image)
      .subscribe({
        next:r=>{
          console.log(r);
          //this.notifyService.message("Data Saved", "DISMISS");
          this.staffForm.reset({});
          this.staffDetail={};
          
        },
        error:err=>{
          console.log(err.message || err);
        }
      })
    }
    console.log(this.image);
    reader.readAsArrayBuffer(this.image);
  }

  onFileSelect(event:any){
    if(event.target.files.length){
      this.image =event.target.files[0];
      console.log(this.image);
      this.staffForm.patchValue({
        picture:this.image.name
      });
    }
  }

  ngOnInit(): void {
    Object.keys(Gender).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.typeOptions.push({label: v, value:<any> Gender[v]});
    });
    this.addAttendence();
  }


}
