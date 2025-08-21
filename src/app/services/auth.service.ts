import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5239/api/auth'; // match your Program.cs HTTPS port

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/${userId}`, {});
  }

  getRole(userId: number) {
    return this.http.get<any>(`${this.apiUrl}/role-status/${userId}`);
  }
  
  getRoleStatus(userId: number): Observable<any> {
    return this.http.get(`http://localhost:5239/api/auth/role-status/${userId}`, { responseType: 'text' });
  }  

  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
