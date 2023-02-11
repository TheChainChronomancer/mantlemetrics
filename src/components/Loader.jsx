import React from 'react'

import { loader } from '../assets'

const Loader = () => {
  return (
    <div className="m-auto items-center justify-center">
        <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
    </div>
  )
}

export default Loader