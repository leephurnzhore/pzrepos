import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
//import {FirebaseListObservable} from 'angularfire2/database';
import {CartService} from '../../providers/cart.service';
import {AuthService} from '../../providers/auth-service';
import {BeerChickenPage} from '../../pages/beerchicken/beerchicken';
//import {BillingPage} from '../billing/billing';
import { Cart } from '../../models/cart';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  //providers: [CartService,AuthService]
})
export class CartPage {
  
  cart: Cart[];
  cartItem : Cart;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cartService: CartService,
              public authService: AuthService
             ) {
               
      cartService.loadCartList(this.authService.getLoggedUID());
      this.cart = this.cartService.cartItems;
      console.log(this.cart);
      
      


  }


  ngOnInit() {

    this.cartService.loadCartList("leephurnzhore@gmail.com")

      .subscribe(cartItem => {

        this.cart = cartItem;

      });
      console.log(this.cart);
    }

  

  ionViewDidLoad() {
    
  }



  increment(item : any) : void {
    item.quantity= item.quantity++;
    this.cartService.updateCartItem(item);
  }
  decrement(item : any) : void {
    if (item.quantity < 1) {
    item.quantity= item.quantity--;
    this.cartService.updateCartItem(item);
    this.cartService.removeCartItem(item);
    }
    else{
      alert("Quantity cannot be below 1.")


    }

    }
  

  remove(item : any) : void {
    this.cartService.removeCartItem(item);
  }
 
  update(item : any) : void {
    this.cartService.updateCartItem(item);
  }
 

  checkout() : void {
   // this.navCtrl.push(BillingPage);
  }

  goBack() {
      this.navCtrl.pop();
  }

}
