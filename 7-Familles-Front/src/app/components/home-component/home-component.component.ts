import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../../services/game-api/game-api.service';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  gameCode: string = '';

  constructor(private router: Router, private gameApiService: GameApiService) {}

  startGame() {
    if (!this.gameCode.trim()) {
      alert('Veuillez entrer un code de partie valide.');
      return;
    }

    const gameCodeNumber = parseInt(this.gameCode);

    this.gameApiService.validateGameCode(gameCodeNumber).subscribe({
      next: () => {
        console.log('✅ Code valide, création de la partie...');
        this.gameApiService.createGame(gameCodeNumber).subscribe({
          next: () => {
            console.log('✅ Game créée avec succès');
            this.router.navigate(['/game'], { queryParams: { code: this.gameCode } });
          },
          error: (error) => {
            console.error('Erreur création partie:', error);
            alert('Erreur lors de la création de la partie.');
          }
        });
      },
      error: (error) => {
        console.error('Erreur BAAS:', error);
        alert(`Code invalide ou erreur BAAS.`);
      }
    });
  }
}
