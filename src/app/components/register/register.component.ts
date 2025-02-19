import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {
    fullName: '',
    birthDate: '', // string olarak tarih
    email: '',
    password: '',
    confirmPassword: ''
  };
  error: string = '';
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  onSubmit() {
    this.submitted = true;

    if (!this.user.fullName || !this.user.email || !this.user.password || !this.user.confirmPassword) {
      this.error = 'Tüm alanları doldurunuz';
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.error = this.translate.instant('REGISTER.PASSWORD_MISMATCH');
      return;
    }

    const newUser = {
      id: 0,
      fullName: this.user.fullName,
      birthYear: this.user.birthDate ? new Date(this.user.birthDate).getFullYear() : null,
      email: this.user.email,
      password: this.user.password
    };

    if (this.authService.register(newUser)) {
      this.router.navigate(['/login']);
    } else {
      this.error = this.translate.instant('REGISTER.EMAIL_EXISTS');
    }
  }
}
