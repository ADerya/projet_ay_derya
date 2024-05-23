import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../shared/types/client';

@Component({
  selector: 'app-recapitulatif',
  standalone: true,
  imports: [],
  templateUrl: './recapitulatif.component.html',
  styleUrl: './recapitulatif.component.css',
})
export class RecapitulatifComponent {
  @Input()
  public client!: Client;

  @Output()
  public change: EventEmitter<String> = new EventEmitter<String>();
}
