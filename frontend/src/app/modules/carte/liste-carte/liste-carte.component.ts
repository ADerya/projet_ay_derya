import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarteService } from '../../../carte.service';
import { Carte } from '../../../shared/types/carte';


@Component({
  selector: 'app-liste-carte',
  templateUrl: './liste-carte.component.html',
  styleUrl: './liste-carte.component.css'
})
export class ListeCarteComponent implements OnInit {
  cartes!: Carte[];
  constructor(private carteService: CarteService) { }

  ngOnInit(): void {
    this.cartes = this.carteService.getCartes();
  }

  supprimerCarte(id: number) {
    this.carteService.supprimerCarte(id);
    this.cartes = this.carteService.getCartes();
  }
}
