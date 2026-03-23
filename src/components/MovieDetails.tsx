import { useState } from 'react';
import { MovieDetails as MovieDetailsType } from "../types";
import { FilmIcon } from "./icons/FilmIcon";

interface MovieDetailsProps {
  movie: MovieDetailsType;
  onClose: () => void;
}

export const MovieDetails = ({ movie, onClose }: MovieDetailsProps) => {
  const [imageError, setImageError] = useState(false);
  const posterUrl = movie.Poster !== "N/A" && !imageError ? movie.Poster : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{movie.Title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.Title}
                  onError={() => setImageError(true)}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-100 rounded-lg shadow-lg flex flex-col items-center justify-center text-gray-400">
                  <FilmIcon className="w-32 h-32 mb-4" />
                  <p className="text-lg font-medium">No Poster Available</p>
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="font-semibold text-gray-700">Year:</span>
                <span className="ml-2 text-gray-600">{movie.Year}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Rated:</span>
                <span className="ml-2 text-gray-600">{movie.Rated}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Runtime:</span>
                <span className="ml-2 text-gray-600">{movie.Runtime}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Genre:</span>
                <span className="ml-2 text-gray-600">{movie.Genre}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Director:</span>
                <span className="ml-2 text-gray-600">{movie.Director}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Actors:</span>
                <span className="ml-2 text-gray-600">{movie.Actors}</span>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Plot:</span>
                <p className="mt-1 text-gray-600">{movie.Plot}</p>
              </div>

              <div className="flex gap-6 pt-4 border-t">
                <div>
                  <span className="font-semibold text-gray-700">
                    IMDb Rating:
                  </span>
                  <span className="ml-2 text-yellow-600 font-bold">
                    {movie.imdbRating}/10
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Votes:</span>
                  <span className="ml-2 text-gray-600">{movie.imdbVotes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
