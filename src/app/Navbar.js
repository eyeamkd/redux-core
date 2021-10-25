import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchNotifications } from '../features/notifications/notificationSlice'

export const Navbar = () => { 
  const dispatch = useDispatch()

  const fetchNewNotifications = () => { 
    dispatch(fetchNotifications())
  } 


  return (
    <nav>
      <section>
        <h1>Redux Core</h1>

        <div className="navContent">
          <div className="navLinks"> 
          <Link to="/notifications">Notifications</Link>
          </div>
          <div className="navLinks">
            <Link to="/">Posts</Link>
          </div> 
          <div className="navLinks">
            <Link to="/users">Users</Link> 
          </div> 

          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
