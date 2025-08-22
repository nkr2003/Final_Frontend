import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    passwordHash: '',
    phoneNumber: '',
    roleId: null
  };

  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.message = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Registration failed. Please try again.';
      }
    });
  }
}
