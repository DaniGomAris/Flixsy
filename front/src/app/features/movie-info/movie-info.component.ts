import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Location, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const imdbID = this.route.snapshot.paramMap.get('imdbID');
    if (imdbID) {
      this.movieService.ObtainDetails(imdbID).subscribe((res) => {
        this.movie = res;
      });
    }
  }
}
