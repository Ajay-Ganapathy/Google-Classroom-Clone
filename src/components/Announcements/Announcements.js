import { Avatar } from '@mui/material'
import { color } from '@mui/system'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocalContext } from '../../context/context'
import db from '../../lib/firebase'
import "./style.css"

const Announcements = ({classData}) => {
  const [announce , setAnnounce] = useState([])
  const {loggedInUser} = useLocalContext()

  useEffect(() => {

    if(classData)
    {
      let unsubscribe = db.collection("Announcements").doc("Classes").collection(classData.id).onSnapshot((snap) => {
        setAnnounce(snap.docs.map((doc) => doc.data()))
      })
      return () => unsubscribe()
    }
  
   
  }, [classData])

  console.log(announce)
  return (
    <div>

   {announce.map((item) => (
     <div className="ant">
       <div className="ant__Cnt">
         <div className="ant__top">

           <Avatar src = {loggedInUser?.photoURL} />
           <div>{item.sender} </div>

         </div>
         <p className="ant__txt">{item.text}</p>
         <img src={item.imageUrl} alt="" className = "ant__img" />
       </div>
     </div>
   ))}

   </div>
      
    
  )
}

export default Announcements
