import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanierState } from '../../shared/states/panier-state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tetiere',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLink],
  templateUrl: './tetiere.component.html',
  styleUrl: './tetiere.component.css'
})
export class TetiereComponent implements OnInit {

  constructor() { }

  @Select(PanierState.nombreProduitDansPanier) declare nombreProduitDansPanier$: Observable<number>;

  ngOnInit(): void {
  }

}
