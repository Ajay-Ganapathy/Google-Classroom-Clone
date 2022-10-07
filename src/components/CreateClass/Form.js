import { DialogActions } from '@material-ui/core'
import { TextField } from '@mui/material'
import { Button } from '@material-ui/core'
import {React, useState} from 'react'
import { useLocalContext } from '../../context/context'
import { v4 as uuidv4 } from 'uuid'
import db from '../../lib/firebase'
const Form = () => {

  const [ClassName , setClassName] = useState("")
  const [Section , setSection] = useState("")
  const [Subject , setSubject] = useState("")
  const [Room , setRoom] = useState("")
  const { setCreateClassForm,loggedInMail } = useLocalContext();

  

  const addClass = (e) =>{
    const id = uuidv4();
 
    db.collection("Created Classes").doc(loggedInMail).collection("Classes").doc(id).set({
      owner : loggedInMail,
      className : ClassName,
      section : Section,
      subject : Subject,
      room : Room, 
      id :id,
    }).then(() => 
    {
      setCreateClassForm(false)
    }) 
    setCreateClassForm(false)
  }

  return (
    <div className = "form">
      <p className="class__title"> Create Class</p>
      <div className="form__inputs">
        <TextField id = "filled-basic" variant = "filled" className = "form__input" label = "Class Name(required)" value = {ClassName} onChange = { (e) => setClassName(e.target.value)}/>
        <TextField id = "filled-basic" variant = "filled" className = "form__input" label = "Section" value = {Section} onChange = { (e) => setSection(e.target.value)} />
        <TextField id = "filled-basic" variant = "filled" className = "form__input" label = "Subject" value = {Subject} onChange = { (e) => setSubject(e.target.value)} />
        <TextField id = "filled-basic" variant = "filled" className = "form__input" label = "Room" value = {Room}  onChange = { (e) => setRoom(e.target.value)}/>
      </div>

      <DialogActions>
        <Button autoFocus variant = 'contained' color = 'secondary' onClick = {() => addClass()}>Create</Button>
      </DialogActions>
    </div>
  )
}

export default Form
