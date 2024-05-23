import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { ApiService } from '../../api.service';
import { Product } from '../../shared/types/product';
import { AjouterProduit } from '../../shared/states/panier-state';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-product.component.html',
  styleUrl: './liste-product.component.css',
  providers: [ApiService],
})
export class ListeProductComponent implements OnInit {

  products$!: Observable<Product[]>;
  categories$!: Observable<string[]>;
  @ViewChild('rechercheInput', { static: true }) rechercheInput!: ElementRef;
  @Output() searchEvent = new BehaviorSubject<string>('');

  constructor(private apiService: ApiService, private store: Store) {
    this.products$ = this.apiService.getProduits();
  }
  ngOnInit(): void {
    this.products$ = this.searchEvent.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) =>
        searchTerm.trim() === ''
          ? this.apiService.getProduits()
          : this.apiService.getSearchProduits(searchTerm).pipe(
            catchError(() => of([] as Product[])),
            startWith([] as Product[])
          )
      )
    );

    this.searchEvent.next('');
  }

  onSearchInputChange(searchTerm: string): void {
    this.searchEvent.next(searchTerm);
  }

  ajouterAuPanier(produit: Product) {
    this.store.dispatch(new AjouterProduit(produit));
  }
}
