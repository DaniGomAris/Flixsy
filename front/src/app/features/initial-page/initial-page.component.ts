import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 IMPORTANTE para usar [(ngModel)]

@Component({
  selector: 'app-initial-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // 👈 Agregado FormsModule aquí
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent {
  email: string = '';

  constructor(private router: Router) {}

  goToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

}

