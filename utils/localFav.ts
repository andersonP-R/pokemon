const toggleFav = (id: number) => {
    
    // creamos un array de numeros que obtiene datos del localStorage
    let favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");

    // comprobamos si el array incluye el id
    if(favorites.includes(id)){
        favorites = favorites.filter((pokeId) => pokeId !== id);
    } else {
        // si no, lo agrega
        favorites.push(id)
    }

    // finalmente guardamos el nuevo array
    localStorage.setItem("favorites", JSON.stringify(favorites))
}



// metodo para comprobar si existe en local o no. ES BUENA PRACTICA PONER, SI LA FUNCION RETORNA ALGO, EL TIPO DE DATO QUE DEVUELVE
// En este caso retorna un dato de tipo booleano

const existInFav = (id: number): boolean => {

    // condicionamos para evitar que este metodo, al momento de iniciar la app, de error por intentar acceder al "localStorage"
    // localStorage es un metodo propio del navegador, no del servidor por eso va a dar error si no hacemos esta condicion.
    // Esto tambien se puede solucionar con un useEffect
    if (typeof window === "undefined") return false;

    const favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.includes(id);
}

// esta es la manera para evitar que el servidor de error intentando leer "localStorage": con un useEffect en el componente.
const pokemons = (): number[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export default {
    toggleFav,
    existInFav,
    pokemons
}