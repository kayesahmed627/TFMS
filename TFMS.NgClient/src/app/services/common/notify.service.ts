import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  config: MatSnackBarConfig = {
    //verticalPosition: 'bottom',
    //horizontalPosition: 'center',
    duration: 3000
  };
  
  constructor( private snackBar:MatSnackBar) { 
    
  }
  notify(message:string, action:string){
    this.snackBar.open(message,action, this.config);
  }
}
