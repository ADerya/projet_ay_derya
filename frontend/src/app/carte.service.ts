import { Injectable } from '@angular/core';
import { Carte } from './shared/types/carte';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  private cartes: Carte[] = [];

  constructor() { }

  getCartes(): Carte[] {
    return this.cartes;
  }

  ajouterCarte(carte: Carte) {
    carte.id = this.generateUniqueId();
    this.cartes.push(carte);
  }

  supprimerCarte(id: number) {
    this.cartes = this.cartes.filter(carte => carte.id !== id);
  }

  private generateUniqueId(): number {
    return this.cartes.length > 0 ? Math.max(...this.cartes.map(carte => carte.id)) + 1 : 1;
  }
}
