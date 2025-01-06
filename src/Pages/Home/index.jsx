import React from 'react'
import Sliders from '../../Components/Slider'
import Trending from '../../Components/Trending'
import Production from '../../Components/Production'

function Home() {
  return (
    <div className='px-12'>
      <Sliders/>
      <Production/>
      <Trending/>
    </div>
  )
}

export default Home
