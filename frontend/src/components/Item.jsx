import React from 'react'
import axios from 'axios';


const Item = ({Item,setNewFeed,UserID}) => {
  const deleteItem = ()=>{
    const config = { 
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-authorization':"client_private_key123sdfj123jsdjnf12j"
      },
      data:{
        
          UserID:UserID,
          ItemID:Item.ItemID,
          Delete_Type:"USER_PRODUCT_DELETE"
      }
    }



    const body = {
      UserID:UserID,
      ItemID:Item.ItemID,
      Delete_Type:"USER_PRODUCT_DELETE"
    }
    axios.delete('http://localhost:5000/api/item/deleteItem', config).then(res =>{
      setNewFeed(res.data.data.ItemList)
    })
  }

  return (
    <div className="SmallItem" key={Item.ItemID}>
       <h4>{Item.NameOfTheItem}</h4>
       <p>{Item.price} $</p>
       <p>{Item.descOfTheItem}</p>
       <button>edit</button>
       <button onClick={()=>deleteItem()}>delete</button>
    </div>
  )
}

export default Item