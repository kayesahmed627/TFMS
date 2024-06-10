import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../../../models/sponsor';
import { SponsorService } from '../../../services/sponsor.service';
import { NotifyService } from '../../../services/common/notify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sopnsor-create',
  templateUrl: './sopnsor-create.component.html',
  styleUrl: './sopnsor-create.component.css'
})
export class SopnsorCreateComponent {
  
  sponsor:Sponsor = {};
  createForm:FormGroup = new FormGroup({
    companyName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    industry: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
  });
  constructor(
    private sponsorService:SponsorService,
    private notifyService: NotifyService
  ){}
  get f(){
    return this.createForm.controls;
  }
  save(){
    if(this.createForm.invalid) return;
    Object.assign(this.sponsor, this.createForm.value);
    //console.log(this.pavilionCategory);
    this.sponsorService.create(this.sponsor)
    .subscribe({
      next:r=>{
        this.notifyService.notify("Data saved", "DISMISS");
        this.sponsor={};
        this.createForm.reset({});
     
      },
      error:err=>{
        console.log(err.message || err);
        this.notifyService.notify("Failed to save Pavilions", "DISMISS");
      }
    })
  }
}
