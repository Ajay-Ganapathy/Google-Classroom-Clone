import {React, useState} from 'react'
import { Avatar, Button, TextField } from '@mui/material'
import "./style.css"
import { useLocalContext } from '../../context/context'
import db, { storage } from '../../lib/firebase'
import firebase from 'firebase'
import { Announcements } from '..'




const Main = ({classes}) => {
  const {loggedInUser, loggedInMail} = useLocalContext()
  const [showAnnounceForm, setShowAnnounceForm] = useState(false);
  const [Post , setPost] = useState('')
  const [Image , setImage] = useState(null)

  const handleChange = (e) => {
    if(e.target.files[0])
    {
      setImage(e.target.files[0])
    }
     
  }

  const handleUpload = (e) => {
    setShowAnnounceForm(false)
    const uploadImage = storage.ref(`Images/${Image.name}`).put(Image);

    uploadImage.on("state_changed", () => {
      storage.ref("Images").child(Image.name).getDownloadURL().then((url) => {
        db.collection("Announcements").doc("Classes").collection(classes.id).add({
          timestamp : firebase.firestore.FieldValue.serverTimestamp(),

          imageUrl : url,
          text : Post,
          sender : loggedInMail
        })
      })
    })
  }
  return (
    <div className="main" style = {{marginTop : '3rem'}}>
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classes.className}
              </h1>
              <div className="main__section main__overflow">
                {classes.section}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Class Code :</em>
                <div className="main__id">{classes.id}</div>
              </div>
            </div>
          </div>
        </div> 

        <div className="main__announce">
          <div className="main__status">
            <p>Upcoming</p>

            <div className="main__subtext">
              <p> No work due</p>
            </div>

           

          </div>

          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">

                {
                  showAnnounceForm ? 
                 (
                   <div className="main__form">
                     <TextField id = "filled-multiline-flexible" multiline label = "Announce Something to the class" variant = "filled" value = {Post} onChange = {(e) => setPost(e.target.value)}/>

                     <div className="main__buttons">
                       <input variant = "outlined" color = "primary" type = "file" onChange = {handleChange}/>

                       <div>

                       <Button varaint = "contained" onClick = {() => setShowAnnounceForm(false)} >Cancel</Button>

                         <Button varaint = "filled" color = "primary" onClick = {() => handleUpload()}>Post</Button>
                       </div>
                     </div>
                   </div>
                 ):
                 (
    <div className="main__wrapper100" onClick = {() => setShowAnnounceForm(true)}>

<Avatar src = {loggedInUser?.photoURL} />
                <div>Announce Something Here</div>
             
              </div>
                 )
                }

              

              </div>
           
            </div>

            <Announcements classData = {classes} />
             
            </div>
          </div>     
      </div>
    </div>
  )
}

export default Main
