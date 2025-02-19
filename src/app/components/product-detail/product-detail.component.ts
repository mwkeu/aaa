import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  comments = [
    { id: 1, user: 'Ahmet Y.', rating: 5, comment: 'Harika bir ürün, çok memnun kaldım!' },
    { id: 2, user: 'Ayşe K.', rating: 4, comment: 'Kaliteli ama biraz pahalı.' },
    // Daha fazla yorum eklenebilir
  ];
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: GetDataService,
    private cartService: CartService,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getProductById(id).subscribe(product => {
      this.product = product;
      this.comments = this.product?.reviews || [];
    });
  }

  getRatingStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    this.cartService.addToCart({
      ...this.product,
      quantity: this.quantity
    });
  }

  updateQuantity(change: number) {
    this.quantity = Math.max(1, this.quantity + change);
  }
}
