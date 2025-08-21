import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    passwordHash: ''  
  };

  message = '';

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router
  ) {}

  onLogin(): void {
    this.http.post<any>('http://localhost:5239/api/auth/login', this.loginData)
      .subscribe({
        next: (res) => {
          console.log('Login response:', res);

          const userId = res.userId || res.UserId;
          localStorage.setItem('token', res.accessToken || res.AccessToken);
          localStorage.setItem('refreshToken', res.refreshToken || res.RefreshToken);
          localStorage.setItem('userId', userId);

          // ✅ Fetch role after login
          this.authService.getRoleStatus(userId).subscribe({
            next: (role: string) => {
              console.log('Role Response:', role);

              if (role === 'Admin') {
                this.router.navigate(['/admin-dashboard']);
              } else if (role === 'User') {
                this.router.navigate(['/user-dashboard']);
              } else {
                this.message = 'Unknown role. Contact support.';
              }
            },
            error: (err) => {
              console.error('Role fetch error:', err);
              this.message = 'Error fetching user role.';
            }
          });
        },
        error: (err) => {
          console.error('Login error:', err);
          this.message = 'Invalid login credentials.';
        }
      });
  }
}
