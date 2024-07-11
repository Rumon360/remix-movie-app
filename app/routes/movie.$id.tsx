import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
import { getMovieById } from "~/actions/get-movie";
import MovieInfo from "~/components/movie-info";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string;
  const movie = await getMovieById(id);
  if (movie.success === false) {
    return redirect("/");
  }
  return movie;
}

function MoviePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="py-10">
      <div style={{ borderRadius: "6px" }} className="w-full  overflow-hidden">
        <AspectRatio ratio={16 / 6}>
          <img
            src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
            alt="backdrop_image"
            className="rounded-md object-cover object-center"
          />
        </AspectRatio>
      </div>
      <div className="my-10">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight">
          {data.title}
        </h1>
        <div className="w-full flex flex-col gap-x-0 lg:gap-x-6 gap-y-6 lg:flex-row mt-10">
          <div className="lg:w-1/2 w-full relative">
            <MovieInfo movie={data} />
          </div>
          <div className="lg:w-1/2 w-full relative">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
