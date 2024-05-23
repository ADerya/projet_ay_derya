import { AbstractControl, ValidatorFn } from '@angular/forms';

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!control.value) {
      return null; // Si le champ est vide, la validation réussit
    }

    // Vérifie si le mot de passe correspond à l'expression régulière
    if (!PASSWORD_REGEX.test(control.value)) {
      return { invalidPassword: true }; // Retourne une erreur si le mot de passe ne correspond pas à l'expression régulière
    }

    return null; // Retourne null si la validation réussit
  };
}
