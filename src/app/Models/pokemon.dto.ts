export class PokemonDTO {
  pokemonId!: string;
  name: string;
  height: string;
  weight: string;
  sprites: string;
  constructor(name: string, height: string, weight: string, sprites:string) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.sprites = sprites;
  }
}
