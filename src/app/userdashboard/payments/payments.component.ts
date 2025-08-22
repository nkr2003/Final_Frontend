import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentForm!: FormGroup;
  payments: any[] = [];
  showCardFields: boolean = false;
  cardAdded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const amountFromCart = this.route.snapshot.queryParamMap.get('amount');

    this.paymentForm = this.fb.group({
      amount: [amountFromCart || '', Validators.required],
      method: ['', Validators.required],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });

    // Detect method change to show/hide card fields
    this.paymentForm.get('method')?.valueChanges.subscribe(method => {
      if (method === 'CreditCard' || method === 'DebitCard') {
        this.showCardFields = true;
        this.cardAdded = false; // Reset card added state

        this.paymentForm.get('cardNumber')?.setValidators([
          Validators.required,
          Validators.pattern(/^\d{16}$/)
        ]);
        this.paymentForm.get('expiry')?.setValidators([
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
        ]);
        this.paymentForm.get('cvv')?.setValidators([
          Validators.required,
          Validators.pattern(/^\d{3}$/)
        ]);
      } else {
        this.showCardFields = false;
        this.cardAdded = true; // No card needed, mark as added
        this.paymentForm.get('cardNumber')?.clearValidators();
        this.paymentForm.get('expiry')?.clearValidators();
        this.paymentForm.get('cvv')?.clearValidators();
      }

      this.paymentForm.get('cardNumber')?.updateValueAndValidity();
      this.paymentForm.get('expiry')?.updateValueAndValidity();
      this.paymentForm.get('cvv')?.updateValueAndValidity();
    });
  }

  addCard() {
    const cardValid = this.paymentForm.get('cardNumber')?.valid &&
                      this.paymentForm.get('expiry')?.valid &&
                      this.paymentForm.get('cvv')?.valid;

    if (cardValid) {
      this.cardAdded = true; // Show card added success message
    }
  }

  onSubmit() {
    // Only allow submission if card added (for card payments)
    if (this.paymentForm.valid && (this.cardAdded || !this.showCardFields)) {
      const newPayment = {
        paymentId: this.payments.length + 1,
        userId: 1,
        amount: this.paymentForm.value.amount,
        method: this.paymentForm.value.method,
        cardNumber: this.paymentForm.value.cardNumber || null,
        expiry: this.paymentForm.value.expiry || null,
        cvv: this.paymentForm.value.cvv || null,
        paidAt: new Date()
      };

      this.payments.push(newPayment);
      this.paymentForm.reset();
      this.showCardFields = false;
      this.cardAdded = false;

      // Navigate to payment success page
      this.router.navigate(['/payment-success']);
    }
  }
}
