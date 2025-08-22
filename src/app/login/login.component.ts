import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  [key: string]: any;
}

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

          // Save tokens
          localStorage.setItem('token', res.accessToken || res.AccessToken);
          localStorage.setItem('refreshToken', res.refreshToken || res.RefreshToken);

          // ✅ Decode JWT to extract userId & role
          const decoded: JwtPayload = jwtDecode(res.accessToken);

          const userId = Number(
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
          );
          const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

          console.log("Decoded UserId:", userId, "Role:", role);

          // Save for later use
          localStorage.setItem('userId', userId.toString());
          localStorage.setItem('role', role);

          // ✅ Call backend to verify role
          this.authService.getRoleStatus(userId).subscribe({
            next: (roleRes: string) => {
              console.log('Role Response:', roleRes);

              if (roleRes === 'Admin') {
                this.router.navigate(['/admin-dashboard']);
              } else if (roleRes === 'User') {
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
