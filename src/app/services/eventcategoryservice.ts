import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventCategoryService {
  private baseUrl = 'https://localhost:5329/api/cart';  // ✅ Update port if needed

  constructor(private http: HttpClient) {}

  // Fetch all events (GET: /api/cart/events-categories)
  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/events-categories`);
  }

  // Fetch vendors by event ID (GET: /api/cart/vendors/byevent/{eventId})
  getVendorsByEvent(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vendors/byevent/${eventId}`);
  }
}
