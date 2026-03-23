import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { MovieList } from "./components/MovieList";
import { MovieDetails } from "./components/MovieDetails";
import { searchMovies, getMovieDetails } from "./api";
import { Movie, MovieDetails as MovieDetailsType } from "./types";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsType | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const data = await searchMovies(query);
      setMovies(data.Search || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (imdbID: string) => {
    try {
      const details = await getMovieDetails(imdbID);
      setSelectedMovie(details);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load movie details",
      );
    }
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const hasSearched = loading || error || movies.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <div
        className={`container mx-auto transition-all duration-500 ${
          hasSearched ? "py-8" : "min-h-screen flex flex-col justify-center"
        }`}
      >
        <h1
          className={`text-4xl font-bold text-center text-gray-900 transition-all duration-500 ${
            hasSearched ? "mb-8" : "mb-12"
          }`}
        >
          Movie Catalog
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="text-center text-gray-600 mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-2">Loading...</p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-8">
            {error}
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="mt-8">
            <MovieList movies={movies} onMovieClick={handleMovieClick} />
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            <p>Search for your favorite movies</p>
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default App;
