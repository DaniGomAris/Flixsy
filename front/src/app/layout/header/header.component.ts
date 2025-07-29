import {Component, ElementRef, ViewChild, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class HeaderComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  showResults = false;

  @ViewChild('searchContainer') searchContainer!: ElementRef;

  constructor(
    private router: Router,
    private movieService: MovieService
  ) {}

  onSearch(): void {
    const query = this.searchTerm.trim();
    if (!query) return;

    this.movieService.searchMovie(query).subscribe((res) => {
      this.searchResults = res.Search || [];
      this.showResults = true;
    });
  }

  goToMovie(imdbID: string): void {
    this.router.navigate(['/movie-info', imdbID]);
    this.clearSearch();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.showResults = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (
      this.searchContainer &&
      !this.searchContainer.nativeElement.contains(event.target)
    ) {
      this.showResults = false;
    }
  }
}
