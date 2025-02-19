import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  addToCart(event: Event) {
    event.stopPropagation();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      this.cartService.addToCart(this.product);
      alert('Ürün sepete eklendi!');
    } catch (error: any) {
      if (error.message === 'LOGIN_REQUIRED') {
        this.router.navigate(['/login']);
      }
    }
  }

  viewDetails() {
    this.router.navigate(['/product', this.product.pdId]);
  }

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}