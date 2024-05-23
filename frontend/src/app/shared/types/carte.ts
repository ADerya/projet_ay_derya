import { Expression } from "@angular/compiler";

export class Carte {
    id: number;
    nomCarte: string;
    codeCarte: string;
    ccv: string;
    mois: number;
    annee: number;
    
    constructor(id: number, nomCarte: string, codeCarte: string, ccv: string, mois:number, annee: number) {
      this.id = id;
      this.nomCarte = nomCarte;
      this.codeCarte = codeCarte;
      this.ccv = ccv;
      this.mois = mois;
      this.annee = annee;
    }
  }
  