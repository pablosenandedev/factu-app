import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('factu-app');

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api/v1';
  private meUrl = `${this.apiUrl}/auth/me`;

  constructor() {
    this.http.get<{ message: string }>(this.meUrl ).subscribe({
      next: (response) => {
        this.title.set(response.message);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

}
