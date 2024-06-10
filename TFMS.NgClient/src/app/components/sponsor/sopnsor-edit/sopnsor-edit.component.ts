import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../../../models/sponsor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SponsorService } from '../../../services/sponsor.service';
import { NotifyService } from '../../../services/common/notify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sopnsor-edit',
  templateUrl: './sopnsor-edit.component.html',
  styleUrl: './sopnsor-edit.component.css'
})
export class SopnsorEditComponent implements OnInit {
  sponsor:Sponsor = {};
  editForm:FormGroup = new FormGroup({
    companyName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    industry: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
  });
  constructor(
    private sponsorService:SponsorService,
    private notifyService: NotifyService,
    private activatedRoute:ActivatedRoute
  ){}
  get f(){
    return this.editForm.controls;
  }
  save(){
    if(this.editForm.invalid) return;
    Object.assign(this.sponsor, this.editForm.value);
    console.log(this.sponsor);
    this.sponsorService.updateSponsor(this.sponsor)
    .subscribe({
      next:r=>{
        this.notifyService.notify("Data updated", "DISMISS");
        this.sponsor={};
        this.editForm.reset({});

      },
      error:err=>{
        console.log(err.message || err);
        this.notifyService.notify("Failed to update Sponsor", "DISMISS");
      }
    })
  }

  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params["id"];
    this.sponsorService.getById(id)
    .subscribe({
      next: r=>{
        this.sponsor = r;
        this.editForm.patchValue(this.sponsor);
      },
      error:err=>{
        console.log(err.message || err);
      }
    });
  }

  }


