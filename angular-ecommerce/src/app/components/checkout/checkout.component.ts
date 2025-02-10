import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{


  checkoutFormGroup! : FormGroup;

  constructor(private fb : FormBuilder){}


  ngOnInit(): void {
    this.checkoutFormGroup = this.fb.group({
      customer : this.fb.group({
        firstName : [''],
        lastName : [''],
        email : ['']
      }),
      shippingAddess : this.fb.group({
        street : [""],
        city : [""],
        state : [""],
        country : [""],
        zipCode : [""]
      }),
      billingAddress : this.fb.group({
        street : [""],
        city : [""],
        state : [""],
        country : [""],
        zipCode : [""]
      }),
      creditCard : this.fb.group({
        cardType : [""],
        nameOnCard : [""],
        cardNumber : [""],
        securityCode : [""],
        expirationMonth : [""],
        expirationYear : [""]
      })
    });
  }

  onSubmit(){
    console.log("Handling the submit button.");
    console.log(this.checkoutFormGroup.get("customer")?.value);
    console.log(this.checkoutFormGroup.get("customer")?.value.email);
  }

}
