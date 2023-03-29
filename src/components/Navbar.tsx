import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='h-[56px] w-full bg-[#252329] drop-shadow-lg px-10 sticky top-0 flex items-center'>
  <p className='font-bold text-lg text-white'>HyperText Assassins</p>
    </div>
  )
}

export default Navbar