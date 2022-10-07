
import React from 'react'
import { useState } from 'react';
import { Avatar, Button, Dialog, Slide, TextField } from "@material-ui/core";
import { useLocalContext } from '../../context/context';
import { Close } from "@material-ui/icons";
import './style.css'
import db from '../../lib/firebase';
const JoinClass = () => {

  const {loggedInUser} = useLocalContext()
  const[classCode, setClassCode] = useState("")
  const[email, setEmail] = useState("")
  const[error, setError] = useState("")
  const[classExists, setClassExists] = useState(false)
  const[joinedData, setJoinedData] = useState("")
  const {joinClassForm,setJoinClassForm , logout} = useLocalContext(false);

  const handleJoinClass = (e) => {
      db.collection("Created Classes").doc(email).collection("Classes").doc(classCode).get()
      .then((doc) => 
      {
        if(doc.exists && doc.owner !== loggedInUser.email)
        {
          setClassExists(true)
          setError(false)
          setJoinedData(doc.data())      
        }
        else{
          setClassExists(false)
          setError(true)

          return
        }
      } )

      if(classExists)
      {
        db.collection("Joined Classes").doc(loggedInUser.email).collection("Classes").doc(classCode).set({
          joinedData,
        }).then(() => setJoinClassForm(false))
      }
  }
 // console.log(loggedInUser)
  return (
   
   <Dialog 
   fullScreen

   open = {joinClassForm }
   onClose = {() => setJoinClassForm(false)}
   >
     <div className="joinClass">
       <div className="joinClass__wrapper">
         <div className="joinClass__wraper2" onClick = {() => setJoinClassForm(false)}>
           <Close className = "joinClass__svg" />
           <div className="joinClass__topHead">
             Join Class
           </div>
         </div>

         <Button
           className="joinClass__btn"
           variant = "contained"
           color = "primary"
           onClick = {() => handleJoinClass()}>Join</Button>

       </div>

       <div className="joinClass__form">
         <p className="joinClass__formtext">
         You're currently signed in as {loggedInUser?.email}
         </p>
         <div className="joinClass__loginInfo">
           <div className = "joinClass__classLeft">
             <Avatar src = {loggedInUser?.photoURL} />

             <div className = "joinClass__loginText">
               <div className="joinClass__loginName">{loggedInUser?.displayName}</div>
               <div className="joinClass__loginEmail">{loggedInUser?.email}</div>
            </div>

           </div>

           <Button
            className = "joinClass__btn"
         variant = "outlined"
         color = "primary" onClick = {() => logout()}>
           Logout
        </Button>
         </div>
       
       </div>

       <div className="joinClass__form">
         <div style={{ fontSize: "1.25rem", color: "#3c4043" }} className="joinClass__formText">
           Class Code
         </div>
         <div style = {{marginTop: "-5px", color : "#3c4043"}} className="joinClass__formText" >
         Ask your teacher for the class code, then enter it here.

         </div>

         <div className="joinClass__loginInfo">
           <TextField 
           id = "outlined-basic"
           variant = "outlined"
           label = "class Code" error = {error} helperText = {error && "No classes found"} value = {classCode} onChange = {(e) => setClassCode(e.target.value) } />

           <TextField 
           id = "outlined-basic"
           variant = "outlined"
           label = "Owner's Email" value = {email} onChange = {(e) => setEmail(e.target.value) } />
         </div>
       </div>
     </div>
   </Dialog>
  )
}

export default JoinClass
