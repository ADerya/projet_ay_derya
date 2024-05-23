import { Component, OnInit, input } from '@angular/core';
import { Store } from '@ngxs/store';
import { BaseProduct } from '../../../shared/types/base-product';
import { SupprimerProduit } from '../../../shared/actions/cart-action';

@Component({
  selector: 'app-produit-panier',
  standalone: true,
  imports: [],
  templateUrl: './produit-panier.component.html',
  styleUrl: './produit-panier.component.css'
})
export class ProduitPanierComponent implements OnInit {
  produit = input.required<BaseProduct>();

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  SupprimerProduit(): void {
    this.store.dispatch(new SupprimerProduit(this.produit().product.id));
  }
}
