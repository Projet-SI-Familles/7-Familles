import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CosmeticComponent, ComponentFamily } from '../models/cosmeticComponent.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private familiesUrl = 'http://127.0.0.1:8000/api/families';
  private rawMaterialsUrl = 'http://127.0.0.1:8000/api/rawmaterials';

  constructor(private http: HttpClient) {}

  /**
   * Récupère les familles et les matières premières (cosmeticComponents) en 1 fonction avec le forkJoin
   */
  getData(): Observable<{ cosmeticComponents: CosmeticComponent[]; componentFamilies: ComponentFamily[] }> {
    return forkJoin({
      families: this.http.get<any>(this.familiesUrl),
      rawMaterials: this.http.get<any>(this.rawMaterialsUrl),
    }).pipe(
      map(({ families, rawMaterials }) => {
        const componentFamilies: ComponentFamily[] = families.member.map((family: any) => ({
          id: family.idfamily,
          name: family.name,
          description: family.description,
        }));

        const cosmeticComponents: CosmeticComponent[] = rawMaterials.member.map((component: any) => {
          const associatedFamily = componentFamilies.find((f) => `/api/families/${f.id}` === component.family) || null;

          return {
            id: component.idrawmaterial,
            name: component.name,
            description: component.description,
            image: component.image || 'image.jpg',
            family: associatedFamily,
            isFlipped: true,
            selected: false,
            validated: false,
          };
        });

        return { cosmeticComponents, componentFamilies };
      })
    );
  }
}
