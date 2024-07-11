import { Link } from "@remix-run/react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  movie: any;
};

function MovieInfo({ movie }: Props) {
  return (
    <div className="font-medium w-full text-xl flex flex-col gap-2">
      <h2 className="scroll-m-20 font-semibold tracking-tight text-muted-foreground">
        Homepage:
        <span>
          <Link
            to={movie.homepage}
            target="_blank"
            rel="noreferrer"
            className="hover:underline ml-2 text-foreground hover:text-blue-500 transition ease-in-out"
          >
            Link
          </Link>
        </span>
      </h2>
      <h2 className="scroll-m-20 font-semibold tracking-tight text-muted-foreground">
        Original Language:
        <span className="ml-2 text-foreground">{movie.original_language}</span>
      </h2>
      <p className="scroll-m-20 font-semibold tracking-tight text-muted-foreground">
        Overview:
        <span className="ml-2 text-foreground">{movie.overview}</span>
      </p>
      <p className="scroll-m-20 font-semibold tracking-tight text-muted-foreground">
        Release Date:
        <span className="ml-2 text-foreground">{movie.release_date}</span>
      </p>
    </div>
  );
}

export default MovieInfo;
