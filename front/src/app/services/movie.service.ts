import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:5000/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  createMovie(movieData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, movieData);
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${movieId}`);
  }

  updateMovie(movieId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${movieId}`, data);
  }
}
