import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PavilionCategory } from '../models/pavilion-category';
import { apiUrl } from '../shared/app-constants';
import { Pavilion } from '../models/pavilion';

@Injectable({
  providedIn: 'root'
})
export class PavilionService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<PavilionCategory[]>{
    return this.http.get<PavilionCategory[]>(`${apiUrl}/api/PavilionCategories`);
  }

  getById(id:number):Observable<PavilionCategory> {
    return this.http.get<PavilionCategory>(`${apiUrl}/api/PavilionCategories/${id}`);
  }

  getByIdInclude(id:number):Observable<PavilionCategory> {
    return this.http.get<PavilionCategory>(`${apiUrl}/api/PavilionCategories/${id}/Include`);
  }

  getWithPavilions():Observable<PavilionCategory[]>{
    return this.http.get<PavilionCategory[]>(`${apiUrl}/api/PavilionCategories/Pavilions/Include`);
  }
  getPavilions(id:number): Observable<Pavilion[]>{
    return this.http.get<Pavilion[]>(`${apiUrl}/api/PavilionCategories/Pavilions/Of/${id}`);
  }
  create(data:PavilionCategory):Observable<PavilionCategory>{
    return this.http.post<PavilionCategory>(`${apiUrl}/api/PavilionCategories`, data);
  }
  updatePavilion(data:PavilionCategory):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/PavilionCategories/${data.pavilionCategoryId}`, data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/PavilionCategories/${id}`);
  }
}
