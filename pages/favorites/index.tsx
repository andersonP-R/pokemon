import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { FavoritePokemons, NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";

const FavoritesPage: NextPage = () => {
  const [favPokemons, setFavPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavPokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemons Favoritos">
      {favPokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favPokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
