import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get<any[]>(`${this.apiUrl}/`, { headers });
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.delete<any>(`${this.apiUrl}/${userId}`, { headers });
  }

  updateUser(userId: string, data: any): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.put<any>(`${this.apiUrl}/${userId}`, data, { headers });
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/login`, credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.access_token);
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  getLoggedUser(): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }
}
