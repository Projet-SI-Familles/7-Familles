import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ComponentFamily, CosmeticComponent } from '../../models/cosmeticComponent.model';

@Component({
  selector: 'app-family',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent {
  @Input() componentFamilies: (ComponentFamily & { totalComponents: number })[] = [];
  @Input() familyDropTargets: { [key: number]: CosmeticComponent[] } = {};
}
