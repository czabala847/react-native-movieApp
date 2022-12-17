import {useState, useEffect} from 'react';
import {MovieDB} from '../api/MovieDB';
import {Movie, ResponseDataMovie} from '../interfaces/movieInterface';

interface MovieState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const initialState: MovieState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
};

export const useMovies = () => {
  const [moviesState, setMoviesState] = useState<MovieState>(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    try {
      setIsLoading(true);

      const nowPlayingPromise = MovieDB.get<ResponseDataMovie>('/now_playing');
      const popularPromise = MovieDB.get<ResponseDataMovie>('/popular');
      const topRatedPromise = MovieDB.get<ResponseDataMovie>('/top_rated');
      const upcomingPromise = MovieDB.get<ResponseDataMovie>('/upcoming');

      const resp = await Promise.all([
        nowPlayingPromise,
        popularPromise,
        topRatedPromise,
        upcomingPromise,
      ]);

      setMoviesState({
        nowPlaying: resp[0].data.results,
        popular: resp[1].data.results,
        topRated: resp[2].data.results,
        upcoming: resp[3].data.results,
      });

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
    ...moviesState,
  };
};
