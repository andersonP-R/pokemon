import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Navbar } from "../ui/Navbar";

interface Props {
  title?: string;
}

// para comprobar que estamos en el lado del client. Así poder acceder a la ruta de origen en la que nos encontramos; en este caso
// para poder acceder al local host

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="author" content="Anderson Rivera" />
        <meta
          name="description"
          content={`Informacion sobre el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta
          property="og:title"
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      {/* navbar */}
      <Navbar />

      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
