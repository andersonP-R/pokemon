import { useEffect, useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  // le damos el valor inicial que retorne la funcion existInFav()
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFav(pokemon.id)
  );

  const handleToggleFav = () => {
    localFavorites.toggleFav(pokemon.id);
    setIsInFavorites(!isInFavorites);

    // esto es para comprobar si esta en local storage para lanzar el confeti
    if (isInFavorites) return;

    // libreria de confetti
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={handleToggleFav}
              >
                {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprittes:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// getStaticPaths tambien se ejecuta en fase de build. Al igual que getStaticProps

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // generamos un arreglo que va a contener las x paginas que vamos a pre renderizar. Tambien se puede generar a traves de un for
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    // luego le pasamos el Array a los paths, mapeandolo (pokemon151) y devolviendo el id el cual es lo que nescesita los params para
    // renderizar una pagina en el rango de datos que tenga el Array (pokemon151)
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: "blocking",
    // fallback: false,
  };
  // fallback en false se usa para establecer si cuando una persona usa un url que no fue previamnete renderizad (no esxiste la pagina)
  // o ingrese un id que no se encuentra dentro de los params, le devuleva un 404 por pantalla

  // con el fallback en "blocking" pdriamos dar acceso a una ruta que no se encuentra pre construida, en este caso si solicitaramos
  // el pokemon 152 esta url se generaria y funcionaria pero hay que establecer en el getStaticProps que se está generando esta nueva
  // url
};

// Despues de que se ejecuta getStaticPaths, la data (params) pasa a getStaticProps para el respectivo Fetching

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // desestructuramos el "ctx" para acceder a los params

  // de los params obtenemos el id y le asignamos el tipo de dato, string en este caso (as {id: string})
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  // si el pokemon (parametro de url = id) no existe redireccionamos hacia el home.
  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        // este parametro permite que cuando se redireccione la redireccion sea permante. Osea que el user se quede en esa pagina.
        // Además si esta en "true" nos ayuda a que los bots de Google nunca mas vuelvan a entrar a esa pagina por que, en teoria,
        // no existe
        permanent: false,
      },
    };
  }

  // Luego le pasamos el id al url para hacer el fetching dinamico en base a la url y el id

  // mandamos la data al front
  return {
    props: { pokemon },
    // ISR.
    // revalidate nos ayuda a a verificar cada x (10 en este caso) cantidad de segundos la pagina o la data solicitada
    revalidate: 10,
  };
};

export default PokemonPage;
