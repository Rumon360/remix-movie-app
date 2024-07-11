export const getMovieById = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmQ4ODY2YzQyZDVlYmRiNjg5ZDgxNmIxYjQ1YjIwNyIsIm5iZiI6MTcyMDU0MzA5My40OTAzODUsInN1YiI6IjY2OGQ2NmMwYmJjZjU1NDgwNmFlMGY3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qcHWR6GmlUoqM2getvUwI-pKz3OcSeBTsi8Pfp7YfJU",
    },
  };
  const data = await fetch(url, options).then((res) => res.json());
  return data;
};
