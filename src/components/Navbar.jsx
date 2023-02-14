import React from 'react'
import logonav from '../../public/logonav.svg'


const Navbar = () => {
  return (
    <div className="bg-[#cae0eb] py-3 drop-shadow-lg w-full fixed top-0 z-10 sm:text-left text-center flex flex-row justify-between items-center">
        <h1 className="mx-6 font-semibold text-gray-800">Mantle Network Dashboard</h1>
        <img src={logonav} className="mx-6 h-[25px] object-contain"/>
    </div>
  )
}

export default Navbar