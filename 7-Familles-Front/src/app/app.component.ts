import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { CosmeticComponent, ComponentFamily } from './models/cosmeticComponent.model';
import { Router } from '@angular/router';
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
export class AppComponent {
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

  constructor(private dataService: DataService, private router: Router) {}

  /** A adapter à la mise ne place du back avec les nouveaux services */
  ngOnInit() {
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
        this.router.navigate(['/defeat']);
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
  
  

  /** Une fois le back actif, utilisation du service checkGame dans cette fonction afin de transmettre les données en cas de game finie */
  checkGame() {
    const allFamiliesComplete = this.componentFamilies.every(family => 
      this.familyDropTargets[family.id].length === family.totalComponents
    );

    if (allFamiliesComplete) {
      clearInterval(this.intervalId);
      this.router.navigate(['/victory']);
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
