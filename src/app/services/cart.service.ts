import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart'; // adjust to your backend

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events-categories`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/events/${id}`);
  }

  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendors`);
  }

  getVendorsByEvent(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendors/byevent/${eventId}`);
  }

  getVendorServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendorservices`);
  }

  getVendorServiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vendorservices/${id}`);
  }

  getVendorServicesByEvent(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendorservices/byevent/${eventId}`);
  }
}
