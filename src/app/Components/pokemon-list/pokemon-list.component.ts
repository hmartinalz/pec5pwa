import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/Services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  animations: [
    trigger('cardsAnimation', [
      state('waiting', style({ opacity: 1 })),
      state('loaded', style({ opacity: 1 })),
      transition('waiting => loaded', [
        query('.card-container', [
          style({ opacity: 0, transform: 'translateX(-300px)' }),
          stagger(500, [
            animate(
              '1500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  isCardView: boolean = true;

  animationState: string;

  constructor(private pokemonService: PokemonService) {
    this.animationState = 'waiting';
  }

  ngOnInit(): void {
    this.loadPokemons();
  }

  private loadPokemons(): void {
    // this.store.dispatch(PokemonAction.getPokemons());
    let pokemonData;

    for (let i = 1; i <= 150; i++) {
      this.pokemonService.getPokemons(i).subscribe(
        (res) => {
          let pokemonTypes = new Array<string>();
          for (let j = 0; j <= res.types.length - 1; j++) {
            pokemonTypes.push(res.types[j].type.name);
          }

          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name,
            types: pokemonTypes,
            weight: res.weight,
          };

          this.pokemons.push(pokemonData);

          this.pokemons.sort((a, b) => a.position - b.position);
          this.animationState = 'loaded';
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  cardView(): void {
    this.isCardView = true;
  }
  listView(): void {
    this.isCardView = false;
  }
}
