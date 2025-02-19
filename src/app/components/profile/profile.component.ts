import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  isEditing: boolean = false;
  editedUser: any = {};
  birthDate: string = '';

  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.birthDate = this.user.birthYear ? 
      `${this.user.birthYear}-01-01` : '';
    
    this.editedUser = {
      ...this.user,
      birthDate: this.birthDate
    };
  }

  startEditing() {
    this.isEditing = true;
    this.editedUser = {
      ...this.user,
      birthDate: this.birthDate
    };
  }

  saveChanges() {
    // Tarihten yıl bilgisini al
    const birthYear = this.editedUser.birthDate ? 
      new Date(this.editedUser.birthDate).getFullYear() : null;

    const updatedUser = {
      ...this.user,
      fullName: this.editedUser.fullName,
      birthYear: birthYear,
      birthDate: this.editedUser.birthDate
    };

    // Kullanıcı bilgilerini güncelle
    this.authService.updateUserProfile(updatedUser);
    
    // Local state'i güncelle
    this.user = updatedUser;
    this.birthDate = this.editedUser.birthDate;
    
    // Düzenleme modunu kapat
    this.isEditing = false;

    // LocalStorage'ı güncelle
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }

  cancelEditing() {
    this.isEditing = false;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
} 