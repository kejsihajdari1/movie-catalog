import { SearchResponse, MovieDetails } from "./types";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

export const searchMovies = async (query: string): Promise<SearchResponse> => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found");
  }

  return data;
};

export const getMovieDetails = async (
  imdbID: string,
): Promise<MovieDetails> => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
};
