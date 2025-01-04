import React from 'react'
import Header from '../../Header'
import Sliders from '../../Slider'

function MainLayout({children}) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

export default MainLayout
