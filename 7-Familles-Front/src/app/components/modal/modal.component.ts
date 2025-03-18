import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFamily, CosmeticComponent } from '../../models/cosmeticComponent.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modalOpen: boolean = false;
  @Input() componentFamilies: ComponentFamily[] = [];
  @Input() selectedComponent: CosmeticComponent | null = null;
  @Input() incorrectAttempts: { [key: number]: number[] } = {};

  @Output() selectFamily = new EventEmitter<ComponentFamily>();
  @Output() closeModal = new EventEmitter<void>();

  /** Envoie la famille choisie au composant pirncipal pour réaliser le traitement */
  onSelectFamily(family: ComponentFamily) {
    this.selectFamily.emit(family);
  }

  /** Envoie l'informatique de fermer le modal au composant principal */
  onClose() {
    this.closeModal.emit();
  }
}
