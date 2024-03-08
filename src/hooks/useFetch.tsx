import { useEffect, useState } from 'react'
import { fetchDataFromApi } from 'src/utils/api'
const useFetch = (url: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError('null')

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false)
        setData(res)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setError('Something went wrong!')
      })
  }, [url])

  return { data, loading, error }
}

export default useFetch
