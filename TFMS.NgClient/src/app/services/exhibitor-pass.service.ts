import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../shared/app-constants';
import { ExhibitorPass } from '../models/exhibitor-pass';
import { Exhibitor } from '../models/exhibitor';
import { ExhibitorEntryExit } from '../models/exhibitor-entry-exit';

@Injectable({
  providedIn: 'root'
})
export class ExhibitorPassService {

  constructor(private http:HttpClient) { }
  get():Observable<ExhibitorPass[]>{
    return this.http.get<ExhibitorPass[]>(`${apiUrl}/api/ExhibitorPasses`);
  }
  getById(id:number):Observable<ExhibitorPass> {
    return this.http.get<ExhibitorPass>(`${apiUrl}/api/ExhibitorPasses/${id}`);
  }
  getByIdInclude(id:number):Observable<ExhibitorPass> {
    return this.http.get<ExhibitorPass>(`${apiUrl}/api/ExhibitorPasses/${id}/Include`);
  }
  getExhibitor():Observable<Exhibitor[]>{
    return this.http.get<Exhibitor[]>(`${apiUrl}/api/Exhibitors`)
  }
  getExhibitorEntryExitById(id:number):Observable<Exhibitor[]>{
    return this.http.get<Exhibitor[]>(`${apiUrl}/api/Exhibitors/${id}`)
  }
  
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/ExhibitorPasses/${id}`);
  }

  //Get entry exit of pass
  getEntryExitOfPass(id:number): Observable<ExhibitorEntryExit[]>{
    return this.http.get<ExhibitorEntryExit[]>(`${apiUrl}/api/ExhibitorPasses/ExhibitorEntryExits/Of/${id}`);
  }
//************************//
  create(data:ExhibitorPass):Observable<ExhibitorPass>{
    return this.http.post<ExhibitorPass>(`${apiUrl}/api/ExhibitorPasses`, data);
  }
  updateFairPass(data:ExhibitorPass):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/ExhibitorPasses/${data.exhibitorPassId}`, data);
  }

}
