import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [FormsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  constructor(private router: Router) {}
  gameCode: string = '';


  startGame() {
    if (this.gameCode.trim()) {
      this.router.navigate(['/game'], { queryParams: { code: this.gameCode } });
    } else {
      alert('Veuillez entrer un code de partie valide.');
    }
  }
}
