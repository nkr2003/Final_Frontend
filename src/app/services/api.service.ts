import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:5239/api'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getAllEventCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/admin/event-categories`);
  }

  addEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/admin/event-categories`, eventData);
  }

  // ================= Vendors =================
  addVendor(vendorData: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/Vendor/create-vendor`, vendorData);
  }

  getAllVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/Vendor/get-all-vendors`);
  }

  // ================= Vendor Services =================
  addVendorServices(serviceData: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/VendorServices/create`, serviceData);
  }

  getAllVendorServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/VendorServices/get-all`);
  }
  deleteEventById(id: number) {
    return this.http.delete(`${this.BASE_URL}/admin/event-categories/${id}`);
  }
  
  deleteVendorServiceById(id: number) {
    return this.http.delete(`${this.BASE_URL}/VendorServices/${id}`);
  }
  
}
