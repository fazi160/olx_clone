import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, query ,} from "firebase/firestore";
import { Link } from 'react-router-dom';
import Heart from '../../assets/Heart';
import './Post.css';
import FirebaseContext from '../../store/FirebaseContext';
import { postContext } from '../../store/postContext';

function Posts() {
  const [posts,setPosts] = useState([])
  const {db} = useContext(FirebaseContext)
  const {setPost} = useContext(postContext)
  useEffect(() => {
    const que = query(collection(db,"products"))
    const sub = onSnapshot(que, (querySnapshot) => {
      const allposts=querySnapshot.docs.map(product =>{
          return{
            ...product.data(),id:product.id
          }          
      } 
   );
   console.log(allposts)
   setPosts(allposts)

    })
  //  console.log(unsub)
  }, [])
  // console.log("")
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards" ><Link to="/view">
          {posts.map((product)=>(
            <div onClick={()=>setPost(product)} style={{color:"black"}}
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          ))}
          
          </Link></div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;