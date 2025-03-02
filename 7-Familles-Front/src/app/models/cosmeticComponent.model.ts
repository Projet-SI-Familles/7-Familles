/**
 * Models pour les composants cosmétiques et les familles de composants.
 * Une fois le backend en place, ils deviendront des interfaces afin de les utiliser dans les services et les composants.
 */

export class CosmeticComponent {
  id: number;
  name: string;
  family: ComponentFamily;
  description: string;
  image: string;
  isFlipped: boolean;
  selected: boolean;
  validated: boolean;

  constructor(
    id: number,
    name: string,
    family: ComponentFamily,
    description: string,
    image: string,
    isFlipped: boolean = true,
    selected: boolean = false,
    validated: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.family = family;
    this.description = description;
    this.image = image;
    this.isFlipped = isFlipped;
    this.selected = selected;
    this.validated = validated;
  }
}

export class ComponentFamily {
  id: number;
  name: string;
  description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
