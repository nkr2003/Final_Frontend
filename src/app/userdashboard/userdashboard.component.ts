import { Component, OnInit } from '@angular/core';
import { CartService, EventCategory } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  events: EventCategory[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getEventCategories().subscribe({
      next: data => this.events = data,
      error: err => console.error(err)
    });
  }

  openEvent(eventId: number) {
    console.log('Navigating to vendors for event:', eventId);
    this.router.navigate(['/vendors', eventId]);
  }
  
}
