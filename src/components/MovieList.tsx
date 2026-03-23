import { Movie } from "../types";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (imdbID: string) => void;
}

export const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  const topThree = movies.slice(0, 3);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Top 3 Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThree.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => onMovieClick(movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
};
