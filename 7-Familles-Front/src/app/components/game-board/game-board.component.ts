import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CosmeticComponent } from '../../models/cosmeticComponent.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, NgFor, CardComponent],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  @Input() cosmeticComponents: CosmeticComponent[] = [];
  @Output() selectFamily = new EventEmitter<CosmeticComponent>();

  /** Envoie le composant concerné par la selection de famille au composant principal */
  onSelectFamily(component: CosmeticComponent) {
    this.selectFamily.emit(component);
  }
}
