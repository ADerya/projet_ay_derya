import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from './shared/types/product';
import { environment } from '../environments/environment';
import { Client } from './shared/types/client';

@Injectable()

@Injectable()
export class ApiService {

  constructor(private http:HttpClient) { }

    public getCategories () : Observable<string[]> {
      return this.http.get<Product[]>(environment.backendClient).pipe(
        map((products: any[]) => {
          const categoriesSet = new Set<string>();
          products.forEach(product => {
            categoriesSet.add(product.category);
          });
          return Array.from(categoriesSet);
        })
      );
    }

  
    public loginClient(email: string, password: string): Observable<Client> {
      let data: String;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      data = 'login=' + email + '&password=' + password;
      return this.http.post<Client>(environment.backendLoginClient, data, httpOptions);
    }
  
    public getProduits(): Observable<Product[]> {
      return this.http.get<Product[]>(environment.backendCatalogue);
    }
  
    public getSearchProduits(search: string): Observable<Product[]> {
      return this.http.get<Product[]>(environment.backendCatalogue + '/' + search);
    }
  }