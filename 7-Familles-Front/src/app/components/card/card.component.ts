import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CosmeticComponent } from '../../models/cosmeticComponent.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() cosmeticComponent!: CosmeticComponent;
  @Output() selectFamily = new EventEmitter<CosmeticComponent>();

  isFlipped: boolean = false;

  /** Permet de retourner les cartes */
  flipCard(event: MouseEvent) {
    if ((event.target as HTMLElement).closest('.family-button')) {
      return;
    }
    this.isFlipped = !this.isFlipped;
  }

  /** Permet lors du clique sur "choisir une famille" de transmettre les infos pour le traitement des familles dans le composant principal  */
  onSelectFamily(event: MouseEvent) {
    event.stopPropagation();
    this.selectFamily.emit(this.cosmeticComponent);
  }

  
}
