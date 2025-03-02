import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CosmeticComponent, ComponentFamily } from '../models/cosmeticComponent.model';

@Injectable({
  providedIn: 'root',
})
/**
 * Service temporaire qui analyse le json contenu dans public/data/cosmetics.json.
 * Une fois le backend en place, ce service permettra de récupérer les components et families depuis l'api.
 */
export class DataService {
  private dataUrl = '/data/cosmetics.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<{ cosmeticComponents: CosmeticComponent[]; componentFamilies: ComponentFamily[] }> {
    return this.http.get<any>(this.dataUrl).pipe(
      map((data) => {
        const componentFamilies: ComponentFamily[] = data.componentFamilies.map(
          (family: any) => new ComponentFamily(family.id, family.name, family.description)
        );

        const cosmeticComponents: CosmeticComponent[] = data.cosmeticComponents.map((component: any) => {
          const associatedFamily = componentFamilies.find((f) => f.id === component.familyId) || null;
          return new CosmeticComponent(
            component.id,
            component.name,
            associatedFamily!,
            component.description,
            component.image
          );
        });

        return { cosmeticComponents, componentFamilies };
      })
    );
  }
}
