import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './services/data.service';
import { CosmeticComponent, ComponentFamily } from './models/cosmeticComponent.model';
import { CardComponent } from './components/card/card.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CardComponent,
    NgFor,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cosmeticComponents: CosmeticComponent[] = [];
  componentFamilies: (ComponentFamily & { totalComponents: number })[] = [];
  familyDropTargets: { [key: number]: CosmeticComponent[] } = {};
  incorrectAttempts: { [key: number]: number[] } = {};
  selectedComponent: CosmeticComponent | null = null;
  correctPlacements = 0;
  remainingTime = 300;
  intervalId: any;
  isResponsive: boolean = false;
  modalOpen: boolean = false;
  showErrorNotification: boolean = false;
  shakeEffect: boolean = false;
  gameCode: string = '';
  private apiUrl = 'http://127.0.0.1:8000/api/games';

  constructor(
    private dataService: DataService, 
    private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.gameCode = params['code'];
      }
    });

    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());

    this.dataService.getData().subscribe((data) => {
      this.cosmeticComponents = data.cosmeticComponents;

      this.componentFamilies = data.componentFamilies.map(family => ({
        ...family,
        totalComponents: this.cosmeticComponents.filter(c => c.family?.id === family.id).length
      }));

      this.componentFamilies.forEach(family => {
        this.familyDropTargets[family.id] = [];
      });

      this.startTimer();
    });
  }

  checkScreenSize() {
    this.isResponsive = window.innerWidth < 1024;
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(this.intervalId);
        this.endGame(false);
      }
    }, 1000);
  }

  openModal(component: CosmeticComponent) {
    this.selectedComponent = component;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  selectFamily(family: ComponentFamily) {
    if (!this.selectedComponent) return;

    if (this.selectedComponent.family?.id === family.id) {
      this.selectedComponent.validated = true;
      this.correctPlacements++;
      this.familyDropTargets[family.id].push(this.selectedComponent);
      this.cosmeticComponents = this.cosmeticComponents.filter(c => c.id !== this.selectedComponent!.id);
    } else {
      if (!this.incorrectAttempts[this.selectedComponent.id]) {
        this.incorrectAttempts[this.selectedComponent.id] = [];
      }
      this.incorrectAttempts[this.selectedComponent.id].push(family.id);
      this.remainingTime = Math.max(0, this.remainingTime - 10);

      this.showErrorNotification = true;
      setTimeout(() => this.showErrorNotification = false, 2000);
      this.shakeEffect = true;
      setTimeout(() => this.shakeEffect = false, 500);
    }

    this.selectedComponent = null;
    this.modalOpen = false;
    this.checkGame();
  }

  checkGame() {
    const allFamiliesComplete = this.componentFamilies.every(family => 
      this.familyDropTargets[family.id].length === family.totalComponents
    );

    if (allFamiliesComplete) {
      clearInterval(this.intervalId);
      this.endGame(true); 
    }
  }

  
  // Externaliser les call d'api dans un dossier API
  endGame(isWin: boolean) {
    if (!this.gameCode) return;
  
    const updateData = {
      iswin: isWin,
      endDate: new Date().toISOString()
    };
  
    const baasUrl = 'http://localhost:3000/validate-stage';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer 1 fmJYravPGbIwwnbUeNsF83ZC ${this.gameCode}`
    });
  
    const baasData = {
      completed: isWin
    };
  
    this.http.patch(`${this.apiUrl}/update/${this.gameCode}`, updateData, { headers })
      .subscribe({
        next: () => {
          console.log(`✅ Partie mise à jour dans Symfony: ${isWin ? 'Victoire' : 'Défaite'}`);
  
          this.http.post(baasUrl, baasData, { headers }).subscribe({
            next: () => {
              console.log('✅ BAAS validé');
              this.router.navigate([isWin ? '/victory' : '/defeat']);
            },
            error: (error) => {
              console.error('Erreur BAAS:', error);
              alert('Erreur lors de la validation BAAS.');
            }
          });
  
        },
        error: (error) => {
          console.error('Erreur mise à jour Symfony:', error);
          alert('Erreur lors de la mise à jour de la partie.');
        }
      });
  }
  
  

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
