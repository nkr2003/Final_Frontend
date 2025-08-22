import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  showSuccess: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulate loading delay (e.g., 2 seconds)
    setTimeout(() => {
      this.showSuccess = true;
    }, 2000);
  }

  goToHome() {
    this.router.navigate(['/']); // Navigate to home/cart/booking page
  }
}
