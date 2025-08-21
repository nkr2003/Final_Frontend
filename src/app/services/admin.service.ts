import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private BASE_URL = 'http://localhost:5239/api';

  constructor(private http: HttpClient) { }

  // EVENTS
  addEvent(eventData: any): Observable<any> { return this.http.post(`${this.BASE_URL}/admin/event-categories`, eventData); }
  getAllEvents(): Observable<any[]> { return this.http.get<any[]>(`${this.BASE_URL}/admin/event-categories`); }
  deleteEventById(id: number): Observable<any> { return this.http.delete(`${this.BASE_URL}/admin/event-categories/${id}`); }

  // VENDORS
addVendor(vendorData: any): Observable<any> {
  return this.http.post(`${this.BASE_URL}/Vendor/create-vendor`, vendorData);
}
getAllVendors(): Observable<any[]> {
  return this.http.get<any[]>(`${this.BASE_URL}/Vendor/get-all-vendors`);
}
deleteVendorById(id: number): Observable<any> {
  return this.http.delete(`${this.BASE_URL}/Vendor/delete-vendor/${id}`);
}

// VENDOR SERVICES
addVendorServices(serviceData: any): Observable<any> {
  return this.http.post(`${this.BASE_URL}/VendorServices/create`, serviceData);
}
getAllVendorServices(): Observable<any[]> {
  return this.http.get<any[]>(`${this.BASE_URL}/VendorServices/all`);
}
deleteVendorServiceById(id: number) {
  return this.http.delete(`http://localhost:5239/api/VendorServices/delete/${id}`);
}


}
