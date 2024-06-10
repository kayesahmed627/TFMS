import { Component, OnInit } from '@angular/core';
import { ExhibitorPass } from '../../../models/exhibitor-pass';
import { Exhibitor } from '../../../models/exhibitor';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExhibitorPassService } from '../../../services/exhibitor-pass.service';
import { NotifyService } from '../../../services/common/notify.service';

@Component({
  selector: 'app-pass-create',
  templateUrl: './pass-create.component.html',
  styleUrl: './pass-create.component.css'
})
export class PassCreateComponent implements OnInit {
  exhibitorPass: ExhibitorPass = {};
  exhibitors: Exhibitor[] = [];

  fairPassForm: FormGroup = new FormGroup({
    exhibitorId: new FormControl(undefined, Validators.required),
    personName: new FormControl('', Validators.required),
    validFrom: new FormControl(undefined, Validators.required),
    validUntil: new FormControl(undefined, Validators.required),
    exhibitorEntryExits: new FormArray([])
  });
  constructor(
    private exhibitorPassService: ExhibitorPassService,
    private notifyService: NotifyService
  ) { }

  get f() {
    return this.fairPassForm.controls;
  }
  get exhibitorEntryExits() {
    return this.fairPassForm.controls['exhibitorEntryExits'] as FormArray;
  }
  addEntryExit() {
    this.exhibitorEntryExits.push(new FormGroup({
      date: new FormControl(undefined, Validators.required),
      entryTime: new FormControl(undefined, Validators.required),
      exitTime: new FormControl(undefined, Validators.required),
    }));
  }
  removeEntryExit(index: number) {
    this.exhibitorEntryExits.removeAt(index);
  }
  save() {
    if (this.fairPassForm.invalid) return;
    Object.assign(this.exhibitorPass, this.fairPassForm.value);
    //console.log(this.exhibitorPass);
    this.exhibitorPassService.create(this.exhibitorPass)
      .subscribe({
        next: r => {
          this.notifyService.notify("Data saved", "DISMISS");
          this.exhibitorPass = {};
          this.fairPassForm.reset({});

        },
        error: err => {
          console.log(err.message || err);
          this.notifyService.notify("Failed to save Pavilions", "DISMISS");
        }
      })
  }

  ngOnInit(): void {
    this.addEntryExit();
    this.exhibitorPassService.getExhibitor()
      .subscribe({
        next: r => {
          console.log(r);
          this.exhibitors=r;
        },
        error: err=>{
          console.log(err.message|err);
        }
      });
  }
}
