import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='h-[56px] w-full bg-[#252329] drop-shadow-lg px-10  sticky top-0 flex items-center gap-5'>
      <img src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=HyperText`} className='h-9 w-9'/>
  <p className='font-bold text-lg text-white'>HyperText Assassins</p>
    </div>
  )
}

export default Navbar