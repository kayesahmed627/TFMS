import { Injectable } from '@angular/core';
import { Events } from '../models/events';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../shared/app-constants';
import { Venue } from '../models/venue';
import { EventReg } from '../models/event-reg';
import { Visitor } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EventRegService {

  constructor(private http:HttpClient) { }
  get():Observable<Events[]>{
    return this.http.get<Events[]>(`${apiUrl}/api/Events`);
  }
  getById(id:number):Observable<Events> {
    return this.http.get<Events>(`${apiUrl}/api/Events/${id}`);
  }
  getByIdInclude(id:number):Observable<Events> {
    return this.http.get<Events>(`${apiUrl}/api/Events/${id}/Include`);
  }
  getVenue():Observable<Venue[]>{
    return this.http.get<Venue[]>(`${apiUrl}/api/Venues`)
  }
  // getEventsRegById(id:number):Observable<Venues[]>{
  //   return this.http.get<Venues[]>(`${apiUrl}/api/Venues/${id}`)
  // }
  
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/api/Events/${id}`);
  }

  //Get eventreg of events
  getRegistrationOfEvent(id:number): Observable<EventReg[]>{
    return this.http.get<EventReg[]>(`${apiUrl}/api/Events/EventReg/Of/${id}`);
  }
//************************//
  create(data:Events):Observable<Events>{
    return this.http.post<Events>(`${apiUrl}/api/Events`, data);
  }
  updateEvent(data:Events):Observable<any>{
    return this.http.put<any>(`${apiUrl}/api/Events/${data.eventId}`, data);
  }

  //************************//
  getVisitors():Observable<Visitor[]>{
    return this.http.get<Visitor[]>(`${apiUrl}/api/Visitors`)
  }

}
