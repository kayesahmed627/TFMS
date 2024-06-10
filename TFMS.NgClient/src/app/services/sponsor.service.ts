import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sponsor } from '../models/sponsor';
import { Observable } from 'rxjs';
import { apiUrl } from '../shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Sponsor[]>{
    return this.http.get<Sponsor[]>(`${apiUrl}/api/Sponsors`);
  }
  getById(id:number):Observable<Sponsor> {
    return this.http.get<Sponsor>(`${apiUrl}/api/Sponsors/${id}`);
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/Sponsors/${id}`);
  }
  create(data:Sponsor):Observable<Sponsor>{
    return this.http.post<Sponsor>(`${apiUrl}/api/Sponsors`, data);
  }

  updateSponsor(data:Sponsor):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/Sponsors/${data.sponsorId}`, data);
  }

}
