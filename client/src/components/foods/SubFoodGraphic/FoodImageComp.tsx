import React from 'react'
import "../../../styles/styles.css"
import { Food } from '../../../types/types'

interface Props{
  displayFood : Food | undefined
}

const FoodImageComp = ({displayFood} : Props) => {
  let foodImage = 'https://banner2.cleanpng.com/20180216/ogq/av158ust4.webp'
  if(displayFood?.imgUrl) foodImage = displayFood.imgUrl
  return (
    <div className='display-component' style={{
        width: '90%',
        height :'40%',
        marginTop : '20px',
        backgroundImage : `url(${foodImage})`,
        transition : '2s',
        backgroundSize : 'cover'
    }}>
    </div>
  )
}

export default FoodImageComp