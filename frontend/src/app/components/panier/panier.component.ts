import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePanierComponent } from './resume-panier/resume-panier.component';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, ResumePanierComponent],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})

@Injectable()
export class PanierComponent {
  constructor(){}
}
