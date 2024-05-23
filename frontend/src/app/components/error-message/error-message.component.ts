import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input()
  public control!: FormControl | FormGroup;
}