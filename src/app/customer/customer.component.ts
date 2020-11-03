import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.customerService.form.controls;
   userName='manoj';     //user email should be assaigned here


  onSubmit() {
    this.submitted = true;
    if (this.customerService.form.valid) {
      if (this.customerService.form.get('$key').value == null)
        this.customerService.insertCustomer(this.customerService.form.value);
      else
        this.customerService.updateCustomer(this.customerService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.customerService.form.reset();
      //this is to be done for proper reset operation
      this.customerService.form.setValue({
        $key: null,
        fullName: '',
        description: '',
        cost: '',
        location: ''
      });
    }
  }



  customerArray = [];
  cartArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";
  cartKey=false;
  listKey=true;
  addKey=false;
  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      list => {
        this.customerArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });

      this.customerService.getCarts().subscribe(
        list => {
          this.cartArray = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
        });

  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.customerService.deleteCustomer($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  onDeleteCart($key,c) {
    if (confirm('Are you sure to delete this record ?')) {
      this.customerService.deleteCart($key);
    }
  }
showCart(){
  this.listKey=false;
  this.addKey=false;
  this.cartKey=true;
}
showList(){
  this.listKey=true;
  this.addKey=false;
  this.cartKey=false;
}
showAdd(){
  this.cartKey=false;
  this.listKey=false;
  this.addKey=true;
}

  sum=0
  onCart(a,b,c,d,$key) {
    alert('added to cart')
        this.customerService.insertCart(a,b,c,d,this.userName);
  }
  show=false;


adds(){
  this.show=!this.show;
}

countI
countS
more(n){
  this.countI=Number(n.num)
  this.countI=this.countI+1
  this.countS=String(this.countI)
  this.customerService.updateCartPlus(n,this.countS)
}


less(n){
  this.countI=Number(n.num)
  if(this.countI>1){
      this.countI=this.countI-1
  this.countS=String(this.countI)
  this.customerService.updateCartMinus(n,this.countS)
}
}

cartShow=true;
sumShow=false;
cartLength;
goProceed(){
  this.cartLength=0;
  this.cartShow=false;
  this.sumShow=true;
  let i;
  this.sum=0;
  for(i=0;i<this.cartArray.length;i++){
    if(this.cartArray[i].user===this.userName){
    this.sum=this.sum+(Number(this.cartArray[i].cost)*Number(this.cartArray[i].num));
    this.cartLength=this.cartLength+Number(this.cartArray[i].num);
  }
  }
}

goBack(){
  this.cartShow=true;
  this.sumShow=false;
}

buy(){
  alert("Ordered Successfully!!!!! \n Buy more.....");
  this.listKey=true;
  this.addKey=false;
  this.cartKey=false;
  this.cartShow=true;
  this.sumShow=false;
  this.sum=0;
  let i;
  for(i=0;i<this.cartArray.length;i++){
    if(this.cartArray[i].user===this.userName){
      this.customerService.deleteCartAll(this.cartArray[i].$key);
  }
}
}

checkEmpty(){
  let i;
  let j=0;
  for(i=0;i<this.cartArray.length;i++){
    if(this.cartArray[i].user===this.userName){
      j=j+1;
    }
  }
    if(j>0){
      return false;
    }
    else{
      return true;
    }
}

  filterCondition(customer) {
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }



filterUser(user){
  if(user===this.userName){
    return true;
  }
  else{
    return false;
  }
}

}
