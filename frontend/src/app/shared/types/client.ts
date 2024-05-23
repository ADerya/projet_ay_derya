export interface Client {
  civilite: 'male' | 'female';
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  adresse: string;
  codePostal: number;
  ville: string;
  pays: string;
  login: string;
  password: string;
  confirmation: string;
}
