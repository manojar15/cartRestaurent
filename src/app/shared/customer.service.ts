import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;
  cartList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    description: new FormControl(''),
    cost: new FormControl(''),
    location: new FormControl('')
  });


  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  getCarts() {
    this.cartList = this.firebase.list('carts');
    return this.cartList.snapshotChanges();
  }


  insertCustomer(customer) {
    this.customerList.push({
      fullName: customer.fullName,
      description: customer.description,
      cost: customer.cost,
      location: customer.location
    });
  }

  insertCustomerOnCart(a,b,c,d) {
    this.customerList.push({
      fullName: a,
      description: b,
      cost: c,
      location: d
    });
  }

  num1:string;
  insertCart(a,b,c,d,e) {
    this.num1='1';
    this.cartList.push({
      fullName: a,
      description: b,
      cost: c,
      location: d,
      num:this.num1,
      user: e
    });
  }


  populateForm(customer) {
    this.form.setValue(customer);
  }


  updateCustomer(customer) {
    this.customerList.update(customer.$key,
      {
        fullName: customer.fullName,
        description: customer.description,
        cost: customer.cost,
        location: customer.location
      });
  }

  updateCartPlus(customer,s) {
    this.cartList.update(customer.$key,
      {
        fullName: customer.fullName,
        description: customer.description,
        cost: customer.cost,
        location: customer.location,
        num: s
      });
  }

  updateCartMinus(customer,s) {
    this.cartList.update(customer.$key,
      {
        fullName: customer.fullName,
        description: customer.description,
        cost: customer.cost,
        location: customer.location,
        num: s
      });
  }

  deleteCustomer($key: string) {
    this.customerList.remove($key);
  }


  deleteCart($key: string) {
    this.cartList.remove($key);
  }

  deleteCartAll(i) {
    this.cartList.remove(i);
  }

}
