import {useState, useEffect, useCallback} from 'react';
import {MovieDB} from '../api/MovieDB';
import {MovieFull} from '../interfaces/movieInterface';
import {Cast, ResponseDataCredits} from '../interfaces/creditsMovieInterface';

interface MovieDetails {
  cast: Cast[];
  isLoading: boolean;
  movieFull?: MovieFull;
}

const initialState: MovieDetails = {
  cast: [],
  isLoading: true,
  movieFull: undefined,
};

export const useMovieDetail = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>(initialState);

  const getMovieDetails = useCallback(async () => {
    const movieDetailPromise = MovieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = MovieDB.get<ResponseDataCredits>(`/${movieId}/credits`);

    try {
      const [movieDetailResp, castResponse] = await Promise.all([
        movieDetailPromise,
        castPromise,
      ]);

      setState({
        isLoading: false,
        cast: castResponse.data.cast,
        movieFull: movieDetailResp.data,
      });
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  return {
    ...state,
  };
};
