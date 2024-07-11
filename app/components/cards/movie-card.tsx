import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

function MovieCard({ data }: Props) {
  return (
    <Link to={`/movie/${data.id}/comments`}>
      <Card className="flex flex-col justify-between group">
        <CardHeader>
          <div
            style={{ borderRadius: "6px" }}
            className="relative w-full h-[350px] sm:h-[380px] overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt="poster"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition ease-in-out rounded-lg"
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-left">
                <CardTitle className="text-xl line-clamp-1">
                  {data.title}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-zinc-700">{data.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="line-clamp-2 text-sm">{data.overview}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default MovieCard;
