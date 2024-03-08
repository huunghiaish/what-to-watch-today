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

export const getNghiaRecommend = async () => {
  await sleep(1200)
  const goodMovieList = [
    '37854',
    '60625',
    '127532',
    '27205',
    '13',
    '70523',
    '220289',
    '206487',
    '577922',
    '26466',
    '13363',
    '284427',
    '500664',
    '333339',
    '45612',
    '240832',
    '137113',
    '20453',
    '31011',
    '141',
    '1124',
    '181886',
    '458723',
    '66732',
    '17431',
    '619264',
    '42509',
    '379088',
    '1255517',
    '110316',
    '65930',
    '1059673',
    '33238',
    '89959',
    '86031',
    '1210973',
    '31910',
    '61374',
    '13916',
    '699361',
    '554793',
    '618010',
    '62',
    '14337',
    '575604',
    '300668',
    '7299',
    '77',
    '63247',
    '61791',
    '787459'
  ]
  const randomMovie = getRandomNumber(0, goodMovieList.length)
  return goodMovieList[randomMovie] || 379088
}

export const fetchDataFromApi = async (url: string, params?: any) => {
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
