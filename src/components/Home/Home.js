import React from 'react'
import Header from '../Layout/Header/Header'
import SearchBox from './SearchBox'
import AllTasks from './AllTasks'

function Home() {
  return (
    <div className='home'>
        <Header />
        <SearchBox />
    </div>
  )
}

export default Home