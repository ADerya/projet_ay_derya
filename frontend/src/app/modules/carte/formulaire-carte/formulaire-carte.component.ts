import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteService } from '../../../carte.service';

@Component({
  selector: 'app-formulaire-carte',
  templateUrl: './formulaire-carte.component.html',
  styleUrl: './formulaire-carte.component.css',
  providers: [CarteService]
})
export class FormulaireCarteComponent implements OnInit {
  carteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private carteService: CarteService) { }

  ngOnInit(): void {
    this.carteForm = this.formBuilder.group({
      nomCarte: ['', Validators.required],
      codeCarte: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      ccv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      mois: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      annee: ['', [Validators.required, Validators.min(new Date().getFullYear()), Validators.max(new Date().getFullYear() + 10)]]
    });
  }

  onSubmit() {
    if (this.carteForm.valid) {
        console.log(this.carteForm.value, this.carteForm.valid);
        this.carteService.ajouterCarte(this.carteForm.value);
        console.log(this.carteForm.value);
        this.carteForm.reset(); 
        alert('La carte a été ajoutée avec succès !');  
    } else {
      alert('Veuillez remplir correctement tous les champs du formulaire.');
    }
  }
}
