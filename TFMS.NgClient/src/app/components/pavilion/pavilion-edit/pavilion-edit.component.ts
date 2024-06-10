import { Component, OnInit } from '@angular/core';
import { PavilionCategory } from '../../../models/pavilion-category';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PavilionService } from '../../../services/pavilion.service';
import { NotifyService } from '../../../services/common/notify.service';
import { ActivatedRoute } from '@angular/router';
import { Pavilion } from '../../../models/pavilion';
import { PavilionType } from '../../../shared/app-constants';

@Component({
  selector: 'app-pavilion-edit',
  templateUrl: './pavilion-edit.component.html',
  styleUrl: './pavilion-edit.component.css'
})
export class PavilionEditComponent implements OnInit{
  typeOptions: { label: string, value: number }[] = [];
  pavilionCategory:PavilionCategory = {};
  
  pavlionForm:FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    pavilionType: new FormControl(undefined, Validators.required),
    description: new FormControl('', Validators.required),
    farePerSquareFeet: new FormControl(undefined, Validators.required),
    pavilions: new FormArray([])
  })
  constructor(
    private pavilionService:PavilionService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ){}
  get f(){
    return this.pavlionForm.controls;
  }
  get pavilions(){
    return this.pavlionForm.controls['pavilions'] as FormArray;
  }
  addPavilion(pav?:Pavilion){
    if(pav){
      this.pavilions.push(new FormGroup({
        pavilionName: new FormControl(pav.pavilionName, Validators.required),
        pavilionNumber: new FormControl(pav.pavilionNumber, Validators.required),
        size: new FormControl(pav.size, Validators.required),
        sqFoot: new FormControl(pav.sqFoot, Validators.required),
        rent: new FormControl(pav.rent, Validators.required)
      }));
    }
    else
    {
      this.pavilions.push(new FormGroup({
        pavilionName: new FormControl('', Validators.required),
        pavilionNumber: new FormControl(undefined, Validators.required),
        size: new FormControl('', Validators.required),
        sqFoot: new FormControl(undefined, Validators.required),
        rent: new FormControl(undefined, Validators.required)
      }));
    }

  }
  removePavilion(index:number){
   this.pavilions.removeAt(index);
   //console.log(this.pavilions.controls[index].get('pavilionName')?.hasError('required'))
  }
  ngOnInit(): void {
    Object.keys(PavilionType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.typeOptions.push({label: v, value:<any> PavilionType[v]});
    });
    let id:number = this.activatedRoute.snapshot.params["id"];
    this.pavilionService.getByIdInclude(id)
    .subscribe({
      next: r=>{
        this.pavilionCategory=r;
        this.pavlionForm.patchValue(this.pavilionCategory);
        this.pavilionCategory.pavilions?.forEach(x => {
          this.addPavilion(x);
        });
      },
      error:err=>{
        console.log(err.message || err);
      }
    });
  }

  save(){
    if(this.pavlionForm.invalid) return;

    Object.assign(this.pavilionCategory, this.pavlionForm.value);
    //console.log(this.pavilionCategory);
    this.pavilionService.updatePavilion(this.pavilionCategory)
    .subscribe({
      next:r=>{
        this.notifyService.notify("Data saved", "DISMISS");
        this.pavilionCategory={};
        this.pavlionForm.reset({});

      },
      error:err=>{
        console.log(err.message || err);
        this.notifyService.notify("Failed to save Pavilions", "DISMISS");
      }
    });

  }
}
