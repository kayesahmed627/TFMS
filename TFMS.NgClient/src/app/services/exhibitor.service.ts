import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exhibitor } from '../models/exhibitor';
import { apiUrl } from '../shared/app-constants';
import { UploadResponse } from '../models/upload-response';

@Injectable({
  providedIn: 'root'
})
export class ExhibitorService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Exhibitor[]>{
    return this.http.get<Exhibitor[]>(`${apiUrl}/api/Exhibitors`);
  }
  getById(id:number):Observable<Exhibitor> {
    return this.http.get<Exhibitor>(`${apiUrl}/api/Exhibitors/${id}`);
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/Exhibitors/${id}`);
  }
  create(data:Exhibitor):Observable<Exhibitor>{
    return this.http.post<Exhibitor>(`${apiUrl}/api/Exhibitors`, data);
  }

  updateExhibitor(data:Exhibitor):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/Exhibitors/${data.exhibitorId}`, data);
  }
  uploadImage(id: number, f: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', f);
    console.log(f);
    return this.http.post<UploadResponse>(`${apiUrl}/api/Exhibitors/Upload/${id}`, formData);
  }

}
