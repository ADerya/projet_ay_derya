import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../shared/types/product';
import { AjouterClient } from '../../shared/actions/client-action';
import { Select, Store } from '@ngxs/store';
import { ClientState } from '../../shared/states/client-state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  @Select(ClientState.getNomComplet) nomComplet$!: Observable<string>;
  produit$!: Observable<Product[]>;
  name: string= '';
  login: string = '';
  password: string = '';

  nom?: string = '';
  prenom?: string = '';
  cnx: boolean = false;
  error: string = '';
  public constructor(private apiService: ApiService, private router:Router, private store: Store) {
    this.produit$ = this.apiService.getProduits();
  }

  onSubmit(): void {

    console.log('Email: ', this.login);
    this.apiService.loginClient(this.login, this.password).subscribe(
      (response) => {
        this.store.dispatch(new AjouterClient(response));
        this.cnx = true;
        
        console.log('Login response: ', response);
        // attendre 1 seconde
        setTimeout(() => {
          this.router.navigateByUrl('/catalogue');
        }, 1000);
    },
    (error) => {
      this.error = "Erreur de connexion ! Veuillez vérifier vos identifiants. Essayez login: derya et mdp: derya !"
      console.log('Login error: ', error);
    }
  );
  }
  ngOnInit(): void {
  }

}
