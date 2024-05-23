import { Product } from "../types/product";

export class AjouterProduit {
    static readonly type ='[Panier] Ajouter produit';
    constructor(public product: Product){}
}

export class SupprimerProduit{
    static readonly type ='[Panier] Supprimer produit';
    constructor(public id : number){}
}

export class ClearPanier{
    static readonly type ='[Panier] Clear';
}