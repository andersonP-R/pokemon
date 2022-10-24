import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
  // envolvemos la peticion en un try cath para: try; verificar que le pasemos un id o nombre que exista realmente en el server
  // de pokeApi
  try {
    // recibimos el parametro y hacemos la peticion
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    // devolvemos solo los datos que necesitamos
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    // y con el catch verificamos que si el parametro (nombre o id) no existe dentro de la api de los pokemon; devolver null
    return null;
  }
};
