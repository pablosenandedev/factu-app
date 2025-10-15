import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RegisterData } from '../../../services/auth-service';

@Component({
  standalone: true,
  selector: 'app-register-view',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register-view.html',
  styleUrl: './register-view.css'
})
export class RegisterView {

  private _auth = inject(AuthService);
  private _router = inject(Router);

  form = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'confirm-password': new FormControl('', [Validators.required]),
    'terms': new FormControl(false, [Validators.requiredTrue])
  });

  onSubmit() {
    if (this.form.valid) {

      if (this.form.value.password !== this.form.value['confirm-password']) {
        console.log('Passwords do not match');
        return;
      }

      const registerData: RegisterData = {
        name: this.form.value.name!,
        email: this.form.value.email!,
        password: this.form.value.password!,
        password_confirmation: this.form.value['confirm-password']!
      };
      
      this._auth.register(registerData).subscribe({
        next: (response) => {
          this._router.navigate(['/login']);
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
