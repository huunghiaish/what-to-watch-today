import Carousel from 'src/components/carousel/Carousel'
import useFetch from 'src/hooks/useFetch'

const Similar = ({ mediaType, id }: any) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)

  const title = mediaType === 'tv' ? 'Similar TV Shows' : 'Similar Movies'

  return <Carousel title={title} data={data?.results} loading={loading} endpoint={mediaType} />
}

export default Similar
