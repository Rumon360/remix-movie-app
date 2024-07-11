import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTrendingMovies } from "~/actions/get-movies";
import MovieCard from "~/components/cards/movie-card";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "MovieDB - Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const movies = await getTrendingMovies();
  if (movies.success === false) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  return movies;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="py-10">
      <div className="flex mb-16 items-center flex-col gap-8 text-center">
        <h1 className="scroll-m-20 max-w-sm text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to the Movie<span className="text-red-500">DB</span> App
        </h1>
        <h3 className="scroll-m-20 text-2xl lg:text-3xl font-semibold tracking-tight max-w-xl mx-auto">
          Discover trending and top-rated movies, and share your feedback on any
          film.
        </h3>
        <Button
          style={{ borderRadius: "6px" }}
          className="text-base"
          variant={"outline"}
          size={"lg"}
        >
          Start Now <span className="ml-2 text-lg">→</span>
        </Button>
      </div>
      <div className="mb-10">
        <div className="mb-10">
          <h1 className="scroll-m-20 text-xl lg:text-2xl font-semibold tracking-tight first:mt-0">
            Top Trending Movies{" "}
            <span className="ml-2 text-xl text-zinc-500">→</span>
          </h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data.results.map((movie: any) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
