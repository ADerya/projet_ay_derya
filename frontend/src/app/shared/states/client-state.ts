import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Client } from '../types/client';
import { AjouterClient } from '../actions/client-action';

export interface ClientStateModel {
    Client: Client;
  }

@State<ClientStateModel>({
    name: 'client',
    defaults: {
        Client: new Client()
    }
})
@Injectable()
export class ClientState {
    @Selector()
    static getClient(state: ClientStateModel) {
        return state.Client;
    }

    @Selector()
    static getNomComplet(state: ClientStateModel) {
        return state.Client.prenom + ' ' + state.Client.nom;
    }

    @Action(AjouterClient)
    ajouterClient(ctx: StateContext<ClientStateModel>, action: AjouterClient) {
      const state = ctx.getState();

      ctx.patchState({
        Client: action.client
      });
    }
}

