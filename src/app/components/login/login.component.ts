import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  onSubmit() {
    console.log('Login attempted', { email: this.email }); // Debug için

    if (!this.email || !this.password) {
      this.error = 'E-posta ve şifre gereklidir';
      return;
    }

    try {
      const success = this.authService.login(this.email, this.password);
      if (success) {
        alert('Giriş başarılı!');
        this.router.navigate(['/']);
      } else {
        this.error = this.translate.instant('LOGIN.ERROR');
      }
    } catch (error) {
      console.error('Login error:', error);
      this.error = 'Giriş sırasında bir hata oluştu';
    }
  }
}
