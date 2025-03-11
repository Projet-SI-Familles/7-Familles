import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  gameCode: string = '';
  private symfonyApiUrl = 'http://127.0.0.1:8000/api/game/create';
  private baasApiUrl = 'http://localhost:3000/get-code-validity';

  constructor(private router: Router, private http: HttpClient) {}

  // Externaliser les call d'api dans un dossier API
  startGame() {
    if (!this.gameCode.trim()) {
      alert('Veuillez entrer un code de partie valide.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer 1 fmJYravPGbIwwnbUeNsF83ZC`
    });

    this.http.post(this.baasApiUrl, { code: parseInt(this.gameCode) }, { headers }).subscribe({
      next: () => {
        console.log('✅ Code valide, création de la partie...');
        this.createGame();
      },
      error: (error) => {
        console.error('Erreur BAAS:', error);
        alert(`Code invalide ou erreur BAAS.`);
      }
    });
  }

  private createGame() {
    const gameData = {
      codepartie: parseInt(this.gameCode),
      startDate: new Date().toISOString(),
      endDate: null,
      iswin: null
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.symfonyApiUrl, gameData, { headers }).subscribe({
      next: (response) => {
        console.log('✅ Game créée avec succès:', response);
        this.router.navigate(['/game'], { queryParams: { code: this.gameCode } });
      },
      error: (error) => {
        console.error('Erreur lors de la création de la game:', error);
        alert('Erreur lors de la création de la partie.');
      }
    });
  }
}
