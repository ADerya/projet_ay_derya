import { Client } from "../types/client";

export class AjouterClient {
  static readonly type = '[Client] Ajouter client';
  constructor(public client: Client) { }
}