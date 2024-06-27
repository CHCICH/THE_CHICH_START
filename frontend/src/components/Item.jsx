import React from 'react'



const Item = ({Item}) => {
  return (
    <div className="SmallItem" key={Item.ItemID}>
       <h4>{Item.NameOfTheItem}</h4>
       <p>{Item.price} $</p>
       <p>{Item.descOfTheItem}</p>
       <button>edit</button>
       <button>delete</button>
    </div>
  )
}

export default Item