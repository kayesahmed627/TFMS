import { Component, OnInit } from '@angular/core';
import { ExhibitorPass } from '../../../models/exhibitor-pass';
import { Exhibitor } from '../../../models/exhibitor';
import { ExhibitorEntryExit } from '../../../models/exhibitor-entry-exit';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExhibitorPassService } from '../../../services/exhibitor-pass.service';
import { NotifyService } from '../../../services/common/notify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pass-edit',
  templateUrl: './pass-edit.component.html',
  styleUrl: './pass-edit.component.css'
})
export class PassEditComponent implements OnInit {
  exhibitorPass: ExhibitorPass = {};
  exhibitors: Exhibitor[] = [];
  //exhibitorAllEntryExits: ExhibitorEntryExit[] = [];
  editForm: FormGroup = new FormGroup({
    exhibitorId: new FormControl(undefined, Validators.required),
    personName: new FormControl('', Validators.required),
    validFrom: new FormControl(undefined, Validators.required),
    validUntil: new FormControl(undefined, Validators.required),
    exhibitorEntryExits: new FormArray([])
  });
  constructor(
    private exhibitorPassService: ExhibitorPassService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  get f() {
    return this.editForm.controls;
  }
  get entryExits() {
    return this.editForm.controls['exhibitorEntryExits'] as FormArray;
  }
  addEntryExit(ex?: ExhibitorEntryExit) {
    if (ex) {
      this.entryExits.push(new FormGroup({
        date: new FormControl(ex.date, Validators.required),
        entryTime: new FormControl(ex.entryTime, Validators.required),
        exitTime: new FormControl(ex.exitTime, Validators.required),
      }));
    }
    else {
      this.entryExits.push(new FormGroup({
        date: new FormControl(undefined, Validators.required),
        entryTime: new FormControl(undefined, Validators.required),
        exitTime: new FormControl(undefined, Validators.required),
      }));
    }
  }
  removeEntryExit(index: number) {
    this.entryExits.removeAt(index);
  }
  save() {
    if (this.editForm.invalid) return;
    Object.assign(this.exhibitorPass, this.editForm.value);
    //console.log(this.exhibitorPass);
    this.exhibitorPassService.updateFairPass(this.exhibitorPass)
      .subscribe({
        next: r => {
          this.notifyService.notify("Data saved", "DISMISS");
          this.exhibitorPass = {};
          //this.editForm.reset({});

        },
        error: err => {
          console.log(err.message || err);
          this.notifyService.notify("Failed to save Pavilions", "DISMISS");
        }
      })
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    this.exhibitorPassService.getByIdInclude(id)
      .subscribe({
        next: r => {
          this.exhibitorPass=r
          console.log(this.exhibitorPass);
          this.editForm.patchValue(this.exhibitorPass);

          console.log(this.editForm.value);
          this.exhibitorPass.exhibitorEntryExits?.forEach(x => {
            this.addEntryExit(x);
            
          })
        },
        error: err => {
          console.log(err.message | err);
        }
      });
    this.exhibitorPassService.getExhibitor()
      .subscribe({
        next: r => {
          this.exhibitors = r;
        },
        error: err => {
          console.log(err.message | err);
        }
      });
  }
}
