import { Component, OnInit } from '@angular/core';
import { PavilionCategory } from '../../../models/pavilion-category';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { PavilionType } from '../../../shared/app-constants';
import { PavilionService } from '../../../services/pavilion.service';
import { NotifyService } from '../../../services/common/notify.service';


@Component({
  selector: 'app-pavilion-create',
  templateUrl: './pavilion-create.component.html',
  styleUrl: './pavilion-create.component.css'
})
export class PavilionCreateComponent implements OnInit{
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
    private notifyService:NotifyService
  ){}
  get f(){
    return this.pavlionForm.controls;
  }
  get pavilions(){
    return this.pavlionForm.controls['pavilions'] as FormArray;
  }
  addPavilion(){
    this.pavilions.push(new FormGroup({
      pavilionName: new FormControl('', Validators.required),
      pavilionNumber: new FormControl(undefined, Validators.required),
      size: new FormControl('', Validators.required),
      sqFoot: new FormControl(undefined, Validators.required),
      rent: new FormControl(undefined, Validators.required)
    }));
  }
  removePavilion(index:number){
   this.pavilions.removeAt(index);
   //console.log(this.pavilions.controls[index].get('pavilionName')?.hasError('required'))
  }
  save(){
    if(this.pavlionForm.invalid) return;
    Object.assign(this.pavilionCategory, this.pavlionForm.value);
    //console.log(this.pavilionCategory);
    this.pavilionService.create(this.pavilionCategory)
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
    })
  }

  ngOnInit(): void {
    Object.keys(PavilionType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.typeOptions.push({label: v, value:<any> PavilionType[v]});
    });
    this.addPavilion();
  }
}
