import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function UsersList() {
  const users = useSelector((state) => state.users.users)
  return ( 
    <div> 
    Users List
      {users.map((user) => (
        <Link to={`/user/${user.id}`}>{user.firstName} {users.lastName}</Link>
      ))}
    </div>
  )
}

export default UsersList
