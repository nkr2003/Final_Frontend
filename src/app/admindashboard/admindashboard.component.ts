import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface EventCategory {
  eventCategoryId: number;
  name: string;
}

interface Vendor {
  vendorId: number;
  name: string;
  description: string;
  contactInfo: string;
  location: string;
  isActive: boolean;
  eventCategoryId: number;
}

interface VendorService {
  vendorServicesId: number; 
  vendorId: number;
  serviceName: string;
  serviceDescription: string;
  price : Number;
}

interface Toast {
  message: string;
  type: 'success' | 'danger';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  standalone: false
})
export class AdmindashboardComponent implements OnInit {

  eventCategories: EventCategory[] = [];
  vendors: Vendor[] = [];
  vendorServices: VendorService[] = [];
  toasts: Toast[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadVendors();
    this.loadVendorServices();
  }

  // ------------------- TOASTS -------------------
  showToast(message: string, type: 'success' | 'danger' = 'success') {
    const toast: Toast = { message, type };
    this.toasts.push(toast);
    setTimeout(() => this.removeToast(toast), 3000);
  }

  removeToast(toast: Toast) {
    const index = this.toasts.indexOf(toast);
    if (index >= 0) this.toasts.splice(index, 1);
  }

  // ------------------- LOAD DATA -------------------
  loadEvents(): void {
    this.adminService.getAllEvents().subscribe({
      next: (res: EventCategory[]) => this.eventCategories = res,
      error: (err: HttpErrorResponse) => this.showToast('Error loading events', 'danger')
    });
  }

  loadVendors(): void {
    this.adminService.getAllVendors().subscribe({
      next: (res: Vendor[]) => this.vendors = res,
      error: (err: HttpErrorResponse) => this.showToast('Error loading vendors', 'danger')
    });
  }

  loadVendorServices(): void {
    this.adminService.getAllVendorServices().subscribe({
      next: (res: VendorService[]) => this.vendorServices = res,
      error: (err: HttpErrorResponse) => this.showToast('Error loading vendor services', 'danger')
    });
  }

  // ------------------- ADD -------------------
  addEventManual(name: string): void {
    if (!name) return this.showToast('Event name required', 'danger');
    this.adminService.addEvent({ name }).subscribe({
      next: () => {
        this.loadEvents();
        this.showToast(`Event "${name}" added successfully`, 'success');
      },
      error: (err: HttpErrorResponse) => this.showToast('Error adding event', 'danger')
    });
  }

  addVendorManual(
    name: string,
    description: string,
    contactInfo: string,
    location: string,
    isActive: string,
    eventCategoryId: string
  ): void {
    if (!name || !eventCategoryId) return this.showToast('Name and Event Category required', 'danger');

    const vendorData = {
      name,
      description,
      contactInfo,
      location,
      isActive: isActive === 'true',
      eventCategoryId: +eventCategoryId
    };

    this.adminService.addVendor(vendorData).subscribe({
      next: () => {
        this.loadVendors();
        this.showToast(`Vendor "${name}" added successfully`, 'success');
      },
      error: (err: HttpErrorResponse) => this.showToast('Error adding vendor', 'danger')
    });
  }

  addVendorServicesManual(serviceName: string, vendorId: string, serviceDescription: string, price: number): void {
    if (!vendorId || !serviceName || !serviceDescription || price == null) {
      return this.showToast('All fields are required', 'danger');
    }
  
    const serviceData = {
      serviceName,
      serviceDescription,
      price,
      vendorId: +vendorId
    };
  
    this.adminService.addVendorServices(serviceData).subscribe({
      next: () => {
        this.loadVendorServices();
        this.showToast(`Vendor service "${serviceName}" added successfully`, 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.showToast('Error adding vendor service', 'danger');
      }
    });
  }
  

  // ------------------- DELETE -------------------
  deleteEvent(id: number, name: string): void {
    if (!id) return this.showToast('Invalid event ID', 'danger');
    if (confirm(`Delete event "${name}"?`)) {
      this.adminService.deleteEventById(id).subscribe({
        next: () => {
          this.loadEvents();
          this.showToast(`Event "${name}" deleted successfully`, 'success');
        },
        error: (err: HttpErrorResponse) => this.showToast('Error deleting event', 'danger')
      });
    }
  }

  deleteVendorManual(id: number, name: string): void {
    if (!id) return this.showToast('Invalid vendor ID', 'danger');
    if (confirm(`Delete vendor "${name}"?`)) {
      this.adminService.deleteVendorById(id).subscribe({
        next: () => {
          this.loadVendors();
          this.showToast(`Vendor "${name}" deleted successfully`, 'success');
        },
        error: (err: HttpErrorResponse) => this.showToast('Error deleting vendor', 'danger')
      });
    }
  }

  deleteVendorService(id: number, name: string): void {
    if (!id) return this.showToast('Invalid service ID', 'danger');
    if (confirm(`Delete vendor service "${name}"?`)) {
      this.adminService.deleteVendorServiceById(id).subscribe({
        next: () => {
          // Remove from local list
          this.vendorServices = this.vendorServices.filter(
            s => s.vendorServicesId !== id
          );
          
  
          // Reload to stay in sync with DB
          this.loadVendorServices();
  
          this.showToast(`Vendor service "${name}" deleted successfully`, 'success');
        },
        error: (err: HttpErrorResponse) => {
          console.error("Delete vendor service failed:", err);
          this.showToast('Error deleting vendor service', 'danger');
        }
      });
    }
  }

  goToPaymentsCheck() {
    this.router.navigate(['/admin/payments-check']);
  }
  
  

  // ------------------- LOGOUT -------------------
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
