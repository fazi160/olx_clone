import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { postContext } from '../../store/postContext'
import { onSnapshot, collection, query, where } from "firebase/firestore";
import FirebaseContext from '../../store/FirebaseContext'
import './View.css';
function View() {
  const [userDetails, setUserdetails] = useState('')
  const { post } = useContext(postContext)
  const { db } = useContext(FirebaseContext)
  useEffect(() => {
    const { userId } = post
    const que = query(collection(db, "users"), where("id", "==", userId));
    const sub = onSnapshot(que, (querySnapshot) => {
      querySnapshot.docs.map(d => setUserdetails(d.data()));
    });
  })
  console.log(userDetails)

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={post.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {post.price} </p>
          <span>{post.name}</span>
          <p>{post.category}</p>
          <span>{post.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails ? userDetails.username : ""}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;