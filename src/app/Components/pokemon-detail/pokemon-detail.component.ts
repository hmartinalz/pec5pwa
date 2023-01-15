
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/Services/pokemon.service';



@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
 
  pokemon: any = '';
  pokemonId: string| null;
  panelOpenState = false;

  constructor(private activatedRoute: ActivatedRoute,private router: Router, private pokemonService: PokemonService) {
    this.pokemonId = this.activatedRoute.snapshot.paramMap.get('id');
 
  }
  ngOnInit(): void {
    this.getPokemon(Number(this.pokemonId));
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  getPokemon(id:number) {
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        console.log(res);

        let pokemonTypes = new Array<string>();
        for (let j = 0; j <= res.types.length-1; j++) {
            pokemonTypes.push(res.types[j].type.name)
        }
        let pokemonAbilities = new Array<string>();

        for (let j = 0; j <= res.abilities.length-1; j++) {
          pokemonAbilities.push(res.abilities[j].ability.name);
        }

        let pokemonMoves = new Array<string>();

        for (let j = 0; j <= res.moves.length-1; j++) {
          pokemonMoves.push(res.moves[j].move.name);
        }
        this.pokemon = {
          position: id,
          image: res.sprites.front_default,
          name: res.name,
          types: pokemonTypes,
          weight: res.weight,
          height:res.height,
          abilities:pokemonAbilities,
          moves:pokemonMoves
        };

       
      },
      err => {
        console.log(err);
      }
    )
  }

 
}
