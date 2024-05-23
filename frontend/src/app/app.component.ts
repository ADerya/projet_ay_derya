import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from  '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { RecapitulatifComponent } from './components/recapitulatif/recapitulatif.component';
import { TetiereComponent } from './components/tetiere/tetiere.component';
import { CarteModule } from './modules/carte/carte.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TetiereComponent, FormulaireComponent, FooterComponent, RecapitulatifComponent, FormsModule, CommonModule, CarteModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp02_ay_derya';
}
