// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// // 🔹 Interfaces
// export interface EventCategory {
//   eventCategoryId: number;
//   name: string;
//   description?: string;
// }

// export interface Vendor {
//   vendorId: number;
//   name: string;
//   description: string;
//   contactInfo: string;
//   location: string;
// }

// export interface VendorService {
//   vendorServicesId: number;
//   serviceName: string;
//   serviceDescription: string;
//   price: number;
//   selected?: boolean;
// }

// // 🔹 Injectable Service
// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private baseUrl = 'http://localhost:5239/api/Cart';

//   constructor(private http: HttpClient) {}

//   getEventCategories(): Observable<EventCategory[]> {
//     return this.http.get<EventCategory[]>(`${this.baseUrl}/events-categories`);
//   }

//   getVendorsByEvent(eventId: number): Observable<Vendor[]> {
//     return this.http.get<Vendor[]>(`${this.baseUrl}/vendors/byevent/${eventId}`);
//   }

//   getAllVendors(): Observable<Vendor[]> {
//     return this.http.get<Vendor[]>(`${this.baseUrl}/vendors`); 
//   }

//   getEventById(eventId: number): Observable<EventCategory> {
//     return this.http.get<EventCategory>(`${this.baseUrl}/events/${eventId}`);
//   }

//   getServicesByVendor(vendorId: number): Observable<VendorService[]> {
//     return this.http.get<VendorService[]>(`${this.baseUrl}/VendorServices/${vendorId}`);
//   }
  
//   bookVendorServices(vendorId: number, services: VendorService[]): Observable<any> {
//     return this.http.post(`${this.baseUrl}/Booking/book`, {
//       vendorId,
//       services: services.map(s => s.vendorServicesId)
//     });
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 🔹 Interfaces
export interface EventCategory {
  eventCategoryId: number;
  name: string;
  description?: string;
}

export interface Vendor {
  vendorId: number;
  name: string;
  description: string;
  contactInfo: string;
  location: string;
}

export interface BookingRequest {
  eventCategoryId: number;
  userId: number;
  vendorId: number;
  expectedAmount: number;
  updatedAt: string;      // ISO date string
  bookingStatus: string;  // e.g., "Pending"
  bookingDate: string;    // ISO date string
}


export interface VendorService {
  vendorServicesId: number;
  serviceName: string;
  serviceDescription: string;
  price: number;
  selected?: boolean;
}

// 🔹 Injectable Service
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:5239/api/Cart';

  constructor(private http: HttpClient) {}

  getEventCategories(): Observable<EventCategory[]> {
    return this.http.get<EventCategory[]>(`${this.baseUrl}/events-categories`);
  }

  getVendorsByEvent(eventId: number): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}/vendors/byevent/${eventId}`);
  }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}/vendors`);
  }

  getEventById(eventId: number): Observable<EventCategory> {
    return this.http.get<EventCategory>(`${this.baseUrl}/events/${eventId}`);
  }

  getServicesByVendor(vendorId: number): Observable<VendorService[] | VendorService> {
    return this.http.get<VendorService[] | VendorService>(`${this.baseUrl}/VendorServices/${vendorId}`);
  }


  createBookingRequest(booking: BookingRequest): Observable<any> {
    const url = 'http://localhost:5239/api/BookingRequest/create';
    return this.http.post(url, booking);
  }
  

  bookVendorServices(vendorId: number, services: VendorService[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/Booking/book`, {
      vendorId,
      services: services.map(s => s.vendorServicesId)
    });
  }
}
