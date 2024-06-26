import React, { useEffect, useState } from 'react'
import './mainPage.css';
import Header from './Header';
import axios from 'axios';

const Sell = ({UserID})=>{

    useEffect(()=>{
        // axios.get('/')
    },[])
    const [CreatinInput,setCreatinInput ] = useState({name:'',desc:'',price:'',img:''});
    const [dataSaved, setDataSaved] = useState(false)


  const createItem = (NameOfTheItem,price,descOftheItem,imageOftheItem)=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
    }
    const body = {
      UserID:UserID,
      NameOfTheItem:CreatinInput.name,
      price:CreatinInput.price,
      descOftheItem:CreatinInput.desc,
      imageOftheItem:CreatinInput.image
    }

    axios.post('http://localhost:5000/api/item/create', body).then(res =>{
      if(res.data.success){
        setDataSaved(true);
        setTimeout(()=>{
          setDataSaved(false);
        },2000)
      }
      console.log(res);
    })
  }

  return (
        <div className="landing-page">
            <Header/>
            <div className="content">
              <div className="container">
                <div className='ShopBox'>
                  <div className='ItemBox'>
                  </div>
                  <div className='CreationItemBox'>
                    <h3>Create an Item</h3>
                    <div className='feedback-form'>
                    <div id="order" >
                      <label>Name of the product</label>
                      <input className='inputs' value={CreatinInput.name} onChange={(e)=>{setCreatinInput({img:CreatinInput.img,price:CreatinInput.price,desc:CreatinInput.desc,name:e.target.value})}} placeholder='name of the product'></input> 
                      <label>Price</label>
                      
                      <input className='inputs' value={CreatinInput.price}  onChange={(e)=>{setCreatinInput({img:CreatinInput.img,price:e.target.value,desc:CreatinInput.desc,name:CreatinInput.name})}} placeholder='price Of the product'></input>
                      <label>Description of the item</label>
                      
                      <input className='inputs' value={CreatinInput.desc}  onChange={(e)=>{setCreatinInput({img:CreatinInput.img,price:CreatinInput.price,desc:e.target.value,name:CreatinInput.name})}} placeholder = 'description'></input>
                      <label>Name of the product</label>
                      
                      <input className='inputs' value={CreatinInput.img}  onChange={(e)=>{setCreatinInput({img:'',price:CreatinInput.price,desc:CreatinInput.desc,name:CreatinInput.name})}} type='file'></input>
                      <button onClick={()=>{
                        createItem(CreatinInput.name,CreatinInput.price,CreatinInput.desc,'');
                        setCreatinInput({name:'',desc:'',price:'',image:''})
                        }} className='inputs-button'>Send</button>
                      <div className="error-messages"></div>

                      {
                        dataSaved?
                        <div className="success">The question was sent successfully!</div>
                        :
                        <></>

                      }
                    </div>
                  </div>
                  </div>

                </div>
                </div>
            </div>
          </div>
      
  )
}

export default Sell