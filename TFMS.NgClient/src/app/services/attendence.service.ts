import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaffDetail } from '../models/staff-detail';
import { Observable } from 'rxjs';
import { apiUrl } from '../shared/app-constants';
import { Attendence } from '../models/attendence';
import { UploadResponse } from '../models/upload-response';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<StaffDetail[]>{
    return this.http.get<StaffDetail[]>(`${apiUrl}/api/StaffDetails`);
  }
  getById(id:number):Observable<StaffDetail> {
    return this.http.get<StaffDetail>(`${apiUrl}/api/StaffDetails/${id}`);
  }
  getByIdInclude(id:number):Observable<StaffDetail> {
    return this.http.get<StaffDetail>(`${apiUrl}/api/StaffDetails/${id}/Include`);
  }
  getWithAttendences():Observable<StaffDetail[]>{
    return this.http.get<StaffDetail[]>(`${apiUrl}/api/StaffDetails/Attendences/Include`);
  }
  getAttendences(id:number): Observable<Attendence[]>{
    return this.http.get<Attendence[]>(`${apiUrl}/api/StaffDetails/Attendences/Of/${id}`);
  }
  create(data:StaffDetail):Observable<StaffDetail>{
    return this.http.post<StaffDetail>(`${apiUrl}/api/StaffDetails`, data);
  }
  updateAttendence(data:StaffDetail):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/StaffDetails/${data.staffDetailId}`, data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/StaffDetails/${id}`);
  }
  uploadImage(id: number, f: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', f);
    console.log(f);
    return this.http.post<UploadResponse>(`${apiUrl}/api/StaffDetails/Upload/${id}`, formData);
  }

}
