import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organizer } from '../models/organizer';
import { apiUrl } from '../shared/app-constants';
import { Fair } from '../models/fair';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  constructor(
    private http:HttpClient
  ) { }

  get():Observable<Organizer[]>{
    return this.http.get<Organizer[]>(`${apiUrl}/api/Organizers`);
  }
  getById(id:number):Observable<Organizer> {
    return this.http.get<Organizer>(`${apiUrl}/api/Organizers/${id}`);
  }
  getByIdInclude(id:number):Observable<Organizer> {
    return this.http.get<Organizer>(`${apiUrl}/api/Organizers/${id}/Include`);
  }
  getWithFairs():Observable<Organizer[]>{
    return this.http.get<Organizer[]>(`${apiUrl}/api/Organizers/Fairs/Include`);
  }
  getFairs(id:number): Observable<Fair[]>{
    return this.http.get<Fair[]>(`${apiUrl}/api/Organizers/Fairs/Of/${id}`);
  }
  create(data:Organizer):Observable<Organizer>{
    return this.http.post<Organizer>(`${apiUrl}/api/Organizers`, data);
  }
  updateOrganizer(data:Organizer):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/Organizers/${data.organizerId}`, data);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/Organizers/${id}`);
  }
}
