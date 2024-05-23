import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaireCarteComponent
 } from './formulaire-carte/formulaire-carte.component';
 import { ListeCarteComponent } from './liste-carte/liste-carte.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'carte', component: FormulaireCarteComponent },
    ],
  },
  { path: '', redirectTo: 'carte', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: 'carte' }, // Redirection pour les chemins inexistant
];


@NgModule({
  declarations: [FormulaireCarteComponent, ListeCarteComponent],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [
    FormulaireCarteComponent, ListeCarteComponent, RouterModule
  ]
})
export class CarteModule { }
