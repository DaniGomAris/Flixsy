import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly apiKey = '5b59bc7a';
  private readonly apiUrl = 'https://www.omdbapi.com/';

  constructor(private readonly http: HttpClient) {}

  searchMovie(titulo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?apikey=${this.apiKey}&s=${titulo}`);
  }

  ObtainDetails(imdbID: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?apikey=${this.apiKey}&i=${imdbID}`);
  }

  getMoviesByGenre(genre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?apikey=${this.apiKey}&s=${genre}`);
  }
}
