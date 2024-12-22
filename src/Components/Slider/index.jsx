import React from 'react'
import { useGetPopular } from '../../Servives/GlobalApi'

function Slider() {
const {dataPopular} = useGetPopular()
console.log(dataPopular)
  return (
    <div>
      
    </div>
  )
}

export default Slider
