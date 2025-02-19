import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  
  cartItems$ = this.cartSubject.asObservable();
  
  constructor(private authService: AuthService) {
    // LocalStorage'dan sepet verilerini yükle
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  addToCart(product: any) {
    if (!this.authService.isLoggedIn()) {
      throw new Error('LOGIN_REQUIRED');
    }
    
    const existingItem = this.cartItems.find(item => item.pdId === product.pdId);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + (product.quantity || 1);
    } else {
      this.cartItems.push({ ...product, quantity: product.quantity || 1 });
    }
    
    this.updateCart();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.pdId !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.pdId === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.pdPrice * item.quantity), 0);
  }

  private updateCart() {
    this.cartSubject.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }
} 