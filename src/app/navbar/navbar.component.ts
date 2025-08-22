import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = true; // Replace with actual auth check

  constructor(private router: Router) {}

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // redirect to login page
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
