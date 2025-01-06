import React from 'react'
import Sliders from '../../Components/Slider'
import Trending from '../../Components/Trending'
import Production from '../../Components/Production'
import GenresList from '../../Components/GenresList'

function Home() {
  return (
    <div className='px-16'>
      <Sliders/>
      <Trending/>
      <Production/>
    </div>
  )
}

export default Home
