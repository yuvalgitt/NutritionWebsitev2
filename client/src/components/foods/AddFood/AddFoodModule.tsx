import React, { useState } from 'react'
import AddFood from './AddFood'
import AddFoodImage from './AddFoodImage'

const AddFoodModule = () => {
  const [imgUrl, setImgUrl] = useState<string>("")
  return (
    <div className='module-invisible' >
        <AddFood setImgUrl={setImgUrl} ></AddFood>
        <AddFoodImage imgUrl={imgUrl} ></AddFoodImage>
    </div>
  )
}

export default AddFoodModule