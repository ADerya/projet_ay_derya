import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { PanierState } from '../../../shared/states/panier-state';
import { BaseProduct } from '../../../shared/types/base-product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProduitPanierComponent } from '../produit-panier/produit-panier.component';

@Component({
  selector: 'app-resume-panier',
  standalone: true,
  imports: [CommonModule, ProduitPanierComponent],
  templateUrl: './resume-panier.component.html',
  styleUrl: './resume-panier.component.css'
})
export class ResumePanierComponent {

  @Select(PanierState.getProduitPanier) produits$!: Observable<BaseProduct[]>;
  @Select(PanierState.prixTotalPanier) prixTotal$!: Observable<number>;
  @Select(PanierState.nombreProduitDansPanier) nombreProduitDansPanier$!: Observable<number>;
}
