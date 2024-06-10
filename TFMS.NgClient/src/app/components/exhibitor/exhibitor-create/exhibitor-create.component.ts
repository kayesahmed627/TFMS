import { Component } from '@angular/core';
import { Exhibitor } from '../../../models/exhibitor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExhibitorService } from '../../../services/exhibitor.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../../../services/common/notify.service';

@Component({
  selector: 'app-exhibitor-create',
  templateUrl: './exhibitor-create.component.html',
  styleUrl: './exhibitor-create.component.css'
})
export class ExhibitorCreateComponent {

  exhibitor:Exhibitor = {};
  image:File =null!;

  exhibitorForm:FormGroup = new FormGroup({
    companyName: new FormControl('', Validators.required),
    tradeLicence: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    logoUrl: new FormControl('', Validators.required)
  })
  constructor(
    private exhibiorService:ExhibitorService,
    private dialogRef:MatDialog,
    private notifyService:NotifyService
  ){}
  get f(){
    return this.exhibitorForm.controls;
  }
  save(){
    if(this.exhibitorForm.invalid) return;
    Object.assign(this.exhibitor, this.exhibitorForm.value);
    console.log(this.exhibitor);
    this.exhibiorService.create(this.exhibitor)
    .subscribe({
      next:r=>{
        this.notifyService.notify("Data saved", "DISMISS");
        this.exhibitor={};
        this.upload(<number>r.exhibitorId);
        this.exhibitorForm.reset({});

      },
      error:err=>{
        console.log(err.message || err);
        this.notifyService.notify("Failed to save Exhibitor", "DISMISS");
      }
    })
  }

  upload(id:number){
    const reader = new FileReader();
    reader.onload = (ev:any)=>{
      this.exhibiorService.uploadImage(id, this.image)
      .subscribe({
        next:r=>{
          console.log(r);
          this.notifyService.notify("Data Saved", "DISMISS");
          this.exhibitorForm.reset({});
          this.exhibitor={};

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
      this.exhibitorForm.patchValue({
        logoUrl:this.image.name
      });
    }
  }

}
