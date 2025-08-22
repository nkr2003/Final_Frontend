import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl = 'http://localhost:5329/api/vendors'; // ✅ adjust as per backend

  constructor(private http: HttpClient) {}

  getVendorsByEvent(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/byEvent/${eventId}`);
  }
  deleteVendorService(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  
}
