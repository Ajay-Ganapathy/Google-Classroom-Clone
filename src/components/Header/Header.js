import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { Add, Apps } from "@material-ui/icons";
import { CreateClass, JoinClass } from "..";

import React from 'react'
import { useStyles } from './style'
import { useState } from "react";
import { useLocalContext } from "../../context/context";

const Header = ({children}) => {
  const classes = useStyles()
  const [anchorEl , setAnchorEl] = React.useState(null);

  const {setCreateClassForm,setJoinClassForm , loggedInUser , logout } = useLocalContext();

  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleCreate = () => {
    handleClose()
    setCreateClassForm(true)
  }

    const handleJoin = () => {

      handleClose()
      setJoinClassForm(true)
    }



  return (
    
    <div className = {classes.root}>
      <AppBar className = {classes.appBar} >
        <Toolbar className = {classes.toolbar}>

          

          <div className= {classes.headerWrapper}>

            {children}
          <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Classroom"
            />

            <Typography className = {classes.title}>

              Classroom

            </Typography>
          </div>

          <div className = {classes.header__wrapper__right}>
            <Add className = {classes.icon} onClick = {handleClick} />
            <Apps className = { classes.icon} />

            <Menu 
            id = "simple-menu"
            anchorEl = {anchorEl}
            keepMounted
            open = {Boolean(anchorEl)}
            onClose = {handleClose}
            >
            <MenuItem onClick = {handleJoin} > Join Class </MenuItem>
            <MenuItem onClick = {handleCreate}> Create Class </MenuItem>
            

            </Menu>

            <div>
            <Avatar className = {classes.icon} src = {loggedInUser?.photoURL} onClick = {() => logout()}/>
          </div>
          </div>

          
        </Toolbar>
      </AppBar>

      <CreateClass />
      <JoinClass />
      
    </div>
    
  )
}

export default Header
