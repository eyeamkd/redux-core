import React from 'react'
import { useSelector } from 'react-redux'

function UserName(userId) { 
    const author = useSelector(state => state.users.find(user => user.id === userId)); 
    return (
        <div>
         {author? author.name : 'Unknown User'}   
        </div>
    )
}

export default UserName
