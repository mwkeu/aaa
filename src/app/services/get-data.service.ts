import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private apiUrl = 'https://dummyjson.com/products';

  // Yorum verileri
  private reviews = [
    { id: 1, user: 'Ahmet Y.', rating: 5, comment: 'Harika bir ürün, çok memnun kaldım!' },
    { id: 2, user: 'Ayşe K.', rating: 4, comment: 'Kaliteli ama biraz pahalı.' },
    { id: 3, user: 'Mehmet S.', rating: 3, comment: 'Fiyatına göre normal bir ürün.' },
    { id: 4, user: 'Zeynep B.', rating: 5, comment: 'Kesinlikle tavsiye ediyorum!' },
    { id: 5, user: 'Can M.', rating: 4, comment: 'Beklentilerimi karşıladı.' },
    { id: 6, user: 'Elif T.', rating: 5, comment: 'Çok kullanışlı ve şık.' },
    { id: 7, user: 'Burak D.', rating: 3, comment: 'İdare eder.' },
    { id: 8, user: 'Selin A.', rating: 4, comment: 'Güzel ürün, memnun kaldım.' }
  ];

  // Rastgele yorum seçme fonksiyonu
  private getRandomReviews(count: number) {
    return [...this.reviews]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  // Category data 
  categoriesData = [
    {
      id: 1,
      name: 'Kozmetik',
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
      code: 'cosmetics',
    },
    {
      id: 2,
      name: 'Mobilya',
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
      code: 'furniture',
    },
    {
      id: 3,
      name: 'Yemek',
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
      code: 'food',
    },
    {
      id: 4,
      name: 'Pet',
      img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=400&fit=crop',
      code: 'pet',
    },
  ];

  // Product details 
  productData = [
    // Kozmetik ürünleri
    {
      pdId: 1001,
      pdName: "L'Oreal Paris Nemlendirici Krem",
      pdDesc: "24 saat kalıcı nemlendirme etkisi",
      pdPrice: 199,
      pdCategory: "cosmetics",
      pdSubCategory: "skincare",
      pdImg: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      pdRating: 4.5,
      reviews: this.getRandomReviews(3)
    },
    {
      pdId: 1002,
      pdName: "MAC Ruj Seti",
      pdDesc: "Uzun süre kalıcı mat rujlar",
      pdPrice: 599,
      pdCategory: "cosmetics",
      pdSubCategory: "makeup",
      pdImg: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
      pdRating: 4.8,
      reviews: this.getRandomReviews(4)
    },
    {
      pdId: 1003,
      pdName: "Maybelline Maskara",
      pdDesc: "Hacim veren ve uzatan maskara",
      pdPrice: 159,
      pdCategory: "cosmetics",
      pdSubCategory: "makeup",
      pdImg: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=400&h=400&fit=crop",
      pdRating: 4.3,
      reviews: this.getRandomReviews(5)
    },
    // Mobilya ürünleri
    {
      pdId: 2001,
      pdName: "Modern Koltuk Takımı",
      pdDesc: "3+3+1 modern tasarım koltuk takımı",
      pdPrice: 15999,
      pdCategory: "furniture",
      pdSubCategory: "living-room",
      pdImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
      pdRating: 4.7,
      reviews: this.getRandomReviews(3)
    },
    {
      pdId: 2002,
      pdName: "Çalışma Masası",
      pdDesc: "Ergonomik tasarım çalışma masası",
      pdPrice: 2499,
      pdCategory: "furniture",
      pdSubCategory: "office",
      pdImg: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop",
      pdRating: 4.4,
      reviews: this.getRandomReviews(4)
    },
    {
      pdId: 2003,
      pdName: "Yemek Masası Takımı",
      pdDesc: "6 kişilik ahşap yemek masası takımı",
      pdPrice: 8999,
      pdCategory: "furniture",
      pdSubCategory: "dining-room",
      pdImg: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop",
      pdRating: 4.6,
      reviews: this.getRandomReviews(5)
    },
    // Yemek ürünleri
    {
      pdId: 3001,
      pdName: "Organik Meyve Sepeti",
      pdDesc: "Taze organik meyve seçkisi",
      pdPrice: 299,
      pdCategory: "food",
      pdSubCategory: "fruits",
      pdImg: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
      pdRating: 4.5,
      reviews: this.getRandomReviews(4)
    },
    {
      pdId: 3002,
      pdName: "Premium Kahve Çekirdeği",
      pdDesc: "250g özel kavrum kahve çekirdeği",
      pdPrice: 189,
      pdCategory: "food",
      pdSubCategory: "beverages",
      pdImg: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
      pdRating: 4.8,
      reviews: this.getRandomReviews(5)
    },
    // Pet ürünleri
    {
      pdId: 4001,
      pdName: "Royal Canin Köpek Maması",
      pdDesc: "Yetişkin köpekler için premium mama",
      pdPrice: 899,
      pdCategory: "pet",
      pdSubCategory: "dog",
      pdImg: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
      pdRating: 4.6,
      reviews: this.getRandomReviews(4)
    },
    {
      pdId: 4002,
      pdName: "Whiskas Kedi Maması",
      pdDesc: "Tüm yaş grupları için kedi maması",
      pdPrice: 1299,
      pdCategory: "pet",
      pdSubCategory: "cat",
      pdImg: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
      pdRating: 4.7,
      reviews: this.getRandomReviews(3)
    }
  ];

  constructor(private http: HttpClient) {}

  // Tüm ürünleri getir
  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => {
        return response.products.map((product: any) => ({
          pdId: product.id,
          pdName: product.title,
          pdDesc: product.description,
          pdPrice: product.price,
          pdCategory: product.category,
          pdImg: product.thumbnail,
          pdRating: product.rating
        }));
      })
    );
  }

  // Kategorileri getir
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  // Kategori bazlı ürünleri getir
  getProductsByCategory(category: string): Observable<any[]> {
    return of(this.productData.filter(product => 
      product.pdCategory === category
    ));
  }

  // Tekil ürün detayını getir
  getProductById(id: number): Observable<any> {
    const product = this.productData.find(p => p.pdId === id);
    return of(product);
  }

  // Subcategory data
  subCategorisFilterData = [
    { id: 1, categories: 'appliances', subcategories: 'mobile' },
    { id: 2, categories: 'appliances', subcategories: 'smart tv' },
    { id: 3, categories: 'appliances', subcategories: 'air cooler' },
    { id: 4, categories: 'appliances', subcategories: 'refrigerator' },
    { id: 5, categories: 'fashion', subcategories: 'tshirt' },
    { id: 6, categories: 'fashion', subcategories: 'jeans' },
    { id: 7, categories: 'homeandfurniture', subcategories: 'sofa' },
    { id: 8, categories: 'homeandfurniture', subcategories: 'table' },
    { id: 9, categories: 'homeandfurniture', subcategories: 'cover' },
    { id: 10, categories: 'toys', subcategories: 'puzzle' },
    { id: 11, categories: 'toys', subcategories: 'cars' },
    { id: 12, categories: 'toys', subcategories: 'toys' }
  ];

  // Ürün arama fonksiyonu
  searchProducts(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of([]);
    }
    return of(this.productData.filter(product => 
      product.pdName.toLowerCase().startsWith(term.toLowerCase())
    ));
  }

  // Fiyata göre sıralama
  sortProductsByPrice(products: any[], ascending: boolean): any[] {
    return [...products].sort((a, b) => {
      return ascending ? a.pdPrice - b.pdPrice : b.pdPrice - a.pdPrice;
    });
  }
} 