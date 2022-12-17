import axios from 'axios';

export const MovieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'd22ec4bb0b1115abe31e6c4062fbefc9',
    language: 'language',
  },
});
