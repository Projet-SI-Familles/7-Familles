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
   * Récupère la liste des familles depuis l'API
   */
  getFamilies(): Observable<ComponentFamily[]> {
    return this.http.get<any>(this.familiesUrl).pipe(
      map(response => response.member.map((family: any) => ({
        id: family.idfamily,
        name: family.name,
        description: family.description
      })))
    );
  }

  /**
   * Récupère la liste des composants cosmétiques depuis l'API
   */
  getCosmeticComponents(): Observable<CosmeticComponent[]> {
    return this.http.get<any>(this.rawMaterialsUrl).pipe(
      map(response => response.member.map((component: any) => ({
        id: component.idrawmaterial,
        name: component.name,
        description: component.description,
        image: component.image || 'image.jpg',
        familyUrl: component.family,
        isFlipped: true,
        selected: false,
        validated: false
      })))
    );
  }

  /**
   * Récupère les familles et les composants puis les associe ensemble grâce à un forkJoin qui combine deux Observables et leur associe un traitement pour return une valeur voulu. 
   * Ici on veut associer une famille à un composant car il a just l'URL de base afin de réaliser le traitement directement dans le front pour réduire les call API.
   */
  getData(): Observable<{ cosmeticComponents: CosmeticComponent[]; componentFamilies: ComponentFamily[] }> {
    return forkJoin({
      componentFamilies: this.getFamilies(),
      cosmeticComponents: this.getCosmeticComponents()
    }).pipe(
      map(({ componentFamilies, cosmeticComponents }) => {
        cosmeticComponents.forEach(component => {
          if (typeof component.familyUrl === 'string') {
            const familyId = component.familyUrl.split('/').pop();
            component.family = componentFamilies.find(f => f.id.toString() === familyId) || null;
          }
          delete (component as any).familyUrl;
        });

        return { cosmeticComponents, componentFamilies };
      })
    );
  }
}
