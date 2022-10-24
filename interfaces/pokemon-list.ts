export interface PokemonListResponse {
    count:    number;
    next?:     string;
    previous?: string;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    url:  string;
    id: number;
    img: string;
}
// establecemos el tipo de datos que va a tener la response del peticion. Esto para evitar conflictos en cuanto a tipo de dato
// cuando se traigan y se usen para mostrar en el front