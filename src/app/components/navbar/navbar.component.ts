import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { TranslateService } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

declare var bootstrap: any; // Bootstrap'i TypeScript'e tanıtalım

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchTerm: string = '';
  searchResults: any[] = [];
  showResults: boolean = false;
  isDarkTheme: boolean = false;
  categories: any[] = [];
  currentLang: string = 'tr';
  currentUser: any = null;
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private dataService: GetDataService,
    private translate: TranslateService,
    private decimalPipe: DecimalPipe,
    private authService: AuthService,
    private cartService: CartService
  ) {
    // Dil ayarları
    this.translate.addLangs(['tr', 'en']);
    this.translate.setDefaultLang('tr');

    // Kaydedilmiş dil tercihi varsa onu kullan
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && ['tr', 'en'].includes(savedLang)) {
      this.currentLang = savedLang;
      this.translate.use(savedLang);
    }

    // Kullanıcı ve sepet takibi
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  ngOnInit() {
    // Bootstrap dropdown'ları aktifleştir
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    const dropdownList = Array.from(dropdownElementList).map(dropdownToggleEl => 
      new bootstrap.Dropdown(dropdownToggleEl)
    );
    
    // Kategorileri yükle
    this.categories = this.dataService.categoriesData.map(category => ({
      ...category,
      name: this.translate.instant(`CATEGORIES.${category.code}`)
    }));
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    if (term.length > 2) {
      this.dataService.searchProducts(term).subscribe(results => {
        this.searchResults = results;
        this.showResults = true;
      });
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  selectProduct(productId: number) {
    console.log('Selecting product:', productId); // Debug için
    this.searchTerm = '';
    this.showResults = false;
    this.router.navigate(['/product', productId]);
  }

  onSearchBlur() {
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme');
  }

  selectCategory(category: any) {
    this.router.navigate(['/category', category.code]);
  }

  changeLanguage(lang: string) {
    console.log('Changing language to:', lang); // Debug için
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('preferredLanguage', lang);

    // Sayfayı yenile
    window.location.reload();
  }

  openLoginModal() {
    console.log('openLoginModal called');
    this.router.navigate(['/login']);
  }

  goToProfile() {
    console.log('goToProfile called');
    if (this.currentUser) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openCart() {
    if (this.currentUser) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}