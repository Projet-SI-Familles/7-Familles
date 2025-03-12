import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/games';
  private baasUrl = 'http://localhost:3000/validate-stage';
  private baasAuth = 'Bearer 1 fmJYravPGbIwwnbUeNsF83ZC';
  private symfonyApiUrl = 'http://127.0.0.1:8000/api/game/create';
  private baasApiUrl = 'http://localhost:3000/get-code-validity';

  constructor(private http: HttpClient) {}

  /**
   * Vérifie si le code de partie est valide via le BAAS
   */
  validateGameCode(gameCode: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer 1 fmJYravPGbIwwnbUeNsF83ZC`
    });

    return this.http.post(this.baasApiUrl, { code: gameCode }, { headers });
  }

  /**
   * Crée une partie en Symfony après validation du code
   */
  createGame(gameCode: number): Observable<any> {
    const gameData = {
      codepartie: gameCode,
      startDate: new Date().toISOString(),
      endDate: null,
      iswin: null
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.symfonyApiUrl, gameData, { headers });
  }

  /**
   * Mettre à jour une partie (victoire ou défaite)
   * @param gameCode Code de la partie
   * @param isWin Indique si la partie est gagnée
   * @returns Observable avec la réponse du serveur
   */
  updateGame(gameCode: string, isWin: boolean): Observable<any> {
    const updateData = {
      iswin: isWin,
      endDate: new Date().toISOString()
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.patch(`${this.apiUrl}/update/${gameCode}`, updateData, { headers });
  }

  /**
   * Valider la fin d'une partie auprès du BAAS
   * @param gameCode Code de la partie
   * @param isWin Indique si la partie est gagnée
   * @returns Observable avec la réponse du BAAS
   */
  validateGameWithBaas(gameCode: string, isWin: boolean): Observable<any> {
    const baasData = {
      completed: isWin
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.baasAuth} ${gameCode}`
    });

    return this.http.post(this.baasUrl, baasData, { headers });
  }
}
