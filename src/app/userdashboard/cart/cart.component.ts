import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  eventItems: any[] = [];
  vendorServices: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    // ✅ Fetch Events from backend
    this.http.get<any[]>('http://localhost:5239/api/cart/events-categories').subscribe(data => {
      this.eventItems = data;
    });

    // ✅ Fetch Vendor Services from backend
    this.http.get<any[]>('http://localhost:5239/api/cart/vendorservices').subscribe(data => {
      this.vendorServices = data;
    });
  }

  getEventsTotal(): number {
    return this.eventItems.reduce((sum, e) => sum + (e.price || 0), 0);
  }

  getVendorTotal(): number {
    return this.vendorServices.reduce((sum, s) => sum + (s.price || 0), 0);
  }

  getGrandTotal(): number {
    return this.getEventsTotal() + this.getVendorTotal();
  }

  returnToBooking() {
    this.router.navigate(['/booking']);
  }

  goToPayments() {
    const total = this.getGrandTotal();
    this.router.navigate(['/payments'], { queryParams: { amount: total } });
  }

  // 🟢 Remove Event
  removeEvent(event: any) {
    this.eventItems = this.eventItems.filter(e => e !== event);
  }

  // 🟢 Remove Vendor Service (this was missing!)
  removeVendorService(service: any) {
    this.vendorServices = this.vendorServices.filter(s => s !== service);
  }
  
}
