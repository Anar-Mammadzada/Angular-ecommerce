import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup!: FormGroup;

  totalPrice : number = 0;
  totalQuantity : number = 0;

  creaditCardYears : number[] = [];
  creditCardMonths : number[] = [];

  constructor(private fb: FormBuilder, private formService : Luv2ShopFormService) { }


  ngOnInit(): void {
    this.checkoutFormGroup = this.fb.group({
      customer: this.fb.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.fb.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""]
      }),
      billingAddress: this.fb.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""]
      }),
      creditCard: this.fb.group({
        cardType: [""],
        nameOnCard: [""],
        cardNumber: [""],
        securityCode: [""],
        expirationMonth: [""],
        expirationYear: [""]
      })
    });

    //credit card months

    const startMonth : number = new Date().getMonth() + 1;
    console.log("Start Month : " + startMonth);

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // credit card years

    this.formService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved creadit card years : " + JSON.stringify(data));
        this.creaditCardYears = data;
      }
    );

  }

  copyShippingAddressToBillingAddress(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkoutFormGroup.get("billingAddress")?.setValue(this.checkoutFormGroup.get("shippingAddress")?.value);
    } else {
      this.checkoutFormGroup.get("billingAddress")?.reset();
    }
  }

  onSubmit() {
    console.log("Handling the submit button.");
    console.log(this.checkoutFormGroup.get("customer")?.value);
    console.log(this.checkoutFormGroup.get("customer")?.value.email);
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");
    const currentYear : number = new Date().getFullYear();
    const selectedYear : number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth : number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        console.log("Retreived credit card months : " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

}
