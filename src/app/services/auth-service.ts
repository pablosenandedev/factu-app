import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { map, tap } from 'rxjs';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Auth {
  token: string;
  user: User;
  token_type: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private http = inject(HttpClient);

  public token = localStorage.getItem('token') || '';
  private apiUrl = 'http://127.0.0.1:8000/api/v1';

  login(data: LoginData) {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      map(response => response.data as Auth),
      tap((auth: Auth) => {
        this.token = auth.token;
        localStorage.setItem('token', this.token);
      })
    );
  }

  register(data: RegisterData) {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      map(response => response.data as Auth),
      tap((auth: Auth) => {
        this.token = auth.token;
        localStorage.setItem('token', this.token);
      })
    );
  }

  logout() {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${this.token}` }
    }).pipe(
      tap(() => {
        this.token = '';
        localStorage.removeItem('token');
      })
    );
  }

}
