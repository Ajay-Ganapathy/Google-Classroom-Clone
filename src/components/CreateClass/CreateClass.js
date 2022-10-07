import React from 'react'
import { useLocalContext } from '../../context/context';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import Form from './Form';

import './style.css'
const CreateClass = () => {
  const {createClassForm,setCreateClassForm} = useLocalContext();
  const [check,setcheck] = React.useState(false);
  const [showForm , setShowForm] = React.useState(false);

  return (
    <div>

<Dialog open = {createClassForm}
      aria-labelledby="customized-dialog-title"
      maxWidth = {showForm ? "lg" : "xs"}
      onClose = {() => setCreateClassForm(false)}
      className = "form__dialog"
      >

      {showForm ? (
        <Form />
      )
    :
    (
      <>
      <h1 className = "class__title">
          Using Classroom at a school with students?
          </h1>
        <DialogContent className = "class__content">

          <p className = "class__text">

          <p>If so, your school must sign up for a free</p>
                <a href="/help" className="class__link">
                  G Suite for Education
                </a>
                account before you can use Classroom
                <a href="/learn" className="class__link2">
                  Learn More.
                </a>
              </p>
              <p>
                G Suite for Education lets schools decide which Google services
                their students can use, and provides additional
                <a href="/privacy" className="class__link2 class__link">
                  privacy and security
                </a>
                protections that are important in a school setting. Students
                cannot use Google Classroom at a school with personal accounts.

          </p>
          
          <div className="class__checkboxWrapper">
            <Checkbox color = "primary" onChange = { () => setcheck(!check)}/>
            <p className="class__text">
            I've read and understand the above notice, and I'm not using
                  Classroom at a school with students

            </p>
          </div>

        </DialogContent>

        <DialogActions>
          <Button variant = "text" onClick = {() => setCreateClassForm(false)}>Close</Button>
          <Button variant = "contained" color = "primary" disabled = {!check} onClick = { () => setShowForm(true)}>Continue</Button>
        </DialogActions>
        </>

    )}
              
      </Dialog>

    </div>
  )
}

export default CreateClass
