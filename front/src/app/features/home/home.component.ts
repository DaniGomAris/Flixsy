import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { HeaderComponent } from '../../layout/header/header.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  genres: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Documentary',
    'Thriller',
    'Animation',
    'Crime'
  ];
  moviesByGenre: { [key: string]: any[] } = {};

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.genres.forEach(genre => {
      this.movieService.getMoviesByGenre(genre).subscribe(res => {
        this.moviesByGenre[genre] = res.Search || [];
      });
    });
  }

   goToMovie(imdbID: string): void {
    this.router.navigate(['/movie-info', imdbID]);
  }
}
