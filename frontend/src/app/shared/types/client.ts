export class Client {
  id: number;
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

  constructor() {
    this.id = 0;
    this.civilite = 'female'
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.tel = '';
    this.adresse = '';
    this.codePostal = 0;
    this.ville = '';
    this.pays = '';
    this.login = '';
    this.password = '';
    this.confirmation = '';
  }
}
