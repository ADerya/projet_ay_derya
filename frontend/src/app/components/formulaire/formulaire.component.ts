import { Component, OnInit, ViewChild } from '@angular/core';
import intlTelInput from 'intl-tel-input';
import { FormBuilder, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../shared/types/client';
import { RecapitulatifComponent } from '../recapitulatif/recapitulatif.component';
import { MustMatch } from '../../utils/validators/mustMatch';
import { PasswordValidator } from '../../utils/validators/passwordValidator';
import { CommonModule, NgClass } from '@angular/common';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AjouterClient } from '../../shared/actions/client-action';


@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RecapitulatifComponent, NgClass, ErrorMessageComponent, CommonModule],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css',
  providers: [ApiService]
})
export class FormulaireComponent implements OnInit {
  
  protected registrationForm = this.formBuilder.group({
    civilite: this.formBuilder.control<'male'|'female'>('female', [Validators.required]),
    nom: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    prenom: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
    tel: ['', [Validators.required, Validators.minLength(1)]],
    adresse: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    codePostal: this.formBuilder.control<number|null>(null, [
      Validators.required,
      Validators.min(1)
    ]),
    ville: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    pays: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), PasswordValidator]],
    confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), PasswordValidator]],
  }, {
    validators: MustMatch('password', 'confirmation')
  })
  

  title : string = "Composant initialisé";

  client?: Client;
  error: string = '';
  success: string = '';

  public constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private store: Store ) {}

  ngOnInit(): void {
    this.title = "Formulaire de contact";
    console.log(this.title);
    const inputElement = document.querySelector('#phone');
    if(inputElement) {
         intlTelInput(inputElement, {
           utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.19/build/js/utils.js"
         });
         }
  }

  protected onSubmit() {
    console.log(this.registrationForm.value, this.registrationForm.valid);
    if (!this.registrationForm.valid) return;

    this.client = this.registrationForm.value as Client;
    this.apiService.signupClient(this.client).subscribe(
      (response) => {
        console.log('Signup response: ', response);
        this.store.dispatch(new AjouterClient(response));
        this.success = "Inscription réussie !";
        this.router.navigateByUrl('/catalogue');
        this.registrationForm.reset();
      },
      (error) => {
        console.log('Signup error: ', error);
        this.error = "Erreur d'inscription ! Veuillez vérifier vos informations.";
      }
    );
  }

  protected hasErrors(field: string): boolean {
    const fieldControl = this.registrationForm.get(field);
    console.log(this.registrationForm.valid);
    return Boolean(fieldControl && fieldControl.dirty && fieldControl.errors);
  }

  ngOnDestroy () {
    console.log("Le composant a été détruit");
  }
}