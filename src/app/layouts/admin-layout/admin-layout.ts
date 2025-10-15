import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  imports: [RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {
  private _auth = inject(AuthService);
  private _router = inject(Router);

  logout() {
    this._auth.logout().subscribe({
      next: () => {
        this._router.navigate(['/login']);
      },
      error: (error) => {
        console.error('There was an error during logout!', error);
      }
    });
  }

}
