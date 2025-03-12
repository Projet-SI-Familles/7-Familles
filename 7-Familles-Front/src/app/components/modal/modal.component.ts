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

  onSelectFamily(family: ComponentFamily) {
    this.selectFamily.emit(family);
  }

  onClose() {
    this.closeModal.emit();
  }
}
