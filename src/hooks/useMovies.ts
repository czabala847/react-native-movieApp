import {useState, useEffect} from 'react';
import {MovieDB} from '../api/MovieDB';
import {Movie, ResponseDataMovie} from '../interfaces/movieInterface';

export const useMovies = () => {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    try {
      setIsLoading(true);
      const response = await MovieDB.get<ResponseDataMovie>('/now_playing');
      const movies = response.data.results;
      setMoviesNowPlaying(movies);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    isLoading,
    moviesNowPlaying,
  };
};
