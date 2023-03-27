import React from 'react'
import AddChannel from './AddChannel'
import Members from './Members'
import AboutMe from './AboutMe'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className='flex-[0.15] flex min-h-screen flex-col py-4 px-2 items-center bg-[#120F13] text-white'>
         <AddChannel/>
         <Members/>
         <AboutMe/>
    </div>
  )
}

export default Sidebar