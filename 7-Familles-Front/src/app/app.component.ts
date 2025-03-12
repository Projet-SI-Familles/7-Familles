import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './services/data.service';
import { CosmeticComponent, ComponentFamily } from './models/cosmeticComponent.model';
import { GameApiService } from './services/game-api/game-api.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { FamilyComponent } from './components/family/family.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    GameBoardComponent,
    FamilyComponent
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

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private gameApiService: GameApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.gameCode = params['code'];
      }
    });
  
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  
    this.dataService.getData().subscribe({
      next: ({ cosmeticComponents, componentFamilies }) => {
        this.cosmeticComponents = cosmeticComponents;
        this.componentFamilies = componentFamilies.map(family => ({
          ...family,
          totalComponents: cosmeticComponents.filter(c => c.family?.id === family.id).length
        }));
  
        this.familyDropTargets = this.componentFamilies.reduce((acc, family) => {
          acc[family.id] = [];
          return acc;
        }, {} as { [key: number]: CosmeticComponent[] });
  
        this.startTimer();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Erreur de chargement des composants et familles.');
      }
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

  endGame(isWin: boolean) {
    if (!this.gameCode) return;

    this.gameApiService.updateGame(this.gameCode, isWin).subscribe({
      next: () => {
        console.log(`Partie mise à jour dans Symfony: ${isWin ? 'Victoire' : 'Défaite'}`);

        this.gameApiService.validateGameWithBaas(this.gameCode, isWin).subscribe({
          next: () => {
            console.log('BAAS validé');
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
