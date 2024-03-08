import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineLike } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import './style.scss'

import useFetch from 'src/hooks/useFetch'

import Img from 'src/components/lazyLoadImage/Img'
import ContentWrapper from 'src/components/contentWrapper/ContentWrapper'
import { findMovieYouMightLike, getNghiaRecommend } from 'src/utils/api'

const HeroBanner = () => {
  const [background, setBackground] = useState('')
  const [spinerOverlay, setSpinerOverlay] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch('/movie/upcoming')

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)
  }, [data])

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  const handleFindMovie = async () => {
    const result = await findMovieYouMightLike()
    navigate(`/movie/${result || 379088}`)
  }
  
  const handleNghiaRecommend = async () => {
    const result = await getNghiaRecommend()
    navigate(`/movie/${result || 379088}`)
  }

  return (
    <div className='heroBanner'>
      {!loading && (
        <div className='backdrop-img'>
          <Img src={background} />
        </div>
      )}

      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>What to watch today?</span>
          <span className='subTitle'>A great movie is waiting for you. Explore now.</span>
          <div className='searchInput'>
            <input
              type='text'
              placeholder='Search for a movie or tv show....'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
          <div className='more'>
            <button
              onClick={() => {
                setSpinerOverlay(true)
                handleFindMovie()
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span>You might like</span> <AiOutlineLike style={{ marginLeft: 5 }} />
              </div>
            </button>
            <button
              onClick={() => {
                setSpinerOverlay(true)
                handleNghiaRecommend()
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span>Nghia recommend</span> <FaRegHeart style={{ marginLeft: 5 }} />
              </div>
            </button>
          </div>
        </div>
      </ContentWrapper>
      {spinerOverlay && (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-95 flex flex-col items-center justify-center'>
          <div className="rounded-md h-14 w-14 border-4 border-t-4 border-red-700 bg-gradient-to-t from-red-700 via-rose-600 to-pink-500 animate-spin"></div>
          <h2 className='text-center text-white mt-5 md:text-5xl font-semibold sm:text-lg'>I'm looking for a good movie for you...</h2>
          <p className='text-center text-white mt-3 md:text-3xl sm:text-sm'>Wait a moment, please!</p>
        </div>
      )}
    </div>
  )
}

export default HeroBanner
