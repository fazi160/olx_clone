import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import FirebaseContext, { AuthContext } from '../../store/FirebaseContext';
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
// import { getFirestore } from 'firebase/firestore';
const Create = () => {
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const {app,db} =useContext(FirebaseContext)
  const {user} =useContext(AuthContext)
  const navigate=useNavigate()
  const handleSubmit=async ()=>{
    const storage = getStorage(app);  
    const storageRef= ref(storage,`/images/${image.name}`)
    await uploadBytes(storageRef,image)
    // const firestore = getFirestore(app);
    const imageUrl= await getDownloadURL(storageRef)
    await addDoc(collection(db, "products"), {
      name,
      category,
      price,
      imageUrl:imageUrl,
      userId:user.uid,
      createdAt: new Date().toDateString()
    });
   navigate('/')
}
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" onChange={(e)=>setPrice(e.target.value)}/>
            <br />
         
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image) : ""}></img>
         
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;