import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5239/api/cart'; // 🔴 change port if different

  constructor(private http: HttpClient) {}

  // ✅ Get all event categories
  getEventCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events-categories`);
  }

  // src/app/services/cart.service.ts
getVendorsByEvent(eventId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/vendors/byevent/${eventId}`);
}

getEvents() {
  return this.http.get(`${this.apiUrl}/events-categories`);
}

}
