export interface CosmeticComponent {
  id: number;
  name: string;
  family: ComponentFamily | null;
  description: string;
  image: string;
  isFlipped: boolean;
  selected: boolean;
  validated: boolean;
  familyUrl: String;
}

export interface ComponentFamily {
  id: number;
  name: string;
  description: string;
}
