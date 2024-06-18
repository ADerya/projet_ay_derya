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

  message = '';
  erreur = '';
  products$!: Observable<Product[]>;
  categories$!: Observable<string[]>;
  @ViewChild('rechercheInput', { static: true }) rechercheInput!: ElementRef;
  @ViewChild('categorieInput', { static: true }) categorieInput!: ElementRef;
  @Output() searchEvent = new BehaviorSubject<{search: string, category: string}>({search: '', category: ''});

  constructor(private apiService: ApiService, private store: Store) {
    this.categories$ = this.apiService.getCategories();
    console.log(this.searchEvent);

    this.products$ = this.searchEvent.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(({search, category}) => {
        return this.getProducts(search, category);
      })
    );
  }
  ngOnInit(): void {
    this.getProducts('', '');
    //this.getAllProducts();
  }

  getAllProducts(): void {
    this.products$ = this.apiService.getAllProducts();
  }

  onSearchInputChange(searchTerm: string): void {
    let categorie = this.categorieInput.nativeElement.value;
    this.searchEvent.next({ search: searchTerm, category: categorie });
  }

  onCategoryInputChange(categorie: string): void {
    let searchTerm = this.rechercheInput.nativeElement.value;
    this.searchEvent.next({ search: searchTerm, category: categorie });
  }

  getProducts(search: string, category: string): Observable<Product[]> {
    return this.apiService.getSearchProducts(search, category).pipe(
      catchError(() => of([]))
    );
  }

  ajouterAuPanier(produit: Product) {
    this.store.dispatch(new AjouterProduit(produit));
    this.message = produit.name + ' ajouté(e) au panier !';
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }
}
