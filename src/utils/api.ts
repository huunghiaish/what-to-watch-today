import axios from 'axios'
import { getRandomNumber, sleep } from './functions'

const BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN

const headers = {
  Authorization: 'bearer ' + TMDB_TOKEN
}

export const findMovieYouMightLike = async () => {
  await sleep(1200)
  const randomPage = getRandomNumber(1, 10)
  const url = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=600`
  const randomElement = getRandomNumber(0, 19)
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers
    })
    return data?.results?.[randomElement]?.id || 13
  } catch (err) {
    console.log(err)
    return 379088
  }
}

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params
    })
    return data
  } catch (err) {
    console.log(err)
    return err
  }
}
