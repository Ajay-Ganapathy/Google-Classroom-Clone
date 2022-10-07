import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { PermContactCalendar, FolderOpen } from '@material-ui/icons'
import { Avatar } from '@mui/material'

const JoinedClasses = ({classData}) => {
  return (
    
    <li className="joined__list" style = {{marginTop : "3rem"}}>
    <div className="joined__wrapper">
      <div className="joined__container">
        <div className="joined__imgWrapper" />
        <div className="joined__image" />
        <div className="joined__content">
          <Link className="joined__title" to={`/${classData.id}`}>
            <h2>{classData.className}</h2>
          </Link>
          <p className="joined__owner">{classData.owner}</p>
        </div>
      </div>
      <Avatar
        className="joined__avatar"
        src={classData?.photoURL}
      />
    </div>
    <div className="joined__bottom">
      <PermContactCalendar />
      <FolderOpen />
    </div>
  </li>
   
  )
}

export default JoinedClasses

