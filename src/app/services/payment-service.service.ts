import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payment {
  paymentId?: number;
  userId: number;
  amount: number;
  method: string;
  paidAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiUrl = 'http://localhost:5000/api/payments'; // adjust base URL

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  createPayment(payment: Payment): Observable<any> {
    return this.http.post(this.apiUrl, payment);
  }
}
