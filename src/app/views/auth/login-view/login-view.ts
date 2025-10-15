import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginData, Auth } from '../../../services/auth-service';

@Component({
  standalone: true,
  selector: 'app-login-view',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login-view.html',
  styleUrl: './login-view.css'
})
export class LoginView {

  private _auth = inject(AuthService);
  private _router = inject(Router);

  form = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.form.valid) {

      const LoginData: LoginData = {
        email: this.form.value.email!,
        password: this.form.value.password!,
      };

      this._auth.login(LoginData).subscribe({
        next: (response: Auth) => {
          this._router.navigate(['/admin/home']);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });

    } else {
      console.log('Form not valid');
    }
  }
}
