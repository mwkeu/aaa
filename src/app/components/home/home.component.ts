import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string = '';
  sortOrder: 'asc' | 'desc' | null = null;
  categories: any[] = [];  // Kategoriler için yeni property

  constructor(
    private dataService: GetDataService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();  // Kategorileri yükle
    
    // URL'deki kategori parametresini dinle
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.filterByCategory(params['category']);
      }
    });

    // Dil değişikliğini dinle
    this.translate.onLangChange.subscribe(() => {
      this.updateProductTranslations();
    });
  }

  loadCategories() {
    this.categories = this.dataService.categoriesData;
  }

  loadProducts() {
    this.products = this.dataService.productData.map(product => ({
      ...product,
      pdName: this.translate.instant(`PRODUCTS.${product.pdId}`),
      pdDesc: this.translate.instant(`PRODUCTS.${product.pdId}_DESC`)
    }));
    this.filteredProducts = [...this.products];
  }

  updateProductTranslations() {
    this.products = this.products.map(product => ({
      ...product,
      pdName: this.translate.instant(`PRODUCTS.${product.pdId}`),
      pdDesc: this.translate.instant(`PRODUCTS.${product.pdId}_DESC`)
    }));
    this.filteredProducts = this.products;
  }

  filterByCategory(category: string) {
    if (this.selectedCategory === category) {
      // Aynı kategoriye tekrar tıklandığında filtreyi kaldır
      this.selectedCategory = '';
      this.filteredProducts = this.products;
    } else {
      this.selectedCategory = category;
      this.filteredProducts = this.products.filter(
        product => product.pdCategory === category
      );
    }
  }

  sortByPrice(ascending: boolean) {
    if (this.sortOrder === (ascending ? 'asc' : 'desc')) {
      // Aynı sıralama butonuna tekrar tıklandığında sıralamayı iptal et
      this.sortOrder = null;
      this.filteredProducts = [...this.products]; // Orijinal sıralamaya dön
    } else {
      this.sortOrder = ascending ? 'asc' : 'desc';
      this.filteredProducts = this.dataService.sortProductsByPrice(
        this.filteredProducts, 
        ascending
      );
    }
  }

  navigateToDetail(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}