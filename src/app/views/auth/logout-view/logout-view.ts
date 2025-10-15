import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  standalone: true,
  selector: 'app-logout-view',
  imports: [],
  templateUrl: './logout-view.html',
  styleUrl: './logout-view.css'
})
export class LogoutView {
  private _auth = inject(AuthService);
  private _router = inject(Router);

  logout() {
    this._auth.logout();
  }

  constructor() {
    this.logout();
  }

}
