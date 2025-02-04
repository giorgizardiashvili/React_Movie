
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export default {
  searchMovies: (query) => axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
      type: 'movie'
    }
  }),
  getMovieDetails: (id) => axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id
    }
  })
};