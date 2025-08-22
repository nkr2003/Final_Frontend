import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService, Vendor, VendorService } from '../services/cart.service';

@Component({
  selector: 'app-vendor',
  standalone: false,
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendors: Vendor[] = [];
  vendorServices: VendorService[] = [];
  selectedVendorServices: VendorService[] = [];
  selectedVendor: Vendor | null = null;
  eventId!: number;
  eventName:string = '';

  constructor(
    private vendorService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = Number(params.get('id'));
      console.log("Event ID from route:", this.eventId);
  
      if (this.eventId) {
        this.loadEventName();  // 👈 Fetch event name
        this.loadVendors();    // 👈 Load vendors
      }
    });
  }

  loadEventName() {
    this.vendorService.getEventById(this.eventId).subscribe(
      (event: any) => {
        console.log("Fetched Event:", event);
        this.eventName = event.name || '';
      },
      (error) => {
        console.error("Error fetching event name:", error);
        this.eventName = 'Unknown Event';
      }
    );
  }
  
  
  

  loadVendors() {
    this.vendorService.getVendorsByEvent(this.eventId).subscribe((res: Vendor[] | any) => {
      console.log("Vendors by Event:", res);
      this.vendors = Array.isArray(res) ? res : res.data || [];
    });
  }

  addToCart(vendor: Vendor) {
    const selectedServices = this.selectedVendorServices.filter(s => s.selected);
    const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);
  
    const bookingPayload = {
      eventCategoryId: this.eventId,
      userId: 1, // Replace with actual user ID from auth
      vendorId: vendor.vendorId,
      expectedAmount: totalAmount,
      updatedAt: new Date().toISOString(),
      bookingStatus: 'Pending',
      bookingDate: new Date().toISOString()
    };
  
    this.vendorService.createBookingRequest(bookingPayload).subscribe(
      res => {
        console.log("Booking successful:", res);
        alert("Services added to cart successfully!");
      },
      err => {
        console.error("Booking failed:", err);
        alert("Failed to add services to cart.");
      }
    );
  }
  

viewServices(vendor: any) {
  this.selectedVendor = vendor;

  this.vendorService.getServicesByVendor(vendor.vendorId).subscribe((res: any) => {
    console.log("Vendor services response:", res);

    // Force into array format
    if (Array.isArray(res)) {
      this.selectedVendorServices = res;
    } else if (res && typeof res === 'object') {
      this.selectedVendorServices = [res]; // wrap single object
    } else {
      this.selectedVendorServices = [];
      console.warn("Unexpected format for vendor services:", res);
    }
  });
}

  
  //     } else {
  //       this.selectedVendorServices = [];
  //       console.warn("No data received for vendor services.");
  //     }
  //   });
  // }

  openVendorModal(vendor: Vendor) {
    this.selectedVendor = vendor;

    this.vendorService.getServicesByVendor(vendor.vendorId).subscribe((res: any) => {
      console.log("Modal vendor services:", res);
      this.vendorServices = Array.isArray(res) ? res : [res];
    });
  }

  closeModal() {
    this.selectedVendor = null;
    this.vendorServices = [];
  }

  bookServices() {
    const selected = this.vendorServices.filter(s => s.selected);
    console.log("Booking these services:", selected);
    alert(`Booked ${selected.length} services!`);
    this.closeModal();
  }
}
