import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { PokemonDTO } from '../Models/pokemon.dto';
import { SharedService } from './shared.service';

//Mapear el resultado de la api
export interface ResponseAPI {
  count: number;
  next: string;
  previous: string;
  results: PokemonDTOApi[];
}

//Resultado tal cual de la API
export interface PokemonDTOApi {
  name: string;
  url: string;
}


@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'pokemon';
    this.urlApi = 'https://pokeapi.co/api/v2/' ;
  }

  getPokemons(index:number): Observable<any>{//+'?limit=100000&offset=0'
    return this.http.get<any>(this.urlApi  +  this.controller +'/' + index);
  }

}
