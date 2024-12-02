import React from "react";
import { useState } from "react";

interface Props {
  imgUrl : string;
}

const AddFoodImage = ({imgUrl}:Props) => {

  if(!imgUrl) {
    imgUrl = '../../../styles/wood.jpg'
  }

  return (
    <div
      style={{
        width: "40%",
        marginLeft: "10%",
        backgroundImage : `url(${imgUrl})`,
        backgroundRepeat : "no-repeat",
        backgroundSize : 'cover'

      }}
      className="display-component"
    >
      <br />
      <div style={{ padding : '20px' , fontSize :'20px'}}>
      
      </div>
    </div>
  );
};

export default AddFoodImage;
