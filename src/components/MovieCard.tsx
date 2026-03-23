import { Movie } from '../types';
import { FilmIcon } from './icons/FilmIcon';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : null;

  return (
    <div 
      onClick={onClick}
      className="cursor-pointer group transition-transform hover:scale-105"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="aspect-[2/3] relative bg-gray-100">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.Title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <FilmIcon className="w-24 h-24 mb-3" />
              <p className="text-sm font-medium">No Poster</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-blue-600">
            {movie.Title}
          </h3>
          <p className="text-gray-600 text-sm">{movie.Year}</p>
        </div>
      </div>
    </div>
  );
};
